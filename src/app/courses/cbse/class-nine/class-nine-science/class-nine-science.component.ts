import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
declare var $: any;
@Component({
  selector: 'app-class-nine-science',
  templateUrl: './class-nine-science.component.html',
  styleUrls: ['./class-nine-science.component.css']
})
export class ClassNineScienceComponent implements OnInit {

  constructor(public us: UtilityService) {
    $(document).ready(() => {
      $('.venobox').venobox();
      $('.venobox').venobox({
        numeratio: true,
      });
    });
   }


  ngOnInit(): void {
this.us.navigateToTopOnPageInit();
  }
}
