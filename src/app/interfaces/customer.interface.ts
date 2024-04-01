export interface customerResponse {
    customerID: number | string;
    firstName: string;
    lastName: string;
    gender: number;
    email: string;
    mobilePhone: string;
    userName: string;
    password: string;
    imageFile: string;
    birthday: string;
    signup_dates: string;
    isActive: number;
   
  }
  export interface province {
    provinceID: number | string
    provinceName: string
  }
  export interface district {
    districtID: number | string
    districtName: string
    provinceID: number | string
  }
  export interface subdistrict {
    subdistrictID : number | string
    subdistrictName : string
    districtID: number | string
  }
  
  export interface AddressUser {
    addressID : number | string
    firstName : string
    address_details:string
    phone_number : string
    customerID: number | string
    subdistrictID : number
    subdistrictName:string
    districtName:string
    provinceName:string
    defaults: number
    location: string
  }

  export interface cart {
    customerID : number | string
    orderID : number 
    productID : number 
    quantity : number 
    unit_price : number 
    productName: string,
    imagefile: string
    selected: boolean;
  }

  export interface Producthit {
    productID : number 
    productName: string,
    totalSales: number
    imagefile: string
  }


