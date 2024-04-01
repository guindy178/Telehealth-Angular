import { Component, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { customerResponse } from 'src/app/interfaces/customer.interface';
import { Res } from 'src/app/interfaces/api.interface'
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { of, zip } from 'rxjs';
import { Router } from '@angular/router';
import { province } from 'src/app/interfaces/customer.interface';
import { district } from 'src/app/interfaces/customer.interface';
import { subdistrict } from 'src/app/interfaces/customer.interface';
import { AddressUser } from 'src/app/interfaces/customer.interface';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent {

  
  
  editDefalut: boolean = false

  AddressUser : AddressUser [] = [];
  visible: boolean = false;
  edit: boolean = false;

  imageSrc: string = '';
  userData: customerResponse = {} as customerResponse;
  usersResponseData: customerResponse[] = [];
 
  customerID: string  = '';

  selectedFile: File | undefined;
  public changePassword = {
    password: '',
    newPassword: ''
  }
  confirmPassword: string = '';

  public updatedData = {
    firstName: '',
    lastName: '',
    mobilePhone: '',
    email: '',

  };
  showPasswordSection: boolean = false;
  showAddressSection: boolean = false;
  showAddress: boolean = false;
  selectedButton: string = ''; 

  province : province[] = []
  district : district [] = []
  subdistrict : subdistrict [] = []
  
  selectedProvince: any;
  selecteddistrict: any;
  selectedsubdistrict: any;

  firstName: string = ''
  lastName:  string = ''
  address_details:  string = ''
  phone_number:  string = ''
  subdistrictID:  string = ''

  Location: string = ''; // เพิ่มตัวแปร Location และกำหนดค่าเริ่มต้นเป็นสตริงว่าง
  addressID: string = '';

  userAddress: AddressUser = {} as AddressUser
  Default: string = '1';
  constructor(
    public data: DataService,
    private router: ActivatedRoute,
    private api: ApiService,
    private routers: Router) {

   
  }
  deleteAddress(addressId:string) {
    this.addressID = addressId;
    console.log(addressId)
    console.log(this.customerID)
    this.api.deleteAddress(this.customerID, this.addressID).subscribe(
      (response) => {
        console.log('ลบที่อยู่สำเร็จ');
       
        this.getAddressUser(this.customerID);
      },
      (error) => {
        console.error('เกิดข้อผิดพลาดในการลบที่อยู่:', error);
        // ทำสิ่งที่คุณต้องการหากมีข้อผิดพลาดในการลบ
      }
    );
  }

  getUserAddressById(addressID:string) {
    this.api.getUserAddressById(addressID).subscribe((response) => {
      this.userAddress = response.data;


      
    });
  }
  
  editDefaults(addressID: string){

  
  this.api.editDefault(this.customerID, addressID).subscribe(
    (response) => {
    
     
      this.getAddressUser(this.customerID);
    },
    (error) => {
      console.error('เกิดข้อผิดพลาดในการลบที่อยู่:', error);
      // ทำสิ่งที่คุณต้องการหากมีข้อผิดพลาดในการลบ
    }
  );
  }

  showDialog1(addressID: string) {
    // กำหนดค่า addressID ให้กับคุณสมบัติในคลาส
    this.addressID = addressID;

    this.getUserAddressById(this.addressID)
    this.edit = true;
  }
  
  updateAddress() {

    if (!this.firstName && !this.phone_number && !this.selectedsubdistrict.subdistrictID && !this.address_details && !this.selectedButton) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    } 
    this.api.updateAddress(this.customerID, {
      firstName: this.userAddress.firstName,
      address_details: this.userAddress.address_details,
      phone_number: this.userAddress.phone_number,
      subdistrictID: this.selectedsubdistrict.subdistrictID,
      location: this.Location,
      addressID: this.addressID,
    }).subscribe(
      (res) => {
        console.log(res.message);
        this.closeDialog1();
        this.getAddressUser(this.customerID);
      },
      (err) => {
        console.log(err.error.message);
      }
    );
    }
  
  

  address() {
    if (!this.firstName && !this.phone_number && !this.selectedsubdistrict.subdistrictID && !this.address_details && !this.selectedButton) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    } 
    this.api.Address({
      firstName: this.firstName,
      address_details: this.address_details,
      phone_number: this.phone_number,
      customerID : this.customerID,
      subdistrictID : this.selectedsubdistrict.subdistrictID,
      location : this.Location,
    }).subscribe({
      next: (res) => {

  
        console.log(res.message);
        this.closeDialog()
        this.getAddressUser(this.customerID)
      },
      error: (err) => {
              
        console.log( err.error.message);

      }
    });
  }
  //เลือกจังหวัดและจะแสดง เขต/อำเภอที่ตรงกับจังหวัดนั้นๆ
  onProvinceSelect() {
    // ตรวจสอบว่ามีการเลือกจังหวัดหรือไม่
    if (this.selectedProvince) {
      const provinceId = this.selectedProvince.provinceID;
      this.api.getUserDistrict(provinceId).subscribe((response) => {
        this.district = response.data;
        console.log(this.district)
      });
    } else {
      // หากไม่ได้เลือกจังหวัด ล้างรายการเขต
      this.district = [];
    }
  }
  onDistrictIdSelect() {
    // ตรวจสอบว่ามีการเลือกเขต/อำเภอหรือไม่
    if (this.selecteddistrict) {
      const districtId = this.selecteddistrict.districtID;
      this.api.getUserSubdistrict(districtId).subscribe((response) => {
        this.subdistrict = response.data;
        console.log(this.subdistrict);
      });
    } else {
      // หากไม่ได้เลือกเขต/อำเภอ ล้างรายการแขวง/ตำบล
      this.subdistrict = [];
    }
  }
  
  getProvinceSelect() {
    this.api.getUserProvince().subscribe((response) => {
      this.province = response.data;
      console.log(this.province);
    });
  }
  


onButtonClick(buttonType: string, location: string) {

  this.selectedButton = buttonType;
    this.Location = location; // เมื่อคลิกปุ่มให้เก็บค่า location ไว้ในตัวแปร Location

}

  showDialog() {
    this.edit = true;
}closeDialog1() {

  this.edit = false;
  this.firstName = '';
  this.phone_number = '';
  this.selectedsubdistrict = null;
  this.address_details = '';
  this.selectedProvince = null;
  this.selecteddistrict = null;
  this.selectedsubdistrict = null;
  this.Location = '';
  this.selectedButton = '';
}
closeDialog() {
  this.visible = false;
  this.firstName = '';
  this.phone_number = '';
  this.selectedsubdistrict = null;
  this.address_details = '';
  this.selectedProvince = null;
  this.selecteddistrict = null;
  this.selectedsubdistrict = null;
  this.Location = '';
  this.selectedButton = '';
}
  handleConfirmPassword() {
    if (this.changePassword.newPassword !== this.confirmPassword) {
      // รหัสผ่านไม่ตรงกัน
      console.log("รหัสผ่านไม่ตรงกัน");
    } else {
      // รหัสผ่านตรงกัน
      console.log("รหัสผ่านตรงกัน");
      this.updatePassword(this.customerID)
    }
  }
  toggleAddresst() {
    this.showAddress = !this.showAddress;
    }
  toggleAddresstSection() {
    this.showAddressSection = !this.showAddressSection;
    }
   togglePasswordSection() {
        this.showPasswordSection = !this.showPasswordSection;
    }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload(customerID: string) {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);

      this.api.uploadImage(customerID, formData).subscribe(
        (res) => {
          // การอัปโหลดสำเร็จ
          console.log('อัปโหลดสำเร็จ', res);
          location.reload(); // รีเฟรชหน้าจอ
        },
        (error) => {
          // การอัปโหลดล้มเหลว
          console.error('เกิดข้อผิดพลาดในการอัปโหลด', error);
        }
      );
    }
  }
  updatePassword(customerID: string) {
    console.log(this.changePassword.newPassword)
    this.api.change(customerID, this.changePassword).subscribe(
      (response) => {
        console.log(response.message); // แสดงข้อความที่ได้จากเซิร์ฟเวอร์
       
      },
      (error) => {
        console.log(error); // แสดงข้อผิดพลาดที่เกิดขึ้น
      }
    );
  }

  updateProfile(customerID: string) {
    
    this.api.editProfile(customerID, this.userData).subscribe(
      (response) => {
        console.log(response.message); // แสดงข้อความที่ได้จากเซิร์ฟเวอร์
        // ดำเนินการอื่น ๆ ที่ต้องการหลังจากการอัปเดตโปรไฟล์สำเร็จ
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'อัพเดตข้อมูลสำเร็จ'
        })

      },
      (error) => {
        console.log(error); // แสดงข้อผิดพลาดที่เกิดขึ้น
      }
    );
  }
  getProfile(customerID: string) {
    this.api.getUserById(customerID).subscribe({
      next: (result: Res<customerResponse>) => {
        this.userData = result.data;
 
        const imageFile = this.userData.imageFile;
      },
      error: () => {
        // จัดการข้อผิดพลาด
      }
    });
  }
  getAddressUser(customerID: string) {
    console.log(customerID,);
    this.api.getUserAddress(customerID).subscribe((response) => {
      this.AddressUser = response.data;
      console.log(this.AddressUser,'ss');
    });
  }
  



  getImageUrl(imageFile: string): string {
    if (imageFile) {
      return '/api/images/' + imageFile; // เปลี่ยน '/api/images/' เป็น URL ของเซิร์ฟเวอร์ที่เก็บภาพ
    } else {
      return 'assets/default-image.jpg';
    }
  }


  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.customerID = params['customerID'] || '';
      if (this.customerID) {
        this.selectedsubdistrict = {}; 
        this.getProfile(this.customerID);
        this.getAddressUser(this.customerID)
        this.getProvinceSelect()
      } else {

      }
    });



  }
}