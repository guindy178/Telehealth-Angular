import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environment/environment';
import { customerResponse } from '../interfaces/customer.interface';
import { Res } from '../interfaces/api.interface';
import { DoctersResponse, alllanguageResponse } from '../interfaces/doctors.interface';
import { Observable } from 'rxjs';
import { languageResponse } from '../interfaces/doctors.interface';
import { DepartmentResponse } from '../interfaces/doctors.interface';
import { expertiseResponse } from '../interfaces/doctors.interface';
import { allResponse } from '../interfaces/doctors.interface';
import { UniversityResponse } from '../interfaces/doctors.interface';
import { QualificationResponse } from '../interfaces/doctors.interface';
import { allUniversityResponse } from '../interfaces/doctors.interface';
import { allDoctorsResponse } from '../interfaces/doctors.interface';
import { Appointment } from '../interfaces/appointment.interface';
import { EmployeeResponse } from '../interfaces/employee.interface';
import { province } from '../interfaces/customer.interface';
import { district } from '../interfaces/customer.interface';
import { subdistrict } from '../interfaces/customer.interface';
import { AddressUser } from '../interfaces/customer.interface';
import { category } from '../interfaces/employee.interface';
import { Product } from '../interfaces/product.interface';
import { Messages } from '../interfaces/message.interface';
import { Docters } from '../interfaces/doctors.interface';
import { Types } from '../interfaces/product.interface';
import { ProductTypes } from '../interfaces/product.interface';
import { cart } from '../interfaces/customer.interface';
import { Producthit } from '../interfaces/customer.interface';

      @Injectable()
      export class ApiService {
        private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        constructor(private http: HttpClient) {}

      //สำหรับใช้ร่วมกัน
      
      
      getImages(doctorsID: string): Observable<any> {
        const url = `${apiUrl}/doctor/api/image1/${doctorsID}`;
        return this.http.get(url, { responseType: 'arraybuffer' as 'json' });
      }

      uploadImages_license(doctorsID: string, imageLicense: FormData): Observable<any> {
        const url = `${apiUrl}/doctor/api/upload_license/${doctorsID}`;
      
        const httpOptions = {
          headers: new HttpHeaders(),
          responseType: 'arraybuffer' as 'json' // Set the responseType to 'arraybuffer'
        };
      

        return this.http.post(url, imageLicense, httpOptions);
      }
      uploadImages_card(doctorsID: string, imageCard: FormData): Observable<any> {
        const url = `${apiUrl}/doctor/api/upload_card/${doctorsID}`;
      
        const httpOptions = {
          headers: new HttpHeaders(),
          responseType: 'arraybuffer' as 'json',
          'Content-Type': 'multipart/form-data'
        };
        
      
        return this.http.post(url, imageCard, httpOptions);
      }


        uploadImages(doctorsID: string, imageData: FormData): Observable<any> {
          const url = `${apiUrl}/doctor/api/upload/${doctorsID}`;
        
          const httpOptions = {
            headers: new HttpHeaders(),
            responseType: 'arraybuffer' as 'json' // Set the responseType to 'arraybuffer'
          };
        
          return this.http.post(url, imageData, httpOptions);
        }

      getImage(customerID: string): Observable<any> {
        const url = `${apiUrl}/customer/api/image1/${customerID}`;
        return this.http.get(url, { responseType: 'arraybuffer' as 'json' });
      }

        uploadImage(customerID: string, imageData: FormData): Observable<any> {
          const url = `${apiUrl}/customer/api/upload/${customerID}`;
        
          const httpOptions = {
            headers: new HttpHeaders(),
            responseType: 'arraybuffer' as 'json' // Set the responseType to 'arraybuffer'
          };
        
          return this.http.post(url, imageData, httpOptions);
        }

        uploadImageProduct(productID: string, imageData: FormData): Observable<any> {
          const url = `${apiUrl}/employee/api/upload/${productID}`;
        
          const httpOptions = {
            headers: new HttpHeaders(),
            responseType: 'arraybuffer' as 'json' // Set the responseType to 'arraybuffer'
          };
        
          return this.http.post(url, imageData, httpOptions);
        }
        // สำหรับ Emp // 

        getProductbyID(ProductID: number | string) {
          const url = `${apiUrl}/employee/api/product/${ProductID}`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.get<Res<Product>>(url, { headers: headers });
        }

        getCategory() {
          const url = `${apiUrl}/employee/api/producttype`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.get<Res<category[]>>(url, { headers: headers });
        }
        getSecondary(typeID : number) {
          const url = `${apiUrl}/employee/api/category/product/${typeID}`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.get<Res<category[]>>(url, { headers: headers });
        }

        editProduct(productID: string, Product: {
          productName: string,
          productDetail: string,
          price: string,
          quantity: string,
          Produced_at: string,
          Notification_number: string,
          component: string,
          uses: string
        }): Observable<Res> {
          const url = `${apiUrl}/employee/api/editProduct/${productID}`;
          return this.http.put<Res>(url, Product, { headers: this.headers });
        }
        
        Addproduct(
          productName: string,
          productDetail: string,
          price: string,
          quantity: string,
          Produced_at: string,
          Notification_number: string,
          component: string,
          use: string,
          typeID: number,
          imagefile: File
        ): Observable<any> {
          const url = `${apiUrl}/employee/api/add/Product`;
          
          // สร้าง FormData เพื่อส่งข้อมูลไปยัง API
          const formData = new FormData();
          formData.append("productName", productName);
          formData.append("productDetail", productDetail);
          formData.append("price", price);
          formData.append("quantity", quantity);
          formData.append("Produced_at", Produced_at);
          formData.append("Notification_number", Notification_number);
          formData.append("component", component);
          formData.append("use", use);
          formData.append("typeID", typeID.toString());
          formData.append("imagefile", imagefile, imagefile.name); // แนบรูปภาพด้วยชื่อไฟล์
      
          const httpOptions = {
            headers: new HttpHeaders(),
            responseType: 'arraybuffer' as 'json' // Set the responseType to 'arraybuffer'
          };
          
          return this.http.post(url, formData, httpOptions);
        }
      

        deleteDoctor(doctorsID: string): Observable<Res> {
          const url = `${apiUrl}/employee/api/delete/doctor/${doctorsID}`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
          return this.http.delete<Res>(url, { headers });
        }
        delete(customerID: string): Observable<Res> {
          const url = `${apiUrl}/employee/api/delete/${customerID}`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
          return this.http.delete<Res>(url, { headers });
        }
        updateStatusDoctor(doctorsID: string, status: number): Observable<{ message: string }> {
          const url = `${apiUrl}/employee/api/status/${doctorsID}`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          const body = { status: status };
          return this.http.put<{ message: string }>(url, body, { headers: headers });
        }

        updateActiveDoctor(doctorsID: string, isActive: number): Observable<{ message: string }> {
          const url = `${apiUrl}/employee/api/active/doctor/${doctorsID}`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          const body = { isActive: isActive };
          return this.http.put<{ message: string }>(url, body, { headers: headers });
        }

        updateActiveStatus(customerID: string, isActive: number): Observable<{ message: string }> {
          const url = `${apiUrl}/employee/api/active/${customerID}`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          const body = { isActive: isActive };
          return this.http.put<{ message: string }>(url, body, { headers: headers });
        }

        getUserCustomer() {
          const url = `${apiUrl}/employee/api/customer`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.get<Res<customerResponse[]>>(url, { headers: headers });
        }

        getUserDoctors() {
          const url = `${apiUrl}/employee/api/doctors`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.get<Res<DoctersResponse[]>>(url, { headers: headers });
        }
        
        getUserDoctorsPetition() {
          const url = `${apiUrl}/employee/api/doctors/petition`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.get<Res<DoctersResponse[]>>(url, { headers: headers });
        }

        loginemp(username: string, password: string) {
          const url = `${apiUrl}/employee/api/login`;
          const data = {
            username: username,
            password: password
          };
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          console.log(username + password)
          return this.http.post<Res<EmployeeResponse>>(url, data, { headers: headers });
        }

      // สำหรับ Doctors // 
    

      AddCard(doctorsID: string, Identification_card: string): Observable<any> {
          const url = `${apiUrl}/doctor/api/card/${doctorsID}`;
          const body = { Identification_card: Identification_card }; // สร้าง body ที่จะส่งไปยัง API และมีค่า expertiseID

          return this.http.post(url, body, { headers: this.headers });
        }
        
      editDocInfo(doctorsID: string, data: {
        firstName?: string,
        lastName?: string,
        mobilePhone?: string,
        email?: string,
        work_history?: string,
        symptoms_consult?: string,
        price_chat?: string,
        price_call?: string,
        price_VdeoCall?: string,
      }): Observable<Res> {
        const url = `${apiUrl}/doctor/api/editProfileDoctor/${doctorsID}`;
        return this.http.put<Res>(url, data, { headers: this.headers });
      }
      
      deleteUniversity(universityID: number, qulalificationID: number): Observable<any> {
        const url = `${apiUrl}/doctor/api/deleteuniversity`;
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          body: { universityID: universityID, qulalificationID:qulalificationID  } // ส่ง expertiseID ที่ต้องการลบเป็น request body
        };
        return this.http.delete(url, httpOptions);
      }
      deleteLanguage(languageID: string): Observable<any> {
        const url = `${apiUrl}/doctor/api/deleteLanguage`;
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          body: { languageID: languageID } // ส่ง expertiseID ที่ต้องการลบเป็น request body
        };
        return this.http.delete(url, httpOptions);
      }
      deleteExpertise(expertiseID: string): Observable<any> {
        const url = `${apiUrl}/doctor/api/deleteExpertise`;
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          body: { expertiseID: expertiseID } // ส่ง expertiseID ที่ต้องการลบเป็น request body
        };
        return this.http.delete(url, httpOptions);
      }
      addExpertise(doctorsID: string, expertiseID: string): Observable<any> {
        const url = `${apiUrl}/doctor/api/addExpertise/${doctorsID}`;
        const body = { expertiseID: expertiseID }; // สร้าง body ที่จะส่งไปยัง API และมีค่า expertiseID

        return this.http.post(url, body, { headers: this.headers });
      }
      addLanguage(doctorsID: string, languageID: string): Observable<any> {
        const url = `${apiUrl}/doctor/api/addLanguage/${doctorsID}`;
        const body = { languageID: languageID }; // สร้าง body ที่จะส่งไปยัง API และมีค่า expertiseID

        return this.http.post(url, body, { headers: this.headers });
      }
      addUniversity(doctorsID: string, 
        universityID: string, 
        qulalificationID: string, 
        level: string
        ): Observable<any> {
        const url = `${apiUrl}/doctor/api/adduniversity/${doctorsID}`;
        const body = { universityID: universityID,qulalificationID: qulalificationID, level: level  }; // สร้าง body ที่จะส่งไปยัง API และมีค่า expertiseID

        return this.http.post(url, body, { headers: this.headers });
      }


      getPetitionsByUserID(doctorsID: string): Observable<Res<(Appointment [])>> {
        const url = `${apiUrl}/doctor/api/petitions/${doctorsID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<(Appointment[])>>(url, { headers: headers });
      }
      
      getPetitionByUserID(doctorsID: string): Observable<Res<(Appointment [])>> {
        const url = `${apiUrl}/doctor/api/petition/${doctorsID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<(Appointment[])>>(url, { headers: headers });
      }
      getexpertise_expertise(doctorsID: string) {
        const url = `${apiUrl}/doctor/api/expertise/department/${doctorsID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<allResponse[]>>(url, { headers: headers });
      }
      getallLanguage(doctorsID: string) {
        const url = `${apiUrl}/doctor/api/language/${doctorsID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<alllanguageResponse[]>>(url, { headers: headers });
      }
      getallUniversity(doctorsID: string) {
        const url = `${apiUrl}/doctor/api/university/${doctorsID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<allUniversityResponse[]>>(url, { headers: headers });
      }
      getqualification() {
        const url = `${apiUrl}/doctor/api/educational/qualification`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<QualificationResponse[]>>(url, { headers: headers });
      }
      getDoctors() {
        const url = `${apiUrl}/doctor/api/doctors`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<allDoctorsResponse[]>>(url, { headers: headers });
      }
      getuniversity() {
        const url = `${apiUrl}/doctor/api/university`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<UniversityResponse[]>>(url, { headers: headers });
      }
      getexpertise(departmentID: string) {
        const url = `${apiUrl}/doctor/api/expertise/${departmentID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<expertiseResponse[]>>(url, { headers: headers });
      }
      getlanguage() {
        const url = `${apiUrl}/doctor/api/language`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<languageResponse[]>>(url, { headers: headers });
      }

      getDepartment() {
        const url = `${apiUrl}/doctor/api/department`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<DepartmentResponse[]>>(url, { headers: headers });
      }

      getDoctorsByDoctorID(doctorsID: string){
        const url = `${apiUrl}/doctor/api/doctors/${doctorsID}`
        const headers = new HttpHeaders({'Content-type': 'application/json'});
        return this.http.get<Res<DoctersResponse>>(url, { headers: headers });
      }


      registerdoc(data: {
        username: string,
        password: string,
        gender: number,
        firstName : string,
        lastName : string,
        email : string,
        mobilePhone : string
        
      }) {
        const url = apiUrl + "/doctor/api/register";
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log(data +"asdsa")
        return this.http.post<DoctersResponse>(url, JSON.stringify(data), { headers: headers });
      }

      logindoc(username: string, password: string) {
        const url = `${apiUrl}/doctor/api/login`;
        const data = {
          username: username,
          password: password
        };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log(username + password)
        return this.http.post<Res<DoctersResponse>>(url, data, { headers: headers });
      }


      // สำหรับ Customer // 
    
      deleteCart(orderID: number , productID: number): Observable<any> {
        const url = `${apiUrl}/customer//api/delete/cartProduct`;
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          body: { orderID: orderID,  productID: productID} // ส่ง expertiseID ที่ต้องการลบเป็น request body
        };
        return this.http.delete(url, httpOptions);
      }

      Cart(payments: any) {
        const url = `${apiUrl}/customer/api/quantity`; // แทนที่ด้วย URL ของ API ของคุณ
        console.log(payments)
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<{ message: string }>(url, payments, { headers: headers });
      }
      updateappointment(idappointment: number): Observable<{ message: string }> {
        console.log(idappointment,"s")
        const url = `${apiUrl}/customer/api/updateappointment`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = { idappointment: idappointment };
        return this.http.put<{ message: string }>(url, body, { headers: headers });

      }
      
      getDoctorcus() {
        const url = `${apiUrl}/customer/api/doctors`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<allDoctorsResponse[]>>(url, { headers: headers });
      }
      getCHitProduct() {
        const url = `${apiUrl}/customer/api/products`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<Producthit[]>>(url, { headers: headers });
      }

      getCartStatus(customerID:  number) {
        const url = `${apiUrl}/customer/api/getcart/${customerID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<cart[]>>(url, { headers: headers });
      }
      getCart(customerID:  string) {
        const url = `${apiUrl}/customer/api/cart/${customerID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<cart[]>>(url, { headers: headers });
      }

      payments(data: {
        orderID: number, 
        payment: string, 
        customerID: number }
        ) {
        const url = apiUrl + "/customer/api/payment";
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
        console.log(data)
        return this.http.post<{ message: string }>(url, data, { headers: headers });
      }
      addToCart(customerID: string, productID: string, quantity: number, unit_price: string) {
        const url = apiUrl + "/customer/api/add/order";
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
        // สร้าง JSON object จากข้อมูลที่คุณต้องการส่ง
        const data = {
          customerID: customerID,
          productID: productID,
          quantity: quantity,
          unit_price: unit_price
        };
        console.log(data)
        return this.http.post<{ message: string }>(url, data, { headers: headers });
      }
      

      getListProductType(typeID: number) {
        const url = `${apiUrl}/customer/api/producttype/${typeID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<ProductTypes[]>>(url, { headers: headers });
      }

      getListType() {
        const url = `${apiUrl}/customer/api/product/type`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<Types[]>>(url, { headers: headers });
      }

      getDoctorsById(doctorsID: number|string) {
        const url = `${apiUrl}/customer/api/doctorsById/${doctorsID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<Docters>>(url, { headers: headers });
      }

      getmessageCustomer(customerID: number|string) {
        const url = `${apiUrl}/customer/api/message/${customerID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<Messages[]>>(url, { headers: headers });
      }
      


      getListProduct() {
        const url = `${apiUrl}/customer/api/product`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<Product[]>>(url, { headers: headers });
      }
      editDefault(customerID: string, addressID : string): Observable<{ message: string }> {
        const url = `${apiUrl}/customer/api/address/${customerID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = { addressID : addressID  };
        return this.http.put<{ message: string }>(url, body, { headers: headers });
      }


      deleteAddress(customerID: string, addressId: string): Observable<Res> {
        const url = `${apiUrl}/customer/api/delete/address/${customerID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      
        // ส่งคำขอ DELETE และใช้ request body เป็น JSON ที่มี key "addressId"
        return this.http.delete<Res>(url, {
          headers: headers,
          body: { addressId: addressId }
        });
      }
      

      

      updateAddress(customerID: string, data: {
        addressID?: string,
        firstName?: string,
        address_details?: string,
        phone_number?: string,
        subdistrictID?: string,
        location?: string,
        defaults?: string,
      }): Observable<Res> {
        const url = `${apiUrl}/customer/api/update/address/${customerID}`;
        return this.http.put<Res>(url, data, { headers: this.headers });
      }

 
      
      Address(data: {
        firstName:string,
        address_details: string, 
        phone_number: string, 
        customerID: number | string
        subdistrictID: number | string
        location:string
      
      
      }) {
        const url = apiUrl + "/customer/api/add/address";
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log(data)
        return this.http.post<{ message: string; }>(url, JSON.stringify(data), { headers: headers });
      }
      getUserProvince() {
        const url = `${apiUrl}/customer/api/province`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<province[]>>(url, { headers: headers });
      }
      getUserDistrict(provinceId: number) {
        const url = `${apiUrl}/customer/api/district/${provinceId}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<district[]>>(url, { headers: headers });
      }
      
      getUserSubdistrict(districtId: number) {
        const url = `${apiUrl}/customer/api/subdistrict/${districtId}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<subdistrict[]>>(url, { headers: headers });
      }

      getUserAddress(customerID: number | string) {
        const url = `${apiUrl}/customer/api/address/${customerID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<AddressUser[]>>(url, { headers: headers });
      }
      getUserAddressById(addressID: number | string) {
        const url = `${apiUrl}/customer/api/address/user/${addressID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Res<AddressUser>>(url, { headers: headers });
      }
      addAppointment(data: {
        customerID: number |string,
        doctorsID: number |string,
        history: string, 
        symptom: string, 
        consult: string,
        payment: string
      
      
      }) {
        const url = apiUrl + "/customer/api/appointment";
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log(data)
        return this.http.post<{ message: string; }>(url, JSON.stringify(data), { headers: headers });
      }
      change(customerID: string, datas: {
        password: string,
        newPassword: string,
    
      }) {
        const url = `${apiUrl}/customer/api/Change/${customerID}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<{ message: string; }>(url, JSON.stringify(datas), { headers: headers });
      }

        editProfile(customerID: string, data: {
          firstName: string,
          lastName: string,
          mobilePhone: string,
          email: string
        }) {
          const url = `${apiUrl}/customer/api/edit/${customerID}`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.put<{ message: string; }>(url, JSON.stringify(data), { headers: headers });
        }
        
        getUserById(customerID: string) {
          const url = `${apiUrl}/customer/api/user/${customerID}`;
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.get<Res<customerResponse>>(url, { headers: headers });
        
      }
        register(data: {
          username: string,
          password: string,
          mobilePhone: string,
          gender: number,
          firstName: string,
          lastName: string,
          email: string
          birthday : string
        }) {
          const url = apiUrl + "/customer/api/register";
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          console.log(data);
          return this.http.post<{ message: string }>(url, JSON.stringify(data), { headers: headers });
        }
        login(username: string, password: string) {
          const url = `${apiUrl}/customer/api/login`;
          const data = {
            username: username,
            password: password
          };
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          console.log(username + password)
          return this.http.post<Res<customerResponse>>(url, data, { headers: headers });
        }
      }
