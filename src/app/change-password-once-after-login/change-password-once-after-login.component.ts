import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
declare var $: any;
@Component({
  selector: 'app-change-password-once-after-login',
  templateUrl: './change-password-once-after-login.component.html',
  styleUrls: ['./change-password-once-after-login.component.css']
})
export class ChangePasswordOnceAfterLoginComponent implements OnInit {
  passwordIsValid;
  changePasswordForm: FormGroup;
  changePasswordDetailsForm: FormGroup;
  submittedproceed = false;
  loading = false;
  fieldTextType: boolean;

  repeatfieldTextType: boolean;
  constructor(public us: UtilityService, private formBuilder: FormBuilder,
    private apiService: ApiService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.us.navigateToTopOnPageInit();
    let getId = sessionStorage.getItem('onetimeview');
    if (getId == null) {
      this.router.navigate(['/']);
      this.us.toggleSectionsVisibility();
    }
    else {

      this.changePasswordForm = this.formBuilder.group({
        student_email_id: [sessionStorage.getItem('student_email_id')],
        student_password: ['', Validators.required],
        student_confirm_password: ['', Validators.required],
      }, { validator: this.ConfirmedValidator('student_password', 'student_confirm_password') });



    }
  }
  proceed() {

    this.submittedproceed = true;
    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.loading = true;
    this.changePasswordDetailsForm = this.formBuilder.group({
      student_email_id: [sessionStorage.getItem('student_email_id')],
      student_password: [this.changePasswordForm.controls.student_password.value],

    });

    this.apiService.PasswordChangeAndPasswordChangeFlagToTrue(this.changePasswordDetailsForm.value).subscribe((respdata: any) => {
      if (respdata !== null) {

        this.apiService.sendWelcomeGreeting(sessionStorage.getItem('student_name'),
          this.changePasswordForm.controls.student_email_id.value,
          this.changePasswordForm.controls.student_password.value).subscribe((data: any) => {
            if (respdata !== null) {

              this.loading = false;
              this.toastr.success('Password Updated Successfully', 'success');
              sessionStorage.removeItem('onetimeview');
              sessionStorage.removeItem('student_name');
              sessionStorage.setItem('student_standard', respdata.student_standard);
              if (respdata.student_standard === '9') {
                this.router.navigate(['/courses/cbse/class-nine']);
              } else {
                this.router.navigate(['/courses/cbse/class-ten']);
              }

            }
          });

      }
      else {

      }
    });

  }

  //  Switching method
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  repeattoggleFieldTextType() {
    this.repeatfieldTextType = !this.repeatfieldTextType;
  }

  // convenience getter for easy access to form fields
  get f() { return this.changePasswordForm.controls; }

  passwordValid(event) {
    this.passwordIsValid = event;
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('student_password').value;
    let confirmPass = group.get('student_confirm_password').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
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

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.router.navigate(['/']);
    this.us.toggleSectionsVisibility();
  }

}
