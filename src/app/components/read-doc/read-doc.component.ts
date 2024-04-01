import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DoctersResponse } from 'src/app/interfaces/doctors.interface';
import { Res } from 'src/app/interfaces/api.interface'
import { DataService } from 'src/app/services/data.service';
import { apiUrl } from 'src/environment/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-read-doc',
  templateUrl: './read-doc.component.html',
  styleUrls: ['./read-doc.component.scss']
})
export class ReadDocComponent {
  imageSrc: string = '';
  doctor: DoctersResponse = {} as DoctersResponse;
  usersResponseData: DoctersResponse[] = [];
 
  doctorsID: string = ''
  selectedFile: File | undefined;
  public changePassword = {
    password: '',
    newPassword: ''
  }
  confirmPassword: string = '';
  apiurl = apiUrl
  public updatedData = {
    firstName: '',
    lastName: '',
    mobilePhone: '',
    email: '',

  };
  showPasswordSection: boolean = false;

  constructor(
    public data: DataService,
    private router: ActivatedRoute,
    private api: ApiService,
    private routers: Router
    ) {
      
  }
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
        console.log(this.doctor);
      
      
      },
      error => {
        console.error(error);
      }
    );
  }



 

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.doctorsID = params['doctorsID'] || '';
      this.getProfileDocinfo(this.doctorsID)
 
      
   
    });


  }
}