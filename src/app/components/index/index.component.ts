import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Producthit } from 'src/app/interfaces/customer.interface';
import { ApiService } from 'src/app/services/api.service';
import { Res } from 'src/app/interfaces/api.interface'
import { allDoctorsResponse } from 'src/app/interfaces/doctors.interface';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
    ProductHit : Producthit [] = [] 
    getDoctors: allDoctorsResponse [] = []
constructor(
  public data :DataService,
  public router: Router,
  private api : ApiService,
){

}
setData() {
  this.api.getDoctors().subscribe(
    (result: Res<allDoctorsResponse[]>) => { 
      this.getDoctors = result.data;
      console.log(this.getDoctors);
    },
    () => {
      alert("error")
    }
  );
}
getData() {
  this.api.getCHitProduct().subscribe(
    (result: Res<Producthit[]>) => { 
      this.ProductHit = result.data;

      console.log(this.ProductHit);
    },
    () => {
      alert("error")
    }
  );
}
ngOnInit() {
  this.getData()
  this.setData()
  
}
  logout() {
    this.data.clear();
    this.router.navigate(["/login"]);
  }
}
