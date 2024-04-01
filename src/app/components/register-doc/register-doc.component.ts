import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { apiUrl } from 'src/environment/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { customerResponse } from 'src/app/interfaces/customer.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register-doc',
  templateUrl: './register-doc.component.html',
  styleUrls: ['./register-doc.component.scss']
})
export class RegisterDocComponent {
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


  register() {
  
      this.api.registerdoc({
        username: this.users,
        password: this.password,
        gender: this.gender!,
        firstName : this.firstName,
        lastName : this.lastName,
        mobilePhone : this.mobilePhone,
        email : this.email,
      }).subscribe({
        next: (res) => {
          console.log('success', res);
          this.router.navigate(['/login']);
          this.api.logindoc(this.users, this.password).subscribe({
            next: (res) => {
              if (!res.status) {
                Swal.fire('กรุณาตรวจสอบอีเมลและรหัสผ่านอีกครั้ง');
                console.log(res);
                return;
              }

              this.router.navigate(['/']);
              this.data.doctors = res.data;
              Swal.fire({
                icon: 'success',
                title: 'สมัครสมาชิกเรียบร้อย',
                text: 'กรุณาอ่านเงื่อนไขการเปิดรับคำปรึกษา',
            });

              console.log(res);
            },
            error: (err) => {
              console.log(err);
            }
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
