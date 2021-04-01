import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email-otp',
  templateUrl: './verify-email-otp.component.html',
  styleUrls: ['./verify-email-otp.component.css']
})
export class VerifyEmailOtpComponent implements OnInit {

  verifyPasswordForm: FormGroup;
  loadingforVerifyOTP = false;
  submittedVerify = false;

  constructor(public us: UtilityService , private formBuilder: FormBuilder , private router: Router , private toastr: ToastrService) {
    this.us.navigateToTopOnPageInit();
   }

  ngOnInit(): void {
    if (sessionStorage.getItem('otp') === null)
    {
        this.router.navigate(['/']);
        this.us.toggleSectionsVisibility();
    }
    else {
      this.verifyPasswordForm = this.formBuilder.group({
        otp: ['', Validators.required]
      });
    }

  }

  get l() { return this.verifyPasswordForm.controls; }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  proceedToStepThree() {
    this.submittedVerify = true;
    if (this.verifyPasswordForm.invalid) {
      return;
    }
    this.loadingforVerifyOTP = true;
    if (this.verifyPasswordForm.controls.otp.value === sessionStorage.getItem('otp')){

    this.toastr.success('OTP Verified Successfully' , 'Success');
    this.router.navigate(['forgot-password/verify-email-otp/generate-new-password']);
    }
    else {
      this.toastr.error('Invalid OTP, Please Try Again' , 'Verification Failed');
      this.submittedVerify = false;
      this.loadingforVerifyOTP = false;
    }
  }




}
