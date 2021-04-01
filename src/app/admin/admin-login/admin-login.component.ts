import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/services/utility.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm: FormGroup;
  loadingforlogin = false;
  submittedlogin = false;

  constructor(private formBuilder: FormBuilder, public us: UtilityService,
              private apiService: ApiService, private toastr: ToastrService , private router: Router) {
    this.us.hideEverthingForAdminLogin();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      admin_email_id: ['', Validators.required],
      admin_password: ['', Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  login() {
    this.submittedlogin = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loadingforlogin = true;
    this.apiService.AdminAuthentication(this.loginForm.value).subscribe((data: any) => {
      if (data !== null){
      this.loadingforlogin = false;
    //  sessionStorage.setItem('student_email_id', this.loginForm.controls.student_email_id.value);
      this.loginForm.reset();
      this.submittedlogin = false;
      this.toastr.success('Logged In Successfully' , 'Success');
      sessionStorage.setItem('Admin_ID', data.admin_email_id);
         this.router.navigate(['/admin/admin-dashboard']);
      }
    else{
      this.loadingforlogin = false;
      this.toastr.error('Invalid Username or Password', 'Error');
    }
    });
    //this.checkIfAlreadyRegistered(this.loginForm.controls.student_email_id.value , this.loginForm.controls.student_password.value);

}

}
