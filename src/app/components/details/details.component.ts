import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Res } from 'src/app/interfaces/api.interface'
import { DataService } from 'src/app/services/data.service';;
import { DoctorComponent } from '../doctor/doctor.component';
import { LazyLoadEvent } from 'primeng/api';
import { DoctersResponse } from 'src/app/interfaces/doctors.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  getDataDoctor: DoctersResponse [] = []
  totalRecords: number = 0;
  filteredUsers: DoctersResponse[] = [];
  searchInput :string = '';
  first: number = 0;
  
rows: number = 10; // Set your desired number of rows per page here

  constructor(
    public data: DataService,
    private route: ActivatedRoute,
    private api: ApiService
  
  ){}



  search() {
    const searchTerm = this.searchInput.toLowerCase();
  
    if (searchTerm) {
      this.filteredUsers = this.getDataDoctor.filter((user: DoctersResponse) => {
        return (
          user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm) ||
          user.mobilePhone.toLowerCase().includes(searchTerm) 
        );
      });
    } else {
      this.filteredUsers = this.getDataDoctor; // กำหนดให้แสดงข้อมูลทั้งหมดเมื่อค่า Input เป็นค่าว่าง
    }
  }
  onPageChange(event: LazyLoadEvent) {
    this.first = event.first || 0;
    this.rows = event.rows || 10;
  }
  

  getData() {
    this.api.getUserDoctors().subscribe(
      (result: Res<DoctersResponse[]>) => { // แก้ไขประเภทพารามิเตอร์ให้ตรงกับข้อมูลที่ API ส่งกลับมา
        this.getDataDoctor = result.data;
        this.filteredUsers = result.data;
        console.log(this.getDataDoctor);
      },
      () => {
        alert("error")
      }
    );
  }
    
  ngOnInit() {
    if (this.data.employee) {
      this.getData()
    } 

    
  }
}

