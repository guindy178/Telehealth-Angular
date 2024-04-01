import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Res } from 'src/app/interfaces/api.interface'
import { DataService } from 'src/app/services/data.service';;

import { allDoctorsResponse } from 'src/app/interfaces/doctors.interface';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit{
  getDoctors: allDoctorsResponse [] = []
  doctorsID: string =''
  constructor(
    public data: DataService,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
  
  ){}

  getData() {
    this.api.getDoctors().subscribe(
      (result: Res<allDoctorsResponse[]>) => { // แก้ไขประเภทพารามิเตอร์ให้ตรงกับข้อมูลที่ API ส่งกลับมา
        this.getDoctors = result.data;
        console.log(this.getDoctors);
      },
      () => {
        alert("error")
      }
    );
  }
  
  showDoctorDetails(doctorID: number) {
    alert(`เลขประจำตัวแพทย์ที่คลิกคือ: ${doctorID}`);
  }
  
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.doctorsID = params['doctorsID'] || '';
      console.log(this.doctorsID, "ไอดี");
      this.getData()
    });

    
  }
  viewUser(doctorsID: string) {
    this.router.navigate(['/chat'], {
        queryParams: { doctorsID: this.doctorsID }
    });
}
}
