import { Component, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Res } from 'src/app/interfaces/api.interface'
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { category } from 'src/app/interfaces/employee.interface';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})

export class AddproductComponent {
  selectedFile: File | undefined;


  productName : string =''
  productDetail : string =''
  price : string =''
  quantity : string =''
  Produced_at : string =''
  Notification_number : string =''
  component : string =''
  uses : string =''


  selectedCategory: any;
  category: category[] = []

  selectedsecondary: any;
  secondary: category[] = []


  constructor(
    public data: DataService,
    private router: ActivatedRoute,
    private api: ApiService,
    private routers: Router) {
      
  }
 

  onSubmits(){
    console.log(this.productName)
    console.log(this.productDetail)
    console.log(this.selectedsecondary.typeID)
    console.log(this.price)
    console.log(this.quantity)
    console.log(this.uses)
    console.log(this.Produced_at)
    console.log(this.component)
     console.log(this.Notification_number)
  }
onSecondary() {
    // ตรวจสอบว่ามีการเลือกจังหวัดหรือไม่
    if (this.selectedCategory) {
      const refID = this.selectedCategory.typeID;
      this.api.getSecondary(refID).subscribe((response) => {
        this.secondary = response.data;
        console.log(this.secondary)
      });
    } else {
      // หากไม่ได้เลือกจังหวัด ล้างรายการเขต
      this.secondary = [];
    }
  }
  getCategory() {
    this.api.getCategory().subscribe((response) => {
      this.category = response.data;
      console.log(this.category);
      
    });
  }
  onCategoryChange() {
    if (this.selectedCategory) {
      console.log('typeID ที่ถูกเลือก:', this.selectedCategory.typeID);
        const refID = this.selectedCategory.typeID;
        this.api.getSecondary(refID).subscribe((response) => {
          this.secondary = response.data;
          console.log(this.secondary)
        });
  
    } else {
      console.log('ยังไม่ได้เลือกค่า');
    }
  }
  onSecondaryChange() {
  if (this.selectedsecondary) {
    console.log('refID ที่ถูกเลือก:', this.selectedsecondary.typeID);
  } else {
    console.log('ยังไม่ได้เลือกค่า');
  }
}


  onSubmit() {

    if (!this.selectedFile) {
      alert('กรุณาเลือกไฟล์รูปภาพ');
      return;
    }
    if (!this.productName) {
      alert('กรุณากรอกชื่อสินค้า');
      return;
    }
    if (!this.selectedsecondary) {
      alert('กรุณาเลือกหมวดหมู่');
      return;
    }
    if (!this.price) {
      alert('กรุณากรอกราคาสินค้า');
      return;
    }
    if (!this.quantity) {
      alert('กรุณากรอกจำนวนสินค้า');
      return;
    }
    if (!this.Produced_at) {
      alert('กรุณาสถานที่ผลิตสินค้า');
      return;
    }
    if (!this.Notification_number) {
      alert('กรุณากรอกเลขที่ใบจดแจ้ง');
      return;
    }
    if (!this.productDetail) {
      alert('กรุณากรอกรายละเอียดสินค้า');
      return;
    }
    if (!this.component) {
      alert('กรุณากรอกส่วนผสมสินค้า');
      return;
    }
    if (!this.uses) {
      alert('กรุณากรอกส่วนผสมของสินค้า');
      return;
    }



    this.api.Addproduct(
      this.productName,
      this.productDetail,
      this.price,
      this.quantity,
      this.Produced_at,
      this.Notification_number,
      this.component,
      this.uses,
      this.selectedsecondary.typeID,
      this.selectedFile
    ).subscribe(response => {
      // ดำเนินการกับการตอบสนองจาก API ที่ได้รับ
      console.log('API Response:', response);
      alert('ส่งข้อมูลเรียบร้อยแล้ว');
      location.reload(); 

      
    }, error => {
      // ดำเนินการเมื่อเกิดข้อผิดพลาดในการส่งข้อมูล
      console.error('API Error:', error);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
    });
  }

  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file instanceof File) {
      this.selectedFile = file;
      this.updateImagePreview();
    }
  }



  updateImagePreview() {
    const productImage = document.getElementById('productImage') as HTMLImageElement;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          productImage.src = e.target.result.toString();
        }
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      // ถ้าไม่มีไฟล์ถูกเลือก, ใช้รูปภาพเริ่มต้น
      productImage.src = 'assets/placeholder.png';
    }
  }

  ngOnInit() {
    this.getCategory()
    if (this.selectedCategory) {
      console.log('ค่าที่ถูกเลือก:', this.selectedCategory);
    } else {
      console.log('ยังไม่ได้เลือกค่า');
    }
    
   
}
}


