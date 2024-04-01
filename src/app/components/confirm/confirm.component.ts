
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';;
import { DoctersResponse } from 'src/app/interfaces/doctors.interface';
import Swal from 'sweetalert2';
declare const OmiseCard: any;

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  doctor: DoctersResponse = {} as DoctersResponse;
  doctorsID: string = '';
  customerID: string = '';
  history: string = '';
  symptom: string = '';
  consult: string = '';
  currentDate: Date = new Date();
  formattedAmount: string = '';
  formattedAmountInput: string = this.formattedAmount;
  payment!: number | string
  constructor(
    public data: DataService,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    ) { }

    alert(){
      Swal.fire({
        title: 'ยังไม่มีบริการสำหรับช่องทางนี้',
        icon: 'warning',
        
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
    
    getProfileDocinfo(doctorsID: string) {
      this.api.getDoctorsByDoctorID(doctorsID).pipe(
      
      ).subscribe(
        (result) => {
          this.doctor = result.data;
          console.log(this.doctor,"ข้อมูล appoin");
        
          const amount = Number(this.doctor.price.toString()) + '00';
          const formattedAmount = amount.toString() ;
          this.formattedAmount = amount.toString();
          console.log(this.formattedAmount.toString(),"10s");

          OmiseCard.configureButton('#checkout-button', {
            amount: formattedAmount,
            currency: 'THB',
            buttonLabel: 'Pay'+ formattedAmount +'THB'
          });
          OmiseCard.attach();
        },
        error => {
          console.error(error);
        }
      );
    }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.customerID = params['customerID'] || '';
      this.doctorsID = params['doctorsID'] || '';
      this.history = params['history'] || '';
      this.symptom = params['symptom'] || '';
      this.consult = params['consult'] || '';
      console.log(this.customerID, "customerID ลูกค้า");
      console.log(this.doctorsID, "doctorsID หมอ");
      console.log(this.consult,"ช่องทางการสื่อสาร");
      console.log(this.symptom,"อาการเป็นโรค");
      console.log(this.history,"ประวัติการแพ้ยา");
  
      if (this.doctorsID) {
        this.getProfileDocinfo(this.doctorsID);
   
       

      }
    });
    OmiseCard.configure({
      publicKey: 'pkey_test_5wbarcc52d5vh94jspg'
    });



  }

  onSubmit() {
    const cardOptions = {
      name: 'Card Holder Name',
      number: '4242424242424242',
      expiration_month: '09',
      expiration_year: '2023',
      security_code: '123'
    };
  }


}