import { Component, OnInit, HostListener } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-class-nine',
  templateUrl: './class-nine.component.html',
  styleUrls: ['./class-nine.component.css']
})
export class ClassNineComponent implements OnInit {

  constructor(public us: UtilityService, private router: Router) {
    this.us.navigateToTopOnPageInit();
    if (this.us.sessionExist() === true) {

    }
   }

  ngOnInit(): void {

  }

@HostListener('window:popstate', ['$event'])
onPopState(event) {

  this.router.navigate(['/']);
  this.us.toggleSectionsVisibility();
}


}
