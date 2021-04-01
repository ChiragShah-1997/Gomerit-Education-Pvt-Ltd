import { Component, OnInit, HostListener } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ContactUS } from '../models/ContactUS';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {


  contactusForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(public us: UtilityService , private apiService: ApiService,  private formBuilder: FormBuilder,
              private toastr: ToastrService, private router: Router) {
// console.log('Hi');
   }

  ngOnInit(): void {
    this.us.navigateToTopOnPageInit();

    this.contactusForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
  });

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  sendInquiry() {
    this.submitted = true;

    // reset alerts on submit
    //this.alertService.clear();

    // stop here if form is invalid
    if (this.contactusForm.invalid) {
        return;
    }

    this.loading = true;
    const contactusformObj = this.contactusForm.value;
    this.insertContactUsDetails(contactusformObj);
  }

  insertContactUsDetails(cus: ContactUS) {
    this.apiService.insertContactUsDetails(cus).subscribe(
      (response) =>
      {

         this.toastr.success('Your Response Has Been Recorded', 'Success');
         this.contactusForm.reset();
         this.submitted = false;
         this.loading = false;

        });
  }

  get cf() { return this.contactusForm.controls; }


  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.router.navigate(['/']);
    this.us.toggleSectionsVisibility();
  }

}
