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
import { languageResponse } from 'src/app/interfaces/doctors.interface';
import { alllanguageResponse } from 'src/app/interfaces/doctors.interface';
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {
  doctorsID: string = '';
  doctor: DoctersResponse = {} as DoctersResponse;
  getalllangyage: alllanguageResponse [ ] = []
  language: languageResponse [ ] = []
  languageOptions: any[] = [];
  selectedLanguage: any;

  constructor(
    public data: DataService,
    private route: ActivatedRoute,
    private api: ApiService) { }
    
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.doctorsID = params['doctorsID'] || '';
      console.log(this.doctorsID, "ไอดี");
      if (this.doctorsID) {
      this.getProfileDocinfo(this.doctorsID)
      this. getLanguage()
      this.getallLanguage(this.doctorsID)
      console.log(this.data.doctors?.doctorsID)
      }
    });

    
  }

  
  onDeleteLanguage(languageID: string) {
    console.log('You clicked the delete button for languageID:', languageID);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // ถ้าผู้ใช้กดตกลงใน SweetAlert2 ให้ทำการลบข้อมูลดังนี้
        this.api.deleteLanguage(languageID).subscribe(
          (response) => {
            // ตรวจสอบ response จาก API และทำอะไรต่อ
            console.log(response);
            location.reload();
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your file has been deleted.',
            });
          },
          (error) => {
            // แสดง SweetAlert2 เมื่อเกิดข้อผิดพลาดในการลบข้อมูล
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete file.',
            });
            console.error(error);
          }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // ถ้าผู้ใช้กดยกเลิกใน SweetAlert2 ให้ทำอะไรต่อ (หากต้องการ)
        console.log('Cancelled');
      }
    });
  }
  getallLanguage(doctorsID: string) {
    this.api.getallLanguage(doctorsID).subscribe(
      (response) => {
        this.getalllangyage = response.data.map((expertise: any) => ({
          ...expertise,
          
        }));
        console.log(this.getalllangyage);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onAddLanguage(doctorsID: string, languageID: string) {
    this.api.addLanguage(doctorsID, languageID).subscribe(
      (response) => {
        // การทำอะไรกับ response ที่ได้รับจาก backend
        console.log(response);

        // ตรวจสอบว่า API มีข้อความ "Failed to add expertise to doctor" ใน response หรือไม่
        location.reload();
      },
      
      (error) => {
        // แสดง SweetAlert2 กรณีเกิดข้อผิดพลาดในการติดต่อ API
        Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถเลือกซ้ำได้',
       
    
        })
        console.error(error);
      }
    );
  }
  getLanguage() {
    this.api.getlanguage().subscribe(
      (response) => {
        this.language = response.data.map((expertise: any) => ({
          ...expertise,
        }));
  
        this.languageOptions = this.language.map((item: any) => ({
          label: item.expertiseName,
          value: item,
        }));
  
        console.log(this.language);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  // ฟังก์ชันที่เรียกเมื่อมีการเลือกภาษาใน p-dropdown
  onLanguageSelect(event: any) {
    console.log(event.languageID,this.data.doctors?.doctorsID);
    
  }
  
  
  getProfileDocinfo(doctorsID: string) {
    this.api.getDoctorsByDoctorID(doctorsID).pipe(
     
    ).subscribe(
      (result) => {
        this.doctor = result.data;
        console.log(this.doctor,"เทส");
      
       
      },
      error => {
        console.error(error);
      }
    );
  }
}
