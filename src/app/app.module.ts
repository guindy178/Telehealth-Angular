import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // หรือ NoopAnimationsModule

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginsComponent } from './components/logins/logins.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataService } from './services/data.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NavComponent } from './components/nav/nav.component';

import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { LogindoctorComponent } from './components/logindoctor/logindoctor.component';
import { ChatComponent } from './components/chat/chat.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { socketUrl } from 'src/environment/environment';
import { RegisterDocComponent } from './components/register-doc/register-doc.component';
import { ProfiledocComponent } from './components/profiledoc/profiledoc.component';
import { EditprofiledocComponent } from './components/editprofiledoc/editprofiledoc.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { TokenComponent } from './components/token/token.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message'; // Import MessageModule from PrimeNG
import { TableModule } from 'primeng/table';
import { ExpertiseComponent } from './components/expertise/expertise.component';
import { LanguageComponent } from './components/language/language.component';
import { UniversityComponent } from './components/university/university.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DoctorComponent } from './components/doctor/doctor.component';
import { ShowdoctorComponent } from './components/showdoctor/showdoctor.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { PetitionComponent } from './components/petition/petition.component';
import { AddressComponent } from './components/address/address.component'; // นำเข้า MessageService
import { MenubarModule } from 'primeng/menubar';
import { CustomerComponent } from './components/customer/customer.component';
import { DoctordetailsComponent } from './components/doctordetails/doctordetails.component';
import { PaginatorModule } from 'primeng/paginator';
import { DetailsComponent } from './components/details/details.component';
import { ReadComponent } from './components/read/read.component';
import { ReadDocComponent } from './components/read-doc/read-doc.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { VeiwproductComponent } from './components/veiwproduct/veiwproduct.component';
import { ProductComponent } from './components/product/product.component';
import { EditproductComponent } from './components/editproduct/editproduct.component'; // นำเข้า AutoCompleteModule
import { FileUploadModule } from 'primeng/fileupload';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { ChathistoryComponent } from './components/chathistory/chathistory.component';
import { GalleriaModule } from 'primeng/galleria';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartComponent } from './components/cart/cart.component';
import { CheckboxModule } from 'primeng/checkbox';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PetitionsComponent } from './components/petitions/petitions.component';

const config: SocketIoConfig = {
	url: socketUrl, // socket server url;
	options: {
		transports: ['polling', 'websocket'],
    path: "/socket"
	}
}

@NgModule({
  declarations: [
    AppComponent,
    LoginsComponent,
    RegisterComponent,
    IndexComponent,
    NavComponent,
    EditprofileComponent,
    LogindoctorComponent,
    ChatComponent,
    RegisterDocComponent,
    ProfiledocComponent,
    EditprofiledocComponent,
    ConfirmComponent,
    TokenComponent,
    ExpertiseComponent,
    LanguageComponent,
    UniversityComponent,
    DoctorComponent,
    ShowdoctorComponent,
    AppointmentComponent,
    PetitionComponent,
    AddressComponent,
    CustomerComponent,
    DoctordetailsComponent,
    DetailsComponent,
    ReadComponent,
    ReadDocComponent,
    AddproductComponent,
    VeiwproductComponent,
    ProductComponent,
    EditproductComponent,
    ShoppingComponent,
    ChathistoryComponent,
    ProductdetailsComponent,
    CartComponent,
    CheckoutComponent,
    PetitionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    FormsModule,
    HttpClientModule,
    RadioButtonModule,
    DropdownModule,
    DialogModule,
    MessageModule,
    TableModule,
    ToastModule,
    MenubarModule,
    PaginatorModule,
    AutoCompleteModule,
    FileUploadModule,
    GalleriaModule,
    InputNumberModule,
    CheckboxModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [HttpClient, ApiService, DataService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
