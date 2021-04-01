import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
studentscount: any;
lecturesscheduledcount: any;
  constructor(public us: UtilityService, private router: Router, private apiService: ApiService) {
    if (sessionStorage.getItem('Admin_ID')) {
      this.us.hideEverthingForAdminLogin();
      this.getAllStudentsCount();

    }
    else {
      this.router.navigate(['/admin/admin-login']);
    }


   }

  ngOnInit(): void {
    $(()=> {
      $('#menu-toggle').click(function(e) {
        e.preventDefault();
        $('#wrapper').toggleClass('toggled');
      });
    });
  }

  getAllStudentsCount() {
    this.apiService.getAllStudentsCount().subscribe(
      (response) => {
      //  console.log(response);
       this.studentscount = response;
       this.getAllScheduleCount();
  });
}

  getAllScheduleCount() {
    this.apiService.getAllLecturesScheduleCount().subscribe(
      (resp) => {
      //  console.log(response);
       this.lecturesscheduledcount = resp;
  });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/admin/admin-login']);
  }

}
