import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Res } from 'src/app/interfaces/api.interface'
import { DataService } from 'src/app/services/data.service';;
import { DoctersResponse } from 'src/app/interfaces/doctors.interface';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { apiUrl } from 'src/environment/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profiledoc',
  templateUrl: './profiledoc.component.html',
  styleUrls: ['./profiledoc.component.scss']
})
export class ProfiledocComponent implements OnInit {
  doctor: DoctersResponse = {} as DoctersResponse;
  status: number = 1;
  doctorsID: string = '';
  apiurl = apiUrl
  constructor(
    public data: DataService,
    private route: ActivatedRoute,
    private api: ApiService) { }

 
  calculateAge(birthday: string | undefined): number {
    if (!birthday) {
      return 0; // หรือค่าที่ต้องการเมื่อวันเกิดไม่ได้ระบุ
    }

    const birthDate = new Date(birthday);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(ageInYears);
  }


  getGenderDescription(gender: number | undefined): string {
    if (gender === undefined) {
      return 'ไม่ระบุ';
    } else if (gender === 1) {
      return 'ชาย';
    } else if (gender === 0) {
      return 'หญิง';
    } else {
      return 'ไม่ระบุ';
    }
  }

  getProfileDocinfo(doctorsID: string) {
    this.api.getDoctorsByDoctorID(doctorsID).pipe(
     
    ).subscribe(
      (result) => {
        this.doctor = result.data;
        console.log(this.doctor,"เทส");
      
       
      },
      error => {
        console.error(error);
      }
    );
  }
  

  updateStatus(doctorsID: string, status: number) {
    console.log('status:', status); // แสดงค่า isActive ในคอนโซล
    this.api.updateStatusDoctor(doctorsID, status).subscribe(
      (response) => {
        console.log(response.message);
        // รีเฟรชรายการผู้ใช้หลังจากอัปเดตค่า isActive สำเร็จ (ตามต้องการ)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'ยืนยันตรวจสอบสำเร็จ'
        })
      },
      (error) => {
        console.error(error);
        // จัดการข้อผิดพลาดตามต้องการ
      }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.doctorsID = params['doctorsID'] || '';
      console.log(this.doctorsID, "ไอดี");
      if (this.doctorsID) {
       this.getProfileDocinfo(this.doctorsID)
      }
    });

    
  }

}
