import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Res } from 'src/app/interfaces/api.interface';
import { HttpHeaders } from '@angular/common/http';
import { Appointment } from 'src/app/interfaces/appointment.interface';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-petitions',
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.scss']
})
export class PetitionsComponent {
  doctorsID : string ='';
  customerID: number =0;
  appointment:  Appointment [] = []
  appointmentID: string = ''
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.doctorsID = params['doctorsID'];
     console.log(this.doctorsID,"เลขของตัวเอง")
     this.getData(this.doctorsID)
    });
 
  }
  
  getGenderDescription(gender: number): string {
    if (gender === 1) {
      return 'ชาย';
    } else if (gender === 0) {
      return 'หญิง';
    } else {
      return 'ไม่ระบุ';
    }
  }

  calculateAge(birthday: string | undefined): number {
    if (!birthday) {
      console.log(birthday)
      return 0; // หรือค่าที่ต้องการเมื่อวันเกิดไม่ได้ระบุ
    }
  
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(ageInYears);
  }
  
  
  
  
  getData(doctorsID: string) {
    this.api.getPetitionsByUserID(doctorsID).subscribe(
      (result: Res<Appointment[]>) => { // แก้ไขประเภทพารามิเตอร์ให้ตรงกับข้อมูลที่ API ส่งกลับมา
        this.appointment = result.data;
        console.log(this.appointment);


      },
      () => {
        alert("error")
      }
    );
  }
}