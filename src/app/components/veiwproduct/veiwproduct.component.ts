import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { category } from 'src/app/interfaces/employee.interface';
import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-veiwproduct',
  templateUrl: './veiwproduct.component.html',
  styleUrls: ['./veiwproduct.component.scss']
})
export class VeiwproductComponent {

  Product : Product [] = []
 
  selectedCategory: any;
  category: category[] = []

  selectedsecondary: any;
  secondary: category[] = []


  searchInput =''
  filteredUser: (Product) [] = [] ;
  filteredUsers: (Product) [] = [] ;

  isDropdownOpen = false;


  first: number = 0;
  totalRecords: number = 0;
  rows: number = 10; 
  
  constructor(
    public data: DataService,
    private router: ActivatedRoute,
    private api: ApiService,
    private routers: Router) {

  }
  openfilter(){
    this.isDropdownOpen = true;
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

  getCategory() {
    this.api.getCategory().subscribe((response) => {
      this.category = response.data;
      console.log(this.category);
      
    });
  }

  onCategoryChange() {

    if (this.selectedCategory) {
      console.log('typeID ที่ถูกเลือก:', this.selectedCategory.typeID);
      const typeID = this.selectedCategory.typeID;
      // กรอง Product ตาม refID เท่ากับ typeID
      this.filteredUser = this.Product.filter((product: Product) => {
        return product.refID === typeID;
      });

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
      console.log('typeID ที่ถูกเลือก:', this.selectedsecondary.typeID);
      const typeID = this.selectedsecondary.typeID;
  
      // กรอง Product ตาม typeID และ refID ที่ไม่ตรงกัน
      this.filteredUser = this.Product.filter((product: Product) => {
        return product.typeID === typeID && product.refID !== typeID;
      });
      
    } else {
      console.log('ยังไม่ได้เลือกค่า');
    }
  }
  
  getProduct(){
      this.api.getListProduct().subscribe((response) => {
        this.Product = response.data;
        this.filteredUser = this.Product
        this.filteredUser.length
        console.log(this.filteredUser);
        console.log(this.filteredUser.length);
      });
  }
  onPageChange(event: LazyLoadEvent) {
    this.first = event.first || 0;
    this.rows = event.rows || 10;
  }
  
  ngOnInit() {
    this.getCategory()
    this.getProduct()
   
}
}
