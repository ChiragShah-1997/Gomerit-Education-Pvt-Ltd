import { Component, OnInit, HostListener } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-class-ten',
  templateUrl: './class-ten.component.html',
  styleUrls: ['./class-ten.component.css']
})
export class ClassTenComponent implements OnInit {

  constructor(public us: UtilityService, private router: Router) { }

  ngOnInit(): void {
this.us.navigateToTopOnPageInit();

  }


@HostListener('window:popstate', ['$event'])
onPopState(event) {
  this.router.navigate(['/']);
  this.us.toggleSectionsVisibility();
}
}
