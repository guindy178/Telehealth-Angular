import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Res } from 'src/app/interfaces/api.interface'
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/interfaces/product.interface';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  ProductID : string =''
  Product: Product = {} as Product ;

  constructor(
    public data: DataService,
    private router: ActivatedRoute,
    private api: ApiService,
    private routers: Router) {

   
  }
    getAddressUser(ProductID: string) {
      this.api.getProductbyID(ProductID).subscribe((response) => {
        this.Product = response.data;
        console.log(this.Product,'ss');
      });
    }
    
    ngOnInit() {
      this.router.queryParams.subscribe(params => {
        this.ProductID = params['ProductID'] || '';
        console.log(this.ProductID, "ไอดี");
        this.getAddressUser(this.ProductID)
      });
    }
    
  
  
  

     
}
