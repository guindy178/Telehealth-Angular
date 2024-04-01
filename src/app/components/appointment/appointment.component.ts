import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';;
import { DoctersResponse } from 'src/app/interfaces/doctors.interface';
import { apiUrl } from 'src/environment/environment';
import Swal from 'sweetalert2';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  doctor: DoctersResponse = {} as DoctersResponse;
  doctorsID: string = '';
  apiurl = apiUrl

  formData: any = {}; // สร้างตัวแปร formData เพื่อเก็บข้อมูลที่ต้องการส่งไปยังหน้าอื่น

  history : string = '';
  symptom : string = '';
  consult : string = '';
 
  constructor(
    public data: DataService,
    private route: ActivatedRoute, 
    private api: ApiService,
    private router: Router,
    ) { }


    getProfileDocinfo(doctorsID: string) {
      this.api.getDoctorsByDoctorID(doctorsID).pipe(
      
      ).subscribe(
        (result) => {
          this.doctor = result.data;
          console.log(this.doctor,"ข้อมูล appoin");
        
        
        },
        error => {
          console.error(error);
        }
      );
    }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.doctorsID = params['doctorsID'] || '';
      if (this.doctorsID)
      this.getProfileDocinfo(this.doctorsID)
      console.log(this.doctorsID, "หมอที่ผู้ใช้เลือกมา");
      console.log(this.data.user?.customerID, "ผู้ใช้งานทั่วไป");
      
    });

    
  }

  navigateToConfirm() {
    const history = this.history;
    const symptom = this.symptom;
    const consult = this.consult;
    if (consult === 'โทร') {
      Swal.fire({
        icon: 'error',
        title: 'ระบบยังไม่รองรับการบริการนี้',
        text: 'ขณะนี้รองรับการบริการแค่การแชท',
       
      });
      return;
    }
    if (consult === 'วีดีโอ') {
      Swal.fire({
        icon: 'error',
        title: 'ระบบยังไม่รองรับการบริการนี้',
        text: 'ขณะนี้รองรับการบริการแค่การแชท',
       
      });
      return;
    }
  
  
    
    const queryParams: NavigationExtras = {
      queryParams: {
        customerID : this.data.user?.customerID,
        doctorsID: this.doctorsID,
        history: history,
        symptom: symptom,
        consult: consult
      }
    };
    
  
    this.router.navigate(['/confirm'], queryParams);
  }
  
  

}
