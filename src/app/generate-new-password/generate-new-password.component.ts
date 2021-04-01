import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-generate-new-password',
  templateUrl: './generate-new-password.component.html',
  styleUrls: ['./generate-new-password.component.css']
})
export class GenerateNewPasswordComponent implements OnInit {

  passwordIsValid;
  generateNewPasswordForm: FormGroup;
  submittedUpdate = false;
  loading = false;
  fieldTextType: boolean;
  repeatfieldTextType: boolean;

  constructor(public us: UtilityService, private router: Router,
              private formBuilder: FormBuilder ,
              private apiService: ApiService,
              private toastr: ToastrService) {
    this.us.navigateToTopOnPageInit();
   }

  ngOnInit(): void {
    if (sessionStorage.getItem('otp') === null)
    {
        this.router.navigate(['/']);
        this.us.toggleSectionsVisibility();
    }
    else {

            this.generateNewPasswordForm = this.formBuilder.group({
            student_new_password: ['', Validators.required],
            student_new_confirm_password: ['', Validators.required],
          } , {validator: this.ConfirmedValidator('student_new_password', 'student_new_confirm_password') });

        }
  }


  //  Switching method
toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}
repeattoggleFieldTextType() {
  this.repeatfieldTextType = !this.repeatfieldTextType;
}

 // convenience getter for easy access to form fields
 get f() { return this.generateNewPasswordForm.controls; }

  passwordValid(event) {
    this.passwordIsValid = event;
  }



ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  };
}

update() {
this.submittedUpdate = true;
if (this.generateNewPasswordForm.invalid) {
  return;
}
this.loading = true;
this.apiService.updatePassword(sessionStorage.getItem('email_id'),
this.generateNewPasswordForm.controls.student_new_password.value).subscribe((data: any) => {
if (data !== null && data === 'success'){
this.loading = false;
this.toastr.success('Password Updated Successfully' , 'Success');
sessionStorage.removeItem('otp');
sessionStorage.removeItem('email_id');
this.router.navigate(['/']);
this.us.toggleSectionsVisibility();
}
else{

}
});

}


}
