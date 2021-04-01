import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
declare var $: any;
@Component({
  selector: 'app-class-ten-mathematics',
  templateUrl: './class-ten-mathematics.component.html',
  styleUrls: ['./class-ten-mathematics.component.css']
})
export class ClassTenMathematicsComponent implements OnInit {

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
