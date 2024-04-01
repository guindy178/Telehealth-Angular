import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Res } from 'src/app/interfaces/api.interface'
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/interfaces/product.interface';
import { category } from 'src/app/interfaces/employee.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent {
  selectedFile: File | undefined;

  ProductID : string =''
  Product: Product = {} as Product ;

  
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
    getProduct(ProductID: string) {
      this.api.getProductbyID(ProductID).subscribe((response) => {
        this.Product = response.data;
        console.log(this.Product,'ss');
      });
    }
    
    ngOnInit() {
      this.router.queryParams.subscribe(params => {
        this.ProductID = params['ProductID'] || '';
        console.log(this.ProductID, "ไอดี");
        this.getProduct(this.ProductID)
      });
    }
    
    updateProduct(productID: string){
      this.onUpload(productID)

        this.api.editProduct(productID, this.Product).subscribe(
          (response) => {
            console.log(response.message); // แสดงข้อความที่ได้จากเซิร์ฟเวอร์
            // ดำเนินการอื่น ๆ ที่ต้องการหลังจากการอัปเดตโปรไฟล์สำเร็จ
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'อัพเดตข้อมูลสำเร็จ'
            })
    
          },
          (error) => {
            console.log(error); // แสดงข้อผิดพลาดที่เกิดขึ้น
          }
        );
      }
      onUpload(productID: string) {
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('imageFile', this.selectedFile, this.selectedFile.name);
          this.api.uploadImageProduct(productID, formData).subscribe(
            (res) => {
              // การอัปโหลดสำเร็จ
              console.log('อัปโหลดสำเร็จ', res);
         
            },
            (error) => {
              // การอัปโหลดล้มเหลว
              console.error('เกิดข้อผิดพลาดในการอัปโหลด', error);
            }
          );
        }
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

}
