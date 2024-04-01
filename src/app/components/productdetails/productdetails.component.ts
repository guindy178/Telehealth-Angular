import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/interfaces/product.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent {
  
  value1: number = 1; // ตัวแปร value1 สำหรับจำนวนสินค้า
  Product: Product = {} as Product;
  ProductID: string = '';

  constructor(
    private router: ActivatedRoute,
    private data: DataService,
    private api: ApiService,
  ) {}

  getProduct(ProductID: string) {
    this.api.getProductbyID(ProductID).subscribe((response) => {
      this.Product = response.data;
      console.log(this.Product,'ss');
    });
  }

  decreaseValue() {
    if (this.value1 > 1) {
      this.value1--;
    }
  }

  increaseValue() {
    const quantity = +this.Product.quantity; // แปลง Product.quantity เป็น number
    if (this.value1 < quantity) {
        this.value1++;
    }
}

addtoCart() {
  console.log(this.ProductID, "เลขสินค้า");
  console.log(this.data.user?.customerID, "เลขผู้ใช้");
  console.log(this.value1);
  console.log(this.Product.price);

  if (this.Product.quantity == '0') {
    // แสดง SweetAlert ว่าสินค้าไม่เพียงพอ
    Swal.fire({
      icon: 'warning',
      title: 'สินค้าไม่เพียงพอ',
      text: 'ขออภัย, สินค้าไม่เพียงพอที่จะเพิ่มในตะกร้า',
    });
  } else {
    // แปลงค่า customerID เป็นสตริง หรือกำหนดค่าเริ่มต้นเป็น '' ถ้าเป็น undefined
    const customerID = this.data.user?.customerID?.toString() || '';

    this.api.addToCart(customerID, this.ProductID, this.value1, this.Product.price).subscribe(
      (response) => {
        console.log('เพิ่มสินค้าลงในตะกร้าสำเร็จ:', response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'คุณได้เพิ่มสินค้าลงตระกร้าเรียบร้อย',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการเพิ่มสินค้าลงในตะกร้า:', error);
        // คุณสามารถแสดงข้อความหรือดำเนินการอื่น ๆ ที่คุณต้องการทำในกรณีนี้
      }
    );
  }
}


  ngOnInit() {
    this.router.params.subscribe(params => {
      this.ProductID = params['productID'] || '';
      console.log(this.ProductID, "ไอดี");
      this.getProduct(this.ProductID);
    });
  }
}
