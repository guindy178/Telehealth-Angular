import { Component ,  ViewChildren, QueryList, ElementRef } from '@angular/core';
import { cart } from 'src/app/interfaces/customer.interface';
import { apiUrl } from 'src/environment/environment';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare const OmiseCard: any;
interface QueryParams {
  selectedProductIds: string;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @ViewChildren('selectAllCheckbox') selectAllCheckboxes: QueryList<ElementRef>;
  productId : number =0
  cart : cart [] = []
  customerID : string =''
  selectAllChecked: boolean = false; // เพิ่ม property สำหรับ checkbox ทั้งหมด
  selectedProductIds: number[][] = [];

  totalPrice: number = 0;
  selectedProductTotalPrice: number = 0;
  orderID : number = 0
  quantity : number = 0
  totalItems: number = 0; 
  selectedProduct: number = 0;

  ss : string =''
  selectedProductIdsa: any []=[]
  totalPricess : number =0
  productss:  number[][] = [];

  orderIDs: number [] [] = []
  constructor(
    private router: ActivatedRoute,
    public data: DataService,
    private api: ApiService,
    private routers: Router,
  )  {   this.selectAllCheckboxes = new QueryList<ElementRef>();
  }


  
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.customerID = params['customerID'] || '';
      if (this.data.user?.customerID) {
        
        this.getCart(this.customerID)
      } else {
        alert("ไม่มีผู้ใช้")
        
      }
    });
    OmiseCard.configure({
      publicKey: 'pkey_test_5wbarcc52d5vh94jspg'
    });
  
  
  
  }
  



  
  
  onSubmit() {
    console.log('รายการสินค้าที่ถูกเลือก: ',(this.orderIDs));
    this.api.Cart(this.orderIDs).subscribe(
      response => {
        console.log(response); // แสดงข้อความตอบกลับจาก API

      },
      error => {
        console.log(error); // แสดงข้อผิดพลาดที่เกิดขึ้น
        // จัดการข้อผิดพลาดที่เกิดขึ้น
      }
    );

    const cardOptions = {
      name: 'Card Holder Name',
      number: this.ss,
      expiration_month: '09',
      expiration_year: '2023',
      security_code: '123'
    };
  }
  
    deleProduct(orderID: number, ProductID: number){
      console.log(orderID, ProductID)

      this.api.deleteCart(orderID,ProductID).subscribe(
        response => {
          console.log(response); // แสดงข้อความตอบกลับจาก API
          this.getCart(this.customerID)
          this.totalPrice = 0
        },
        error => {
          console.log(error); // แสดงข้อผิดพลาดที่เกิดขึ้น
          // จัดการข้อผิดพลาดที่เกิดขึ้น
        }
      );
    }
  
    getCart(customerID: string) {
      this.api.getCart(customerID).subscribe(
        (response) => {
          this.cart = response.data;
          this.totalItems = this.cart.length;
          console.log(this.cart, 'ss');
    
          if (this.cart && this.cart.length > 0) {
            this.orderID = this.cart[0].orderID;
            console.log('OrderID:', this.orderID);
    
            const arrayOfArrays: number[][] = this.cart.map(item => [item.productID, item.quantity, item.orderID]);
            this.orderIDs = arrayOfArrays;
    
            const totalPrices = this.cart.map(item => item.unit_price * item.quantity);
            console.log(totalPrices); // แสดงราคาทั้งหมดของแต่ละรายการ
    
            const totalPriceSum = totalPrices.reduce((total, price) => total + price, 0);
            this.totalPrice = totalPriceSum;
            console.log(totalPriceSum); // แสดงผลรวมของราคาทั้งหมด
    
            OmiseCard.configureButton('#checkout-button', {
              amount: this.totalPrice * 100, // ราคาใน Omise ในหน่วยเต็ม (ไม่ต้องคูณ 100)
              currency: 'THB',
              buttonLabel: 'Pay ' + this.totalPrice + ' THB',
            });
    
            OmiseCard.attach();
          } else {
            console.log('ไม่พบข้อมูลในตะกร้า');
            // แสดงข้อความหรือดำเนินการเพิ่มเติมในกรณีที่ไม่พบข้อมูลในตะกร้า
          }
        },
        (error) => {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
          // แสดงข้อความหรือดำเนินการเพิ่มเติมในกรณีที่เกิดข้อผิดพลาดในการดึงข้อมูล
        }
      );
    }
    
SeletProductID(productID: number) {
  this.routers.navigate(['/Productdetails', productID]);

}
// toggleProductSelection(productId: string | number, orderID: number, quantity: number, unit_price: number) {

//   if (typeof productId === 'string') {
//     productId = parseInt(productId, 10); // หรือใช้ parseFloat ถ้าเป็นทศนิยม
//   }
  
//       this.productId = productId
//       this.orderID = orderID
//       this.quantity = quantity
// quantity

//   // สร้างตัวแปรเพื่อเก็บราคารวมของรายการนี้
//   const total_price = quantity * unit_price;
  
   
//   const index = this.selectedProductIds.findIndex(item => item[0] === productId);
//   if (index !== -1) {
//     // ถ้า ID มีในอาเรย์แล้ว ให้ลบออก
//     this.selectedProductIds.splice(index, 1);
//   } else {
//     // ถ้า ID ไม่มีในอาเรย์ ให้เพิ่มเข้าไปเป็นสายย่อย (nested array) พร้อมข้อมูล quantity, orderID, unit_price, และ total_price
//     this.selectedProductIds.push([productId, quantity, orderID, unit_price ]);
//   }
//     console.log(this.selectedProductIds);


//   // หากคุณต้องการแสดงราคารวมทั้งหมดใน HTML คุณสามารถเรียกฟังก์ชันคำนวณราคารวมทั้งหมดที่คุณเขียนเพิ่มไว้ด้านล่าง
//   this.calculateTotalSelectedPrice();
  
// }

// // ฟังก์ชันคำนวณราคารวมทั้งหมดของรายการที่ถูกเลือก
// calculateTotalSelectedPrice() {
//   // ให้เริ่มจากค่าราคารวมเป็น 0
//   this.selectedProductTotalPrice = 0;
  
//   console.log(this.selectedProductTotalPrice);
//   // ใช้ reduce ในการรวมราคารวมของแต่ละรายการ
//   this.selectedProductTotalPrice = this.selectedProductIds.reduce((total, item) => total + item[3], 0);

//   // อัพเดตปุ่ม Omise ด้วยราคารวมใหม่
//   OmiseCard.configureButton('#checkout-button', {
//     amount: this.selectedProductTotalPrice * 100, // ราคาใน Omise ในหน่วยเต็ม (ไม่ต้องคูณ 100)
//     currency: 'THB',
//     buttonLabel: 'Pay ' + this.selectedProductTotalPrice + ' THB'
//   });

//   OmiseCard.attach();
// }

  
}
