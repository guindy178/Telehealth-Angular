export interface EmployeeResponse {
    employeeID: number | string;
    firstName: string;
    lastName: string;
    gender: number;
    email: string;
    username: string;
    password: string;
    imageFile: string;
    role: string;
    birthday: string;
    isActive: string;
    start_date:string;
  }
  export interface category {
    typeID: string | number | null; 
    typeName: string;
    refID: number;
  }