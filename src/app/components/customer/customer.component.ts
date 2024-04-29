import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Res } from 'src/app/interfaces/api.interface'
import { DataService } from 'src/app/services/data.service';;
import { customerResponse } from 'src/app/interfaces/customer.interface';
import { LazyLoadEvent } from 'primeng/api';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  getDataCustomer: customerResponse [] = []

  filteredUsers: customerResponse[] = [];
  searchInput :string = '';
  first: number = 0;
  totalRecords: number = 0;
  rows: number = 10;

  constructor(
    public data: DataService,
    private api: ApiService,
    private router: Router
  
  ){}



  search() {
    const searchTerm = this.searchInput.toLowerCase();
  
    if (searchTerm) {
      this.filteredUsers = this.getDataCustomer.filter((user: customerResponse) => {
        return (
          user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm) ||
          user.mobilePhone.toLowerCase().includes(searchTerm) 
        );
      });
    } else {
      this.filteredUsers = this.getDataCustomer; // กำหนดให้แสดงข้อมูลทั้งหมดเมื่อค่า Input เป็นค่าว่าง
    }
  }
  onPageChange(event: LazyLoadEvent) {
    this.first = event.first || 0;
    this.rows = event.rows || 10;
  }
  

  
  showConfirmationAlert(user: customerResponse) {
    Swal.fire({
      title: 'โปรดระบุสถานะเป็นผู้ใช้งาน',
      input: 'radio',
      inputOptions: {
        '0': ' ยกเลิกเป็นสมาชิก',
        '1': ' เป็นสมาชิก'
      },
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      showLoaderOnConfirm: true,
      preConfirm: (selectedValue) => {
        if (selectedValue === undefined) {
          return Promise.reject('โปรดเลือกสถานะผู้ใช้งาน');
        }
        return selectedValue;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedValue = result.value;
        const parsedValue = parseInt(selectedValue);
        
        if (parsedValue === 0 || parsedValue === 1) {
          this.updateActive(user.customerID.toString(), parsedValue);
          console.log(parsedValue);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ค่าที่คุณเลือกไม่ถูกต้อง',
            text: 'โปรดเลือกค่าเป็น 0 หรือ 1 เท่านั้น',
          });
        }
      }
    });
  }
  
  
  

  

  deleteUser(customerID: string) {
    Swal.fire({
      title: 'คุณแน่ใจที่จะลบ?',
      text: "คุณต้องการที่จะลบผู้ใช้งานคนนี้ เมื่อคุณลบจะเปลี่ยนกลับไม่ได้?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ฉันต้องการลบ!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete(customerID).subscribe(
          (result: Res) => {
            if (result.status) {
              console.log(result.message); // ตรวจสอบข้อความในคอนโซล
              // รีเฟรชรายการผู้ใช้หลังจากการลบสำเร็จ (ตามต้องการ)
              this.getData();
              Swal.fire(
                'ลบแล้ว!!',
                'ผู้ใช้งานถูกลบออกแล้ว',
                'success'
              );
            } else {
              console.error(result.message);
              Swal.fire(
                'Error!',
                'Failed to delete the file.',
                'error'
              );
            }
          },
          (error) => {
            console.error(error);
            Swal.fire(
              'Error!',
              'Failed to delete the file.',
              'error'
            );
          }
        );
      }
    });
  }
  updateActive(customerID: string, isActive: number) {
    console.log('isActive:', isActive); // แสดงค่า isActive ในคอนโซล
    this.api.updateActiveStatus(customerID, isActive).subscribe(
      (response) => {
        console.log(response.message);
        // รีเฟรชรายการผู้ใช้หลังจากอัปเดตค่า isActive สำเร็จ (ตามต้องการ)
        this.getData();
      },
      (error) => {
        console.error(error);
        // จัดการข้อผิดพลาดตามต้องการ
      }
    );
  }
  getData() {
    this.api.getUserCustomer().subscribe(
      (result: Res<customerResponse[]>) => { // แก้ไขประเภทพารามิเตอร์ให้ตรงกับข้อมูลที่ API ส่งกลับมา
        this.getDataCustomer = result.data;
        this.filteredUsers = result.data;

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

