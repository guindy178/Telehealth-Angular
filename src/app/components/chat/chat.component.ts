import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ChatType, IChatMessage } from 'src/app/interfaces/message.interface';
import { customerResponse } from 'src/app/interfaces/customer.interface';
import { DoctersResponse } from 'src/app/interfaces/doctors.interface';
import { Subscription, lastValueFrom } from 'rxjs';

type CUserChat = customerResponse & { socketId?: string };
type DUserChat = DoctersResponse & { socketId?: string };

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnDestroy, OnInit {
  private _subscriptions: Subscription = new Subscription();

  inputText: string = '';
  socketMessages: string[] = [];
  appointmentId: number | null = null;
  doctorsID: string = ''
  customerID: string = ''
  doctors: string = "Doctor";
  customers: string = "Customer"

  chatItems: IChatMessage[] = [];
  chatType?: ChatType;

  /** ส่วนของตัวเราเองเอาไว้จัดตำแหน่งซ้ายขวาของช่องแชท */
  currentCustomer?: CUserChat;
  currentDoctor?: DUserChat;

  /** ส่วนของผู้ใช้งานที่สนทนาด้วย */
  chatDoctor?: DUserChat;
  chatCustomer?: CUserChat;

  constructor(
    private _socket: SocketService,
    public _data: DataService,
    private _route: ActivatedRoute,
    private _api: ApiService,
    public router: Router,
  ) {
    this._initalizeLoadChatUser()
    this._initalizeLoadEventsSocket();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
    this._subscriptions.unsubscribe();
  }

  /** ข้อมูล Socket IO */
  get socket() { return this._socket.socket; }

  /** ดึงข้อมูลชื่อของผู้ที่สนทนาด้วย */
  get userName() {
    let name = '';
    switch (this.chatType) {
      case ChatType.Customer:
        name = "{0} {1}".replace("{0}", this.chatDoctor?.firstName || '').replace("{1}", this.chatDoctor?.lastName || '');
        break;
      case ChatType.Doctor:
        name = "{0} {1}".replace("{0}", this.chatCustomer?.firstName || '').replace("{1}", this.chatCustomer?.lastName || '');
        break;
    }
    return name;
  }

  /** ส่งข้อความ */
  sendMessage(): any {
    switch (this.chatType) {
      case ChatType.Customer:
        if (!this.chatDoctor || !this.currentCustomer) return Swal.fire('เกิดข้อผิดพลาด', 'ไม่มีผู้ใช้งาน');
        const messageCustomer: IChatMessage = {
          type: ChatType.Customer,
          customerId: this.currentCustomer.customerID,
          dockerId: this.chatDoctor.doctorsID,
          message: this.inputText,
          time: new Date(),
        };
        this.chatItems.push(messageCustomer);
        this.socket.emit('chat', this.chatDoctor.socketId, messageCustomer);
        this._socket.createChat(messageCustomer).subscribe();
        break;

      case ChatType.Doctor:
        if (!this.chatCustomer || !this.currentDoctor) return Swal.fire('เกิดข้อผิดพลาด', 'ไม่มีผู้ใช้งาน');
        const messageDoctor: IChatMessage = {
          type: ChatType.Doctor,
          customerId: this.chatCustomer.customerID,
          dockerId: this.currentDoctor.doctorsID,
          message: this.inputText,
          time: new Date(),
        };
        this.chatItems.push(messageDoctor);
        this.socket.emit('chat', this.chatCustomer.socketId, messageDoctor);
        this._socket.createChat(messageDoctor).subscribe();
        break;
    }

    this.inputText = '';
  }

  /** โหลดข้อมูลผู้ใช้งานที่จะสนทนา */
  private async _initalizeLoadChatUser(): Promise<any> {
    const chatUserID = this._route.snapshot.queryParams['chatUserID'];
    if (!chatUserID) return Swal.fire('เกิดข้อผิดพลาด', 'กรุณาเลือกผู้ใช้งานที่ต้องการสนทนา');

    try {
      const customerData = this._data.user;
      const doctorData = this._data.doctors;
      let customerID, docketID;

      // หากว่าเป็นคนไข้คุยกับหมอ
      if (customerData) {
        this.chatType = ChatType.Customer;
        this.currentCustomer = customerData;
        this.chatDoctor = await lastValueFrom(this._api.getDoctorsByDoctorID(chatUserID)).then(m => m.data);
        this.socket.emit('join room', this.currentCustomer);

        customerID = this.currentCustomer.customerID;
        docketID = this.chatDoctor.doctorsID;
      }

      // หากว่าเป็นหมอคุยกับคนไข้
      if (doctorData) {
        this.chatType = ChatType.Doctor;
        this.currentDoctor = doctorData;
        this.chatCustomer = await lastValueFrom(this._api.getUserById(chatUserID)).then(m => m.data);
        this.socket.emit('join room', this.currentDoctor);

        docketID = this.currentDoctor.doctorsID;
        customerID = this.chatCustomer.customerID;
      }

      // โหลดข้อมูลประวัติการสนทนา
      if (customerID && docketID) this._socket.viewChat(customerID, docketID).subscribe(results => {
        results.forEach(item => {
          this.chatItems.push({
            customerId: item.customerID,
            dockerId: item.doctorsID,
            message: item.message,
            type: ChatType[item.sender],
            time: new Date(item.timeSend)
          });
        });
      });
    }
    catch (res: any) { Swal.fire('เกิดข้อผิดพลาด', res.message) }
  }


  /** ข้อมูล event ทั้งหมดของ Socket */
  private _initalizeLoadEventsSocket() {
    // ทำการจับคู่ chat user เพื่อเอา socket id ใช่ให้กับ chat user
    this._subscriptions.add(this.socket.fromEvent<any[]>('join room').subscribe(users => {
      users.forEach(item => {
        if (this.chatCustomer && this.chatCustomer.customerID == item.customerID) this.chatCustomer.socketId = item.socketId;
        if (this.chatDoctor && this.chatDoctor.doctorsID == item.doctorsID) this.chatDoctor.socketId = item.socketId;
      });
    }));

    // ทำการจับคู่ chat user เพื่อเอา socket id ใช่ให้กับ chat user
    this._subscriptions.add(this.socket.fromEvent<IChatMessage>('chat').subscribe(message => {
      this.chatItems.push(message);
    }));
  }
  updateAppointment(): void {
    const idappointment = this._route.snapshot.queryParams['appointmentID'];
    console.log(idappointment)

    this._api.updateappointment(idappointment).subscribe(
      response => {
        console.log('Appointment updated successfully:', response);
        // ทำอย่างอื่นที่คุณต้องการหลังจากอัปเดตสำเร็จ.
        this.router.navigate(['/']);
      },
      error => {
        console.error('Failed to update appointment:', error);
        // จัดการข้อผิดพลาดที่เกิดขึ้นในการอัปเดต
      }
    );
  }
}