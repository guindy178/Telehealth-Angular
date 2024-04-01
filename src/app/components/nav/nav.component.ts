import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  userId: string ='';
  constructor(
    public data: DataService,
    public router: Router,
  ) {}



  ngOnInit() {
  
}


  




logout() {
  if (this.data.user) {
    this.data.clear();
    this.router.navigate(['/login']).then(() => {
      location.reload();
    });
  } else if (this.data.doctors) {
    this.data.clear();
    this.router.navigate(['/login/doctor']).then(() => {
      location.reload();
    });
  } else if (this.data.employee){
    this.data.clear();
    this.router.navigate(['/login']).then(() => {
      location.reload();
    });
  }

}
}
