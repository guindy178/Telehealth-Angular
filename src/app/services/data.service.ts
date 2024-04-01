import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiUrl } from "src/environment/environment";
import { customerResponse } from "../interfaces/customer.interface";
import { DoctersResponse } from "../interfaces/doctors.interface";
import { EmployeeResponse } from "../interfaces/employee.interface";

@Injectable()
export class DataService {
    
    filterEmp(arg0: (e: any) => any): EmployeeResponse[] {
        throw new Error('Method not implemented.');
      }
      //local storage
      employee_?: EmployeeResponse | null;
      get employee(): EmployeeResponse | null {
          this.employee_ = this.doctors_ || JSON.parse(localStorage.getItem("employee") ?? "{}");
          if (!this.employee_?.employeeID) this.employee_ = undefined;
          return this.employee_ ?? null;
      }
      set employee(d: EmployeeResponse | null) {
        this.employee_ = d; // แก้จาก this.employee เป็น this.employee_
        localStorage.setItem("employee", JSON.stringify(d)); // แก้จาก "doctors" เป็น "employee"
    }
    
  
      get isUserEmployeeLoggedIn() {
          return this.employee != null && this.employee.employeeID != null;
      }

    filters(arg0: (e: any) => any): DoctersResponse[] {
        throw new Error('Method not implemented.');
      }
      //local storage
      doctors_?: DoctersResponse | null;
      get doctors(): DoctersResponse | null {
          this.doctors_ = this.doctors_ || JSON.parse(localStorage.getItem("doctors") ?? "{}");
          if (!this.doctors_?.doctorsID) this.doctors_ = undefined;
          return this.doctors_ ?? null;
      }
      set doctors(d: DoctersResponse | null) {
          this.doctors_ = d;
          localStorage.setItem("doctors", JSON.stringify(d));
      }
  
      get isUserDoctorLoggedIn() {
          return this.doctors != null && this.doctors.doctorsID != null;
      }
  


    filter(arg0: (e: any) => any): customerResponse[] {
      throw new Error('Method not implemented.');
    }
    //local storage
    user_?: customerResponse | null;
    get user(): customerResponse | null {
        this.user_ = this.user_ || JSON.parse(localStorage.getItem("user") ?? "{}");
        if (!this.user_?.customerID) this.user_ = undefined;
        return this.user_ ?? null;
    }
    set user(u: customerResponse | null) {
        this.user_ = u;
        localStorage.setItem("user", JSON.stringify(u));
    }

    get isUserLoggedIn() {
        return this.user != null && this.user.customerID != null;
    }

   

    
    clear() {
        localStorage.clear();
        this.user_ = undefined;
    }

    constructor() { }


}