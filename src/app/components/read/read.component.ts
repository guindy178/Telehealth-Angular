import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { customerResponse } from 'src/app/interfaces/customer.interface';
import { Res } from 'src/app/interfaces/api.interface'
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Router } from '@angular/router';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent {
  imageSrc: string = '';
  userData: customerResponse = {} as customerResponse;
  usersResponseData: customerResponse[] = [];
 
  customerID: string = ''
  selectedFile: File | undefined;
  public changePassword = {
    password: '',
    newPassword: ''
  }
  confirmPassword: string = '';

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
  getProfile(customerID: string) {
    this.api.getUserById(customerID).subscribe({
      next: (result: Res<customerResponse>) => {
        this.userData = result.data;
        
        console.log(this.userData);
        console.log(customerID);
        const imageFile = this.userData.imageFile;
      },
      error: () => {
        // จัดการข้อผิดพลาด
      }
    });
  }



 

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.customerID = params['customerID'] || '';
      this.getProfile(this.customerID)
 
      
   
    });


  }
}