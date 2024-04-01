import { Component } from '@angular/core';


import { DoctersResponse } from 'src/app/interfaces/doctors.interface';
import { apiUrl } from 'src/environment/environment';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-logindoctor',
  templateUrl: './logindoctor.component.html',
  styleUrls: ['./logindoctor.component.scss']
})
export class LogindoctorComponent {
  users : string = "";
  password : string ="";

  constructor(
    private api: ApiService,
    private router: Router,
    private data: DataService
   
  ){}



  login() {


    this.api.logindoc(this.users, this.password).subscribe({
      next: (res) => {
        if (!res.status) {
          Swal.fire("กรุณาตรวจสอบอีกเมลและรหัสผ่านอีกครั้ง");
          console.log({ res });
          return;
        }

        this.router.navigate(['/']);
        this.data.doctors = res.data;
        
        console.log({ res });
        
        
      },
      error: (err) => {
        console.log({ err });
      }
    });
    
  }
} 