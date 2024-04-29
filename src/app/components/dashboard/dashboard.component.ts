import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Producthit } from 'src/app/interfaces/customer.interface';
import { ApiService } from 'src/app/services/api.service';
import { Res } from 'src/app/interfaces/api.interface'
import { allDoctorsResponse } from 'src/app/interfaces/doctors.interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
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
  (result: Res<allDoctorsResponse[]>) => { // แก้ไขประเภทพารามิเตอร์ให้ตรงกับข้อมูลที่ API ส่งกลับมา
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
  (result: Res<Producthit[]>) => { // แก้ไขประเภทพารามิเตอร์ให้ตรงกับข้อมูลที่ API ส่งกลับมา
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
