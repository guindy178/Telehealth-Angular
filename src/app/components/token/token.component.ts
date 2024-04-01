import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/environment/environment';
import { ApiService } from 'src/app/services/api.service'; 
@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {
  price: string ='';
  token: string = '';
  source: string = '';
  history: string = '';
  symptom: string = '';
  consult: string = '';
  doctorsID: string = '';
  customerID: string = '';
  currentDate: Date = new Date();
  constructor(
    private _route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    

  )
   {
    this._route.queryParams.subscribe(params => {
      console.log(params);
      this.token = params['omiseToken'];
      this.source = params['omiseSource'];
      this.price = params['price'];
      this.customerID = params['userId2'];
      this.doctorsID = params['userId1'];
      this.consult = params['consult'];
      this.symptom = params['symptom'];
      this.history = params['history'];
    });
   }

  ngOnInit(): void {
 
    this.saveDataToDatabase()
    const data = {
      token: this.token,
      source: this.source,
      price: this.price
    };
    // setTimeout(() => {
    //   // หลังจากรอเสร็จเริ่มนับเวลา 1 นาที
    //   setTimeout(() => {
    //     // ทำการย้ายไปยัง /chat
    //     this.router.navigate(['/chat'], {
    //       queryParams: { doctorsID: this.doctorsID }
    //   });
    //   }, 10000); // 1 นาทีในหน่วยมิลลิวินาที
    // }, 5000); // 5 วินาทีในหน่วยมิลลิวินาที
  

    this.http.post<any>(`${apiUrl}/checkout-credit-card`, data).subscribe(
      response => {
        console.log('Token sent to server successfully');
        // ทำสิ่งที่คุณต้องการเมื่อส่ง Token ไปยังเซิร์ฟเวอร์สำเร็จ
      },
      error => {
        console.error('Failed to send token to server:', error);
        // ทำสิ่งที่คุณต้องการเมื่อการส่ง Token ไปยังเซิร์ฟเวอร์ล้มเหลว
      }
    );
  }

  saveDataToDatabase() {
  

    console.log(this.customerID)
    console.log(this.doctorsID)
    console.log(this.history)
    console.log(this.symptom)
    console.log(this.consult)
    console.log(this.price)
   
    const appointmentData = {
      customerID: this.customerID,
      doctorsID: this.doctorsID,
      history: this.history,
      symptom: this.symptom,
      consult: this.consult,
      payment: this.price,

    };
  
    this.api.addAppointment(appointmentData).subscribe(
      response => {
        console.log(response.message); // แสดงข้อความตอบกลับจาก API
        // ทำงานเพิ่มเติมหลังจากบันทึกข้อมูลเรียบร้อยแล้ว
      },
      error => {
        console.log(error.message); // แสดงข้อผิดพลาดที่เกิดขึ้น
        // จัดการข้อผิดพลาดที่เกิดขึ้น
      }
    );
    }
  
  viewUser(doctorsID: string) {
    this.router.navigate(['/chat'], {
        queryParams: { chatUserID: this.doctorsID }
    });

    setTimeout(() => {
        // ทำงานหลังจาก 5 นาที
        console.log("หลังจาก 5 นาทีที่ผ่านไป");
    }, 100000); // 5 นาทีในหน่วยมิลลิวินาที
}


}