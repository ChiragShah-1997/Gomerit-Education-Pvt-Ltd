import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OnlineLectureDetails } from 'src/app/models/OnlineLectureDetails';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;
@Component({
  selector: 'app-online-lecture',
  templateUrl: './online-lecture.component.html',
  styleUrls: ['./online-lecture.component.css']
})
export class OnlineLectureComponent implements OnInit {
  @ViewChild('productsTable') Table: ElementRef;
public dataTable: any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  onlineLectureForm: FormGroup;
  loadingforschedule = false;
  submittedschedule = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtInstance: Promise<DataTables.Api>;
  getAllScheduledLecturesDetailsArray: any;
  getSpecificScheduledLectureDetailsArray = [];
  showForm = true;
  buttonName = 'Schedule';
  updateIndex: any;





  constructor(public us: UtilityService, private formBuilder: FormBuilder,
              private apiService: ApiService, private router: Router, private toastr: ToastrService) {
                if (sessionStorage.getItem('Admin_ID')) {
                  this.us.hideEverthingForAdminLogin();
                }
                else {
                  this.router.navigate(['/admin/admin-login']);
                }

  }

  ngOnInit(): void {
    this.updateIndex = -1;
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   responsive: true
    // };

    $(()=> {
      $('#menu-toggle').click(function(e) {
        e.preventDefault();
        $('#wrapper').toggleClass('toggled');
      });
    });

    this.onlineLectureForm = this.formBuilder.group({
      online_lecture_date: ['', Validators.required],
      online_lecture_start_time: ['', Validators.required],
      online_lecture_end_time: ['', Validators.required],
      student_standard: ['10', Validators.required],
      online_lecture_subject: ['Mathematics', Validators.required],
      online_lecture_topic: ['', Validators.required],
      online_lecture_url: ['', Validators.required],
  });

    $(() => {

   // tslint:disable-next-line: prefer-const
    let date = new Date();
   // tslint:disable-next-line: prefer-const
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let tillDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 15);

    $('#datepickerforonlinelec').datepicker({
     uiLibrary: 'bootstrap4',
     modal: true,
     footer: true,
     format: 'yyyy-mm-dd',
     minDate: today,
     maxDate: tillDate,
     showOtherMonths: false
   });

    $('#timepicker1').timepicker({
    uiLibrary: 'bootstrap4',
    modal: true,
    mode: 'ampm',
    format: 'hh:MM TT',

         header: true,
         footer: true,
  });
    $('#timepicker2').timepicker({
    uiLibrary: 'bootstrap4',
    modal: true,
    mode: 'ampm',
    format: 'hh:MM TT',

         header: true,
         footer: true,
  });

});

    this.getAllScheduledLecturesDetailsArray = [];
   // this.getLecturesScheduled();


  }

   ngAfterViewInit(): void {
    this.automaticallyDeleteLectureScheduledAfterOneDay();
    setTimeout(()=>{
    if ($.fn.DataTable.isDataTable(this.Table.nativeElement) ) {
      $(this.Table.nativeElement).dataTable().fnDestroy();
      }

    this.apiService.getAllScheduledLecturesDetails().subscribe(
      (response) => {
        this.getAllScheduledLecturesDetailsArray = response;
        this.dataTable = $(this.Table.nativeElement);
        setTimeout(()=>{
          this.dataTable.DataTable();
          }, 1);
        if (this.getAllScheduledLecturesDetailsArray.length >= 1) {
          this.showForm = false;
        }
        // $(() => {
        //   this.dtTrigger.next();
        // });

        this.getAllScheduledLecturesDetailsArray.forEach((item) => {
          item.online_lecture_date = item.online_lecture_date.split('T')[0];
      });


      }, (error) => {
        console.log(error);
      }
    );
  },1);
    }



  schedule() {
    if (this.updateIndex === -1) {
      this.submittedschedule = true;

      if (this.onlineLectureForm.untouched) {
        return;
    }
      this.onlineLectureForm.controls.online_lecture_date.setValue(
      $('#datepickerforonlinelec').val()
      );
      this.onlineLectureForm.controls.online_lecture_start_time.setValue(
        $('#timepicker1').val()
        );
      this.onlineLectureForm.controls.online_lecture_end_time.setValue(
          $('#timepicker2').val()
          );
      this.loadingforschedule = true;
      const oldFormObj = this.onlineLectureForm.value;
      this.postOnlineLectureDetails(oldFormObj);
    }

    else {
      this.submittedschedule = true;
      this.onlineLectureForm.controls.online_lecture_date.setValue(
      $('#datepickerforonlinelec').val()
      );
      this.onlineLectureForm.controls.online_lecture_start_time.setValue(
        $('#timepicker1').val()
        );
      this.onlineLectureForm.controls.online_lecture_end_time.setValue(
          $('#timepicker2').val()
          );
      this.loadingforschedule = true;
      const oldFormObj = this.onlineLectureForm.value;
       let lec_id = sessionStorage.getItem('lec_id');
      //  let lec_id: number = +l_id;
      this.putOnlineLectureDetails(lec_id, oldFormObj);
    }

  }

  postOnlineLectureDetails(oldObj: OnlineLectureDetails) {
    this.apiService.insertOnlineLectureDetails(oldObj).subscribe(
      (res) => {
        if(res === 'success') {
          this.toastr.success('Lectured Scheduled Successfully', 'Success');
          this.onlineLectureForm.reset({student_standard: '10' , online_lecture_subject: 'Mathematics'});
          this.submittedschedule = false;
          this.loadingforschedule = false;
          this.getLecturesScheduled();
          this.showForm = false;
        }
        else {
          this.toastr.error('Lectured Scheduling Failed', 'Error');
        }


      }, (error) => {
        console.log(error);
      }
    );
  }

  putOnlineLectureDetails(lec_id: any, oldObj: OnlineLectureDetails) {
    this.apiService.updateOnlineLectureDetails(lec_id, oldObj).subscribe(
      (resp) => {
        // if (resp) {
          this.toastr.success('Lectured Schedule Updated Successfully', 'Success');
          sessionStorage.removeItem('lec_id');
          this.onlineLectureForm.reset({student_standard: '10' , online_lecture_subject: 'Mathematics'});
          this.submittedschedule = false;
          this.loadingforschedule = false;
          this.getLecturesScheduled();
          this.showForm = false;
          localStorage.removeItem('lec_id');
        // }
        // else {
        //   this.toastr.error('Failed To Update Schedule', 'Error');
        // }


      }, (error) => {
        console.log(error);
      }
    );
  }

  get l() { return this.onlineLectureForm.controls; }

  getLecturesScheduled() {

    if ($.fn.DataTable.isDataTable(this.Table.nativeElement) ) {
      $(this.Table.nativeElement).dataTable().fnDestroy();
      }
    this.apiService.getAllScheduledLecturesDetails().subscribe(
      (response) => {
        this.getAllScheduledLecturesDetailsArray = response;
        this.dataTable = $(this.Table.nativeElement);
  setTimeout(()=>{
    this.dataTable.DataTable();
    }, 2000);
        if (this.getAllScheduledLecturesDetailsArray.length >= 1) {
          this.showForm = false;
        }
        // $(() => {
        //   this.dtTrigger.next();
        // });

        this.getAllScheduledLecturesDetailsArray.forEach((item) => {
          item.online_lecture_date = item.online_lecture_date.split('T')[0];
      });


      }, (error) => {
        console.log(error);
      }
    );
  }

  displayForm() {
    this.showForm = true;
    this.buttonName = 'Schedule';
    $(() => {

      // tslint:disable-next-line: prefer-const
       let date = new Date();
      // tslint:disable-next-line: prefer-const
       let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
       let tillDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 15);

       $('#datepickerforonlinelec').datepicker({
        uiLibrary: 'bootstrap4',
        modal: true,
        footer: true,
        format: 'yyyy-mm-dd',
        minDate: today,
        maxDate: tillDate,
        showOtherMonths: false
      });

       $('#timepicker1').timepicker({
       uiLibrary: 'bootstrap4',
       modal: true,
       mode: 'ampm',
       format: 'hh:MM TT'
     });
       $('#timepicker2').timepicker({
       uiLibrary: 'bootstrap4',
       modal: true,
       mode: 'ampm',
       format: 'hh:MM TT'
     });

   });

  }

  cancelForm() {
    this.showForm = false;
    this.onlineLectureForm.reset({student_standard: '10' , online_lecture_subject: 'Mathematics'});
  }


  editLectureDetails(lec_id: any) {
    this.showForm = true;
    this.getSpecificScheduledLectureDetailsArray = [];
    sessionStorage.setItem('lec_id', lec_id);
    this.buttonName = 'Update Schedule';
    this.updateIndex = 0;
    this.apiService.getSpecificScheduledLectureDetails(lec_id).subscribe(
      (response) => {
        this.getSpecificScheduledLectureDetailsArray.push(response);
        this.getSpecificScheduledLectureDetailsArray.forEach((item) => {
          item.online_lecture_date = item.online_lecture_date.split('T')[0];
      });

        $(() => {

        // tslint:disable-next-line: prefer-const
         let date = new Date();
        // tslint:disable-next-line: prefer-const
         let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
         let tillDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 15);

         $('#datepickerforonlinelec').datepicker({
          uiLibrary: 'bootstrap4',
          modal: true,
          footer: true,
          format: 'yyyy-mm-dd',
          minDate: today,
          maxDate: tillDate,
          showOtherMonths: false,
          value: this.getSpecificScheduledLectureDetailsArray[0].online_lecture_date
        });

         $('#timepicker1').timepicker({
         uiLibrary: 'bootstrap4',
         modal: true,
         mode: 'ampm',
         format: 'hh:MM TT',
         value: this.getSpecificScheduledLectureDetailsArray[0].online_lecture_start_time
       });
         $('#timepicker2').timepicker({
         uiLibrary: 'bootstrap4',
         modal: true,
         mode: 'ampm',
         format: 'hh:MM TT',
         value: this.getSpecificScheduledLectureDetailsArray[0].online_lecture_end_time
       });

     });




        this.onlineLectureForm.controls.student_standard.setValue(this.getSpecificScheduledLectureDetailsArray[0].student_standard);
        this.onlineLectureForm.controls.online_lecture_subject.setValue(this.getSpecificScheduledLectureDetailsArray[0].online_lecture_subject);
        this.onlineLectureForm.controls.online_lecture_topic.setValue(this.getSpecificScheduledLectureDetailsArray[0].online_lecture_topic);
        this.onlineLectureForm.controls.online_lecture_url.setValue(this.getSpecificScheduledLectureDetailsArray[0].online_lecture_url);
        // this.registerForm.controls.email_id.setValue(this.getRegData.email_id);
        // this.registerForm.controls.password.setValue(this.getRegData.password);
        // this.registerForm.controls.phone.setValue(this.getRegData.phone);


      }, (error) => {
        console.log(error);
      }
    );
  }

  deleteLectureDetails(lec_id: any) {
    if (confirm('Are You Sure You Want To Delete This Scheduled Lecture ?'))
    {
      this.apiService.deleteSpecificScheduledLectureDetails(lec_id).subscribe(
        (response) => {

this.getLecturesScheduled();

        }, (error) => {
          console.log(error);
        }
      );
    }

  }




  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.destroy();
       this.dtTrigger.next();
   });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/admin/admin-login']);
  }


  automaticallyDeleteLectureScheduledAfterOneDay() {
    this.apiService.deleteLectureScheduledAfterOneDay().subscribe(
      (response) => {

 //this.getLecturesScheduled();

      }, (error) => {
        console.log(error);
      }
    );
  }


  // ngAfterViewInit(): void {
  // this.dtTrigger.next();
  //  }



  // ngOnDestroy(): void {

  //     this.dtTrigger.unsubscribe();

  //  }



}
