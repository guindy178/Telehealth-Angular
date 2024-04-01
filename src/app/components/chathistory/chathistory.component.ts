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

import { Messages } from 'src/app/interfaces/message.interface';
import { Docters } from 'src/app/interfaces/doctors.interface';


type CUserChat = customerResponse & { socketId?: string };
type DUserChat = DoctersResponse & { socketId?: string };

@Component({
  selector: 'app-chathistory',
  templateUrl: './chathistory.component.html',
  styleUrls: ['./chathistory.component.scss']
})
export class ChathistoryComponent {
  List : Messages [] = []
  customerID : string =''
  selectedDoctorID: number = 0 ;
  searchInput =''
  Profile:Docters = {} as Docters;

  socketMessages: string[] = [];
  doctorsID: string = ''
  doctors: string = "Doctor";
  customers: string = "Customer"
  chatItems: IChatMessage[] = [];
  chatType?: ChatType;

  filteredUser: (Messages) [] = [] ;
  
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
  }



  private async _initalizeLoadChatUser(chatUserID : string): Promise<any> {
 
    if (!chatUserID) return Swal.fire('เกิดข้อผิดพลาด', 'กรุณาเลือกผู้ใช้งานที่ต้องการสนทนา');

    try {
      const customerData = this._data.user;
      let customerID, docketID;

      // หากว่าเป็นคนไข้คุยกับหมอ
      if (customerData) {
        this.chatType = ChatType.Customer;
        this.currentCustomer = customerData;
        this.chatDoctor = await lastValueFrom(this._api.getDoctorsByDoctorID(chatUserID)).then(m => m.data);

        customerID = this.currentCustomer.customerID;
        docketID = this.chatDoctor.doctorsID;
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


  search() {
    const searchTerm = this.searchInput.toLowerCase();
  
    if (searchTerm) {
      this.filteredUser = this.List.filter((ListName : Messages) => {
        return (
          ListName.firstName.toLowerCase().includes(searchTerm) ||
          ListName.lastName.toString().toLowerCase().includes(searchTerm)
        );
        
      });
    } else {
      this.filteredUser = this.List; // กำหนดให้แสดงข้อมูลทั้งหมดเมื่อค่า Input เป็นค่าว่าง
    }
  }
  showDoctorsID(doctorsID: number) {
    console.log(doctorsID);
    const chatUserID = doctorsID;
  
    // ลบข้อมูลเก่าออกจาก chatItems
    this.chatItems = [];
    this.selectedDoctorID = chatUserID;
    this.getDoctorsById(chatUserID.toString());
  
    // กำหนดค่า doctorsID เพื่อเปิดการแสดงผลส่วนด้านบน
    this.doctorsID = doctorsID.toString();
  
    // เรียกใช้ _initalizeLoadChatUser() เพื่อโหลดข้อมูลใหม่
    this._initalizeLoadChatUser(chatUserID.toString());
  }
  
  
  getMessage(doctorsID : string) {
    this._api.getmessageCustomer(doctorsID).subscribe((response) => {
      this.List = response.data;
      this.filteredUser = this.List
      console.log(this.List);
    });
  }

  getDoctorsById(doctorsID : string) {
    this._api.getDoctorsById(doctorsID).subscribe((response) => {
      this.Profile = response.data;
      console.log(this.Profile);
    });
  }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.customerID = params['customerID'] || '';
      console.log(this.customerID)
   
      if (this.customerID) {
        this.getMessage(this.customerID)
       
  
      } else {

      }
    });
}
}