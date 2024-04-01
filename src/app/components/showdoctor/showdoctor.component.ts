import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';;
import { DoctersResponse } from 'src/app/interfaces/doctors.interface';
import { apiUrl } from 'src/environment/environment';
@Component({
  selector: 'app-showdoctor',
  templateUrl: './showdoctor.component.html',
  styleUrls: ['./showdoctor.component.scss']
})
export class ShowdoctorComponent {
  doctor: DoctersResponse = {} as DoctersResponse;
  doctorsID: string = '';
  apiurl = apiUrl


  constructor(
    public data: DataService,
    private route: ActivatedRoute,
    private api: ApiService) { }


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
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.doctorsID = params['doctorsID'] || '';
      console.log(this.doctorsID, "ไอดี");
      if (this.doctorsID) {
        
      this.getProfileDocinfo(this.doctorsID)
     
        
      }
    });

    
  }



}
