import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Types } from 'src/app/interfaces/product.interface';
import { ProductTypes } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent {
  Product : Product [] = []
  Types : Types [] = []
  ProductTypes: ProductTypes [] = []

  selectedTypeID: number = 0; // Initialize with a default value if needed

// ใน component.ts
selectedProduct: any; // ใช้เก็บรายการที่ถูกคลิก
selectedColor: string = 'initialColor'; // ใช้สีเริ่มต้นที่คุณต้องการ

selectedProductTypeID: number | null = null; // ประกาศ selectedProductTypeID ใน ShoppingComponent

  searchInput =''
  filteredUser: (Product) [] = [] ;

  constructor(
    public data: DataService,
     public router: ActivatedRoute,
    private api: ApiService,
    private routers: Router) {

  }

  showType(typeID: number) {
    this.selectedProduct = this.filteredUser.find(product => product.refID === typeID);
 
    console.log('typeID ที่ถูกเลือก:', typeID ,"ss");
    console.log('typeID ที่ถูกเลือก:', this.selectedProduct ,"ss");
  }

  
  
search() {
  const searchTerm = this.searchInput.toLowerCase();

  if (searchTerm) {
    this.filteredUser = this.Product.filter((Product: Product) => {
      return (
        Product.productName.toLowerCase().includes(searchTerm) ||
        Product.typeID.toString().toLowerCase().includes(searchTerm)
      );
      
    });
  } else {
    this.filteredUser = this.Product; // กำหนดให้แสดงข้อมูลทั้งหมดเมื่อค่า Input เป็นค่าว่าง
  }
}


getProductTypes(typeID: number) {
  this.api.getListProductType(typeID).subscribe((response) => {
    this.ProductTypes = response.data;
    console.log(this.ProductTypes);
  });
}

getTypes(){
    this.api.getListType().subscribe((response) => {
    this.Types = response.data;
    console.log(this.Types)
  });
}

getProduct(){
    this.api.getListProduct().subscribe((response) => {
    this.Product = response.data;
    this.filteredUser = this.Product
  });
}

SeletProductID(productID: number) {
  this.routers.navigate(['/Productdetails', productID]);

}


ngOnInit() {
  this.getProduct()
  this.getTypes()
}















  

}