import { Component, OnInit, HostListener } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotpasswordForm: FormGroup;
  emailAndOTP: FormGroup;
  loadingforforgotpassword = false;
  submittedproceedbtn = false;

  constructor(public us: UtilityService ,
              private formBuilder: FormBuilder ,
              private apiService: ApiService ,
              private router: Router,
              private toastr: ToastrService) {
    this.us.navigateToTopOnPageInit();
   }

  ngOnInit(): void {
    this.forgotpasswordForm = this.formBuilder.group({
      student_email_id: ['', Validators.required]
    });

  }
  closeModal() {
    $('#myModal').modal('hide');
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotpasswordForm.controls; }


  proceedToStepTwo() {
    this.submittedproceedbtn = true;
    if (this.forgotpasswordForm.invalid) {
      return;
    }
    this.loadingforforgotpassword = true;
    this.apiService.checkIfStudentExistInDatabase(this.forgotpasswordForm.controls.student_email_id.value).subscribe((response: any) => {
      if (response !== null){
        console.log(response);
        let otp = this.generateOTP();
        sessionStorage.setItem('otp', otp);
        sessionStorage.setItem('email_id', this.forgotpasswordForm.controls.student_email_id.value);
        this.emailAndOTP = this.formBuilder.group({
          student_email_id: [this.forgotpasswordForm.controls.student_email_id.value],
          otp: [otp]
          });

        this.apiService.sendOTPForPasswordVerification(this.emailAndOTP.controls.student_email_id.value ,
          this.emailAndOTP.controls.otp.value).subscribe((data: any) => {
          if (data !== null && data === 'success'){
          this.loadingforforgotpassword = false;
          this.forgotpasswordForm.reset();
          this.submittedproceedbtn = false;
          this.router.navigate(['forgot-password/verify-email-otp']);

        }
        else{
          // this.loadingforlogin = false;
          // this.toastr.error('Invalid Email Address or Password', 'Error');
        }
        });

    }
    else{
      this.loadingforforgotpassword = false;
      this.toastr.error('Sorry, Your Account Does Not Exist With Us', 'Error');
    }
    });


  }


  generateOTP()
  {
      const digits = '0123456789';
      const otpLength = 6;
      let otp = '';
      for (let i = 1; i <= otpLength; i++)
      {
          const index = Math.floor(Math.random() * (digits.length));
          otp = otp + digits[index];
      }
      return otp;
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.router.navigate(['/']);
    this.us.toggleSectionsVisibility();
  }

}
