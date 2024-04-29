import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginsComponent } from './components/logins/logins.component';
import { RegisterComponent} from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { NavComponent } from './components/nav/nav.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { LogindoctorComponent } from './components/logindoctor/logindoctor.component';
import { ChatComponent } from './components/chat/chat.component';
import { RegisterDocComponent } from './components/register-doc/register-doc.component';
import { EditprofiledocComponent } from './components/editprofiledoc/editprofiledoc.component';
import { ProfiledocComponent } from './components/profiledoc/profiledoc.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { TokenComponent } from './components/token/token.component';
import { ExpertiseComponent } from './components/expertise/expertise.component';
import { LanguageComponent } from './components/language/language.component';
import { UniversityComponent } from './components/university/university.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { ShowdoctorComponent } from './components/showdoctor/showdoctor.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { PetitionComponent } from './components/petition/petition.component';
import { AddressComponent } from './components/address/address.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DoctordetailsComponent } from './components/doctordetails/doctordetails.component';
import { DetailsComponent } from './components/details/details.component';
import { ReadComponent } from './components/read/read.component';
import { ReadDocComponent } from './components/read-doc/read-doc.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { VeiwproductComponent } from './components/veiwproduct/veiwproduct.component';
import { ProductComponent } from './components/product/product.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { ChathistoryComponent } from './components/chathistory/chathistory.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PetitionsComponent } from './components/petitions/petitions.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
const routes: Routes = [
  { path:"login", component:LoginsComponent},
  { path:"register", component:RegisterComponent},
  { path: "login/doctor", component: LogindoctorComponent },
  { path: "register/doctor", component: RegisterDocComponent },
  {
    path:"", component:NavComponent, children:[
    {path:"", component:IndexComponent},
    {path:"Checkout", component:CheckoutComponent},
    {path:"cart", component:CartComponent},
    {path:"address", component:AddressComponent},
    {path:"Productdetails/:productID", component:ProductdetailsComponent},
    { path:"editprofile", component:EditprofileComponent},
    { path:"chat", component:ChatComponent}, 
    { path:"editprofile/doctor", component:EditprofiledocComponent},
    { path:"profile/doctor", component:ProfiledocComponent}, 
    { path:"profile/Expertis", component:ExpertiseComponent}, 
    { path:"profile/Language", component:LanguageComponent}, 
    { path:"profile/University", component:UniversityComponent}, 
    { path:"doctor", component:DoctorComponent}, 
    { path:"doctor/show", component:ShowdoctorComponent}, 
    { path:"doctor/appoinment", component:AppointmentComponent},
    { path:"doctor/show", component:ShowdoctorComponent}, 
    { path:"doctor/petition", component:PetitionComponent},
    { path:"doctor/petitions", component:PetitionsComponent},
    { path:"Shop", component:ShoppingComponent},
    { path:"Chst/history", component:ChathistoryComponent},
    
    { path:"dashboard", component:DashboardComponent},
    { path:"edit/Products", component:EditproductComponent},
    { path:"edit/Product", component:ProductComponent},
    { path:"View/Product", component:VeiwproductComponent},
    { path:"Add/Product", component:AddproductComponent},
    { path:"AddDoctor/employee", component: RegisterDocComponent },
    { path:"AddCustomer/employee", component:RegisterComponent},
    { path:"EditCustomer/employee", component:EditprofileComponent},
    { path:"EditDoctor/employee", component:EditprofiledocComponent},
    
    { path:"dashboard/View/Product", component:VeiwproductComponent},
    { path:"dashboard/customer/details", component:CustomerComponent},
    { path:"dashboard/doctor/details", component:DoctordetailsComponent},
    { path:"dashboard/doctor/details/petition", component:DetailsComponent},
    { path:"customer/details/Read", component:ReadComponent},
    { path:"doctor/details/Read-Doc", component:ReadDocComponent},

    { path:"confirm", component:ConfirmComponent},
    { path:"token", component:TokenComponent}, 
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
