import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
declare var $: any;
@Component({
  selector: 'app-class-ten-science',
  templateUrl: './class-ten-science.component.html',
  styleUrls: ['./class-ten-science.component.css']
})
export class ClassTenScienceComponent implements OnInit {

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
