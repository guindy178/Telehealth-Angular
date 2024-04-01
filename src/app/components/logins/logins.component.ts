import { Component } from '@angular/core';
import { customerResponse } from 'src/app/interfaces/customer.interface';
import { apiUrl } from 'src/environment/environment';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginsComponent {
  users : string = "";
  password : string ="";

  constructor(
    private api: ApiService,
    private router: Router,
    private data: DataService
   
  ){}

 

  login() {
    this.api.loginemp(this.users, this.password).subscribe({
      next: (res) => {
        if (!res.status) {
      
          console.log({ res });
          // ไม่สำเร็จในส่วนของ employee, ทำส่วนของ user
          this.api.login(this.users, this.password).subscribe({
            next: (res) => {
              if (!res.status) {
          
                console.log({ res });
                return;
              }
      
              this.router.navigate(['/']);
              this.data.user = res.data;
      
              console.log({ res });
            },
            error: (err) => {
              console.log({ err });
            }
          });
        } else {
          this.router.navigate(['/']);
          this.data.employee = res.data;
          console.log({ res });
        }
      },
      error: (err) => {
 
        console.log({ err });
       
      }
    });
  }
}