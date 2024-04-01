import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { apiUrl } from 'src/environment/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { customerResponse } from 'src/app/interfaces/customer.interface';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  users: string = "";
  password: string = "";
  gender: number | null = null;
  mobilePhone: string ="";

  firstName : string ="";
  lastName : string ="";
  email : string ="";
  value: string ="";
  birthday: string ="";


  isDoctor: boolean = false;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public data: DataService
  ) {
  }

  validate() {
    let msg = "";
    if (!this.users && !this.password && !this.gender && !this.mobilePhone && !this.firstName && !this.lastName && !this.email) {

      Swal.fire("กรุณากรอก ชื่อผู้ใช้และรหัสผ่าน");
    } else if (!this.users) {

      Swal.fire("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else if (!this.password) {
 
      Swal.fire("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else if (!this.gender) {

    Swal.fire("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else if (!this.mobilePhone) {
      Swal.fire("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else if (!this.firstName) {
      Swal.fire("กรุณากรอกข้อมูลให้ครบถ้วน")
    } else if (!this.email) {
      Swal.fire("กรุณากรอกข้อมูลให้ครบถ้วน")
    }

    return  msg;
  }

  registerEmp() {
    if (this.validate()) {
    }
  
    this.api.register({
      username: this.users,
      password: this.password,
      mobilePhone: this.mobilePhone,
      gender: this.gender!,
      firstName : this.firstName,
      lastName : this.lastName,
      birthday : this.birthday,
      email : this.email,
    

    }).subscribe({
      next: (res) => {

        console.log("success");
        console.log(res.message);
        this.router.navigate(["/customer/details"]);
      },
      error: (err) => {
              
      Swal.fire(
        'เกิดข้อผิดพลาด Username ซ้ำ!!',
        '',
        'error'
      )
        console.log( err.error.message);

      }
    });
  }
  register() {
    if (this.validate()) {
    }
    this.api.register({
      username: this.users,
      password: this.password,
      mobilePhone: this.mobilePhone,
      gender: this.gender!,
      firstName : this.firstName,
      lastName : this.lastName,
      birthday : this.birthday,
      email : this.email,
    }).subscribe({
      next: (res) => {
      console.log(res.message);
      this.router.navigate(["/login"]);
      },
      error: (err) => {
              
      Swal.fire(
        'เกิดข้อผิดพลาด Username ซ้ำ!!',
        '',
        'error'
      )
        console.log( err.error.message);
      
      }
    });
  }
  
}


