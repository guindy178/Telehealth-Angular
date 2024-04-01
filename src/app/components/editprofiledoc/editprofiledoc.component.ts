import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Res } from 'src/app/interfaces/api.interface'
import { DataService } from 'src/app/services/data.service';;
import { DoctersResponse } from 'src/app/interfaces/doctors.interface';
import { mergeMap } from 'rxjs/operators';
import { apiUrl } from 'src/environment/environment';
import { of, zip } from 'rxjs';
import { expertiseResponse } from 'src/app/interfaces/doctors.interface';
import { DepartmentResponse } from 'src/app/interfaces/doctors.interface';
import { allResponse } from 'src/app/interfaces/doctors.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editprofiledoc',
  templateUrl: './editprofiledoc.component.html',
  styleUrls: ['./editprofiledoc.component.scss']
})
export class EditprofiledocComponent implements OnInit {
  doctor: DoctersResponse = {} as DoctersResponse;
 
  expertise: expertiseResponse[] = []
  selectedDepartment: any;
  selectedExpertise: any;
  selectedFile: File | undefined;
  doctorsID: string = '';
  apiurl = apiUrl
  getall: allResponse [] = []
  timeInput = '';
  Identification: string =''

  selectedFileName: File | undefined;
  selectedFileNameslicense: File | undefined; 
 

  constructor(
    public data: DataService,
    private route: ActivatedRoute,
    private api: ApiService) { }
    
    onFileSelecteds(event: any) {
      this.selectedFileName = event.target.files[0];
    }
    onUploadName(doctorsID: string) {
      if (this.selectedFileName) { // ตรวจสอบว่ามีไฟล์ที่ถูกเลือก
        const imageCard = new FormData();
        imageCard.append('imageCard', this.selectedFileName, this.selectedFileName.name);
    
        this.api.uploadImages_card(doctorsID, imageCard).subscribe(
          (res) => {
            // การอัปโหลดสำเร็จ
            console.log('อัปโหลดสำเร็จ', res);
        
          },
          (error) => {
            // การอัปโหลดล้มเหลว
            console.error('เกิดข้อผิดพลาดในการอัปโหลด', error);
          }
        );
      }
    }
    addHyphens(event: any) {
      let inputValue = event.target.value;
    
      // นับจำนวนตัวอักษรทั้งหมดในข้อความที่ป้อนเข้ามา
      const charCount = inputValue.length;
    
      // ตรวจสอบว่ามีมากกว่า 15 ตัวอักษรหรือไม่
      if (charCount > 17) {
        // ถ้ามีมากกว่า 15 ตัวอักษร ให้ลบตัวอักษรเหล surplus
        inputValue = inputValue.slice(0, 17);
      }
    
      // เช็คว่าตัวอักษรที่ถูกป้อนคือ "x" และตำแหน่งที่เหมาะสมในการเพิ่มเครื่องหมาย "-"
      if (charCount === 1 || charCount === 6 || charCount === 12 || charCount === 15) {
        // ถ้าเป็นตัวอักษร "x" และตำแหน่งที่เหมาะสม
        // เพิ่มเครื่องหมาย "-" เข้าไป
        inputValue += '-';
      }
    
      // กำหนดค่าให้กับ Input
      event.target.value = inputValue;
    }
    
    
    
    
    addIdentification(doctorsID : string){
        this.api.AddCard(doctorsID, this.Identification).subscribe({
          next: (res) =>{
            console.log(res.message)

          },
          error: (err) =>{
            console.log(err.message);
          }
        })

    }	

    onFileSelectedLis(event: any) {
    this.selectedFileNameslicense = event.target.files[0];
  
}

      onLoad(doctorsID : string) {
        this.onUploadName(doctorsID)
        this.onUploadlicense(doctorsID)
        this.addIdentification(doctorsID)
      }


    onUploadlicense(doctorsID: string) {
      if (this.selectedFileNameslicense) { // ตรวจสอบว่ามีไฟล์ที่ถูกเลือก
        const imageLicense = new FormData();
        imageLicense.append('imageLicense', this.selectedFileNameslicense, this.selectedFileNameslicense.name);

        this.api.uploadImages_license(doctorsID, imageLicense).subscribe(
          (res) => {
            // การอัปโหลดสำเร็จ
            console.log('อัปโหลดสำเร็จ', res);
            
          },
          (error) => {
            // การอัปโหลดล้มเหลว
            console.error('เกิดข้อผิดพลาดในการอัปโหลด', error);
          }
        );
      }
    }


    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }
  
    onUpload(doctorsID: string) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
        this.api.uploadImages(doctorsID, formData).subscribe(
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
    getImageUrl(imageFile: string): string {
      if (imageFile) {
        return '/api/images/' + imageFile; // เปลี่ยน '/api/images/' เป็น URL ของเซิร์ฟเวอร์ที่เก็บภาพ
      } else {
        return 'assets/default-image.jpg';
      }
    }
  
 
    calculateAge(birthday: string | undefined): number {
      if (!birthday) {
        return 0; // หรือค่าที่ต้องการเมื่อวันเกิดไม่ได้ระบุ
      }

      const birthDate = new Date(birthday);
      const currentDate = new Date();
      const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();
      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
      return Math.floor(ageInYears);
    }


    getGenderDescription(gender: number | undefined): string {
      if (gender === undefined) {
        return 'ไม่ระบุ';
      } else if (gender === 1) {
        return 'ชาย';
      } else if (gender === 0) {
        return 'หญิง';
      } else {
        return 'ไม่ระบุ';
      }
    }

    getProfileDocinfo(doctorsID: string) {
      this.api.getDoctorsByDoctorID(doctorsID).pipe(
      
      ).subscribe(
        (result) => {
          this.doctor = result.data;
          console.log(this.doctor,"เทส");
          this.doctor.status.toString()
          console.log(this.doctor.status,"เทส");
        },
        error => {
          console.error(error);
        }
      );
    }

    updateProfileDoctor(doctorsID: string) {
      this.api.editDocInfo(doctorsID, this.doctor).subscribe(
        (response) => {
          console.log(response.message); // แสดงข้อความที่ได้จากเซิร์ฟเวอร์
          // ดำเนินการอื่น ๆ ที่ต้องการหลังจากการอัปเดตโปรไฟล์สำเร็จ
          this.onUploadlicense(doctorsID)
          location.reload();
        },
        (error) => {
          console.log(error); // แสดงข้อผิดพลาดที่เกิดขึ้น
        }
      );
    }
    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.doctorsID = params['doctorsID'] || '';
        console.log(this.doctorsID, "ไอดี");
        if (this.doctorsID) {
          
        this.getProfileDocinfo(this.doctorsID)
       
          console.log(this.data.doctors?.doctorsID)
        }
      });

      
    }

  



}
