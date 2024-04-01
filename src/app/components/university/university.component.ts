import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';;
import { DoctersResponse } from 'src/app/interfaces/doctors.interface';
import { mergeMap } from 'rxjs/operators';
import { apiUrl } from 'src/environment/environment';
import { of, zip } from 'rxjs';
import { UniversityResponse } from 'src/app/interfaces/doctors.interface';
import { QualificationResponse } from 'src/app/interfaces/doctors.interface';
import Swal from 'sweetalert2';
import { allUniversityResponse } from 'src/app/interfaces/doctors.interface';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api'; // นำเข้า MessageService

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit{
  doctor: DoctersResponse = {} as DoctersResponse;
  doctorsID: string = '';
  apiurl = apiUrl
  uinversity : UniversityResponse[] = [];
  qualification: QualificationResponse []=[]

  selectedDate: string =''
  
  selectedUniversity: any;
  selectedQualification: any;
  getAllUniversity: allUniversityResponse [] = []
 
  constructor(
    public data: DataService,
    private route: ActivatedRoute,
    private api: ApiService,
    private messageService: MessageService
    ) { }
    formatDate(year: string) {
      const date = new Date(parseInt(year, 10), 0, 1); // ให้เลือกวันที่ 1 มกราคม ของปีที่ให้แปลง
      return format(date, 'dd/MM/yyyy'); // ให้แสดงในรูปแบบ วัน/เดือน/ปี (dd/MM/yyyy)
    }
    getallDoc(doctorsID: string) {
      this.api.getallUniversity(doctorsID).subscribe(
        (response) => {
          this.getAllUniversity = response.data.map((expertise: any) => ({
            ...expertise,
            
          }));
          console.log(this.getAllUniversity);
        },
        (error) => {
          console.error(error);
        }
      );
    }
   
    
    onAddUniversity(doctorsID: string, 
      universityID: string, 
      qulalificationID: string, 
      level: string) {

      this.api.addUniversity(doctorsID, universityID, qulalificationID, level).subscribe(
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
    getqualification() {
      this.api.getqualification().subscribe(
        (response) => {
          this.qualification = response.data
            
          
          console.log(this.qualification);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    onQualification(event: any) {
      console.log(event.qulalificationID, this.data.doctors?.doctorsID);
      
    }
    getuicersity() {
      this.api.getuniversity().subscribe(
        (response) => {
          this.uinversity = response.data
            
          
          console.log(this.uinversity);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    onUniversity(event: any) {
      this.selectedQualification = null;
      console.log(event.universityID, this.data.doctors?.doctorsID);
    
    }
    checkSelectedValues() {
      if (!this.selectedUniversity || !this.selectedUniversity.universityID) {
        Swal.fire({
          title: 'กรุณาเลือกมหาวิทยาลัย',
          icon: 'warning',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
       
        return;
      }
    
      if (!this.selectedQualification || !this.selectedQualification.qulalificationID) {
        Swal.fire({
          title: 'กรุณาเลือกวุฒิการศึกษา',
          icon: 'warning',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        
        return;
      }
      if (!this.selectedDate) {
        Swal.fire({
          title: 'กรุณราเพื่มปีจบการศึกษา',
          icon: 'warning',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        return;
      }
      // ค่าทั้งสองค่ามีค่าครบถ้วนทั้งสอง
      console.log(this.selectedUniversity.universityID,"university",this.selectedQualification.qulalificationID,"Qualification");
      console.log(this.selectedDate)
      this.onAddUniversity(this.doctorsID, this.selectedUniversity.universityID, 
        this.selectedQualification.qulalificationID, this.selectedDate)

    }
  
    onDeleteUniversity(universityID: number, qulalificationID: number) {

     // กำหนดค่า universityID ที่รับมาในพารามิเตอร์ให้กับตัวแปรที่เก็บค่า universityID
     this.selectedUniversity = universityID;
     this.selectedQualification = qulalificationID;
   
     // หลังจากกำหนดค่า universityID แล้ว คุณสามารถใช้ console.log เพื่อแสดงค่า universityID ได้
     console.log("Selected University ID:", this.selectedUniversity, 
     "Selected qulalification ID:", this.selectedQualification);

      Swal.fire({
        title: 'คุณแน่ใจที่จะลบ?',
      
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          // ถ้าผู้ใช้กดตกลงใน SweetAlert2 ให้ทำการลบข้อมูลดังนี้
          this.api.deleteUniversity(universityID, qulalificationID).subscribe(
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

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.doctorsID = params['doctorsID'] || '';
      console.log(this.doctorsID, "ไอดี");
      if (this.doctorsID) {
     
      this.getProfileDocinfo(this.doctorsID)
        this.getuicersity()
        this.getqualification()
        console.log(this.data.doctors?.doctorsID)
        this.getallDoc(this.doctorsID) 
      }
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

}
