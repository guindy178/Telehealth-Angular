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
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.scss']
})
export class ExpertiseComponent {
  doctor: DoctersResponse = {} as DoctersResponse;
  selectedDepartment: any;
  selectedExpertise: any;

  departmentOptions: DepartmentResponse[] = []
  getall: allResponse [] = []

  allExpertiseOptions: expertiseResponse[] = []
  expertiseOptions: expertiseResponse[] = []

  matchingDepartment: any;
  doctorsID: string = '';
  apiurl = apiUrl
  constructor(
    public data: DataService,
    private route: ActivatedRoute,
    private api: ApiService) { }

    getallDoc(doctorsID: string) {
      this.api.getexpertise_expertise(doctorsID).subscribe(
        (response) => {
          this.getall = response.data.map((expertise: any) => ({
            ...expertise,
            
          }));
          console.log(this.getall);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    onDeleteExpertise(expertiseID: string) {
      Swal.fire({
        title: 'คุณแน่ใจที่จะลบ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ใช่ ฉันต้องการที่จะลบ',
        cancelButtonText: 'ไม่ ยกเลิก!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          // ถ้าผู้ใช้กดตกลงใน SweetAlert2 ให้ทำการลบข้อมูลดังนี้
          this.api.deleteExpertise(expertiseID).subscribe(
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
    
    
    onAddExpertise(doctorsID: string, expertiseID: string) {
      this.api.addExpertise(doctorsID, expertiseID).subscribe(
        (response) => {
          // การทำอะไรกับ response ที่ได้รับจาก backend
          console.log(response);
  
          // ตรวจสอบว่า API มีข้อความ "Failed to add expertise to doctor" ใน response หรือไม่
          if (response.message === 'Failed to add expertise to doctor') {
            // แสดง SweetAlert2 เมื่อเกิดข้อผิดพลาด
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to add expertise to doctor',
            });
          } else {
            location.reload();
      
          
          }
         
        },
        
        (error) => {
          // แสดง SweetAlert2 กรณีเกิดข้อผิดพลาดในการติดต่อ API
          Swal.fire({
            icon: 'error',
            title: 'คุณเลือกความชำนาญซ้ำ',
          
          });
          console.error(error.message);
        }
      );
    }

    getDpartment() {
      this.api.getDepartment().subscribe((response) => {
        this.departmentOptions = response.data;
        console.log(this.departmentOptions);
        
      });
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
  


  onExpertiseSelect(event: any) {
    console.log("Department ID:", this.selectedDepartment?.departmentID);
    if(this.selectedDepartment){
       this.api.getexpertise(this.selectedDepartment?.departmentID).subscribe((response) => {
          this.allExpertiseOptions = response.data;
          console.log(this.allExpertiseOptions)
        });
      } else {
        console.log("ต้องเลือก แผนก")
      }
    } 



  



 
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.doctorsID = params['doctorsID'] || '';
      console.log(this.doctorsID, "ไอดี");
      if (this.doctorsID) {
        this.getDpartment()
      this.getProfileDocinfo(this.doctorsID)
      this.getallDoc(this.doctorsID); 
        console.log(this.data.doctors?.doctorsID)
      }
    });

    
  }
}

