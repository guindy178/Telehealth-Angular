import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/environment/environment';
import { ApiService } from 'src/app/services/api.service'; 
import { cart } from 'src/app/interfaces/customer.interface';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  totalPrice: number = 0
  token: string = '';
  productId: number =0
  book: any
  source: string = '';
  orderID:number =0;
  quantity: string= ''
  customerID : number = 0
  selectedProductID: any[] = [];
  cart : cart [] = []
  constructor(
    private _route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
  )
  { this._route.queryParams.subscribe(params => {
    console.log(params)
    this.token = params['omiseToken'];
    this.source = params['omiseSource'];
    this.totalPrice = params['totalPrice'];
    this.orderID = params['orderID'];
    this.customerID = params['customerID'];

    console.log(this.totalPrice / 100 ,'sss');

  }); }
  getCart(customerID: number) {
    this.api.getCartStatus(customerID).subscribe((response) => {
      this.cart = response.data;
      console.log(this.cart,'ss');
     }
  );
}
  ngOnInit(): void {
    this.getCart(this.customerID)
 
    const data = {
      token: this.token,
      source: this.source,
      price: this.totalPrice
    };
    this.http.post<any>(`${apiUrl}/checkout-credit-card`, data).subscribe(
      response => {
        console.log('Token sent to server successfully');
        this.savePaymentToDatabase()
      },
      error => {
        console.error('Failed to send token to server:', error);
        // ทำสิ่งที่คุณต้องการเมื่อการส่ง Token ไปยังเซิร์ฟเวอร์ล้มเหลว
      }
    );
}
savePaymentToDatabase(){
  const price = this.totalPrice.toString().slice(0, -2);
console.log(price);

// payments(orderID: number, payment: string, 
//   productID: number, quantity: string, customerID: number) {
      

const payment = {
  orderID: this.orderID,
  payment: price,
  customerID: this.customerID
};


  this.api.payments(payment).subscribe(
    response => {
      console.log(response.message); // แสดงข้อความตอบกลับจาก API
      this.getCart(this.customerID)
    },
    error => {
      console.log(error); // แสดงข้อผิดพลาดที่เกิดขึ้น
      // จัดการข้อผิดพลาดที่เกิดขึ้น
    }
  );
  }
}
