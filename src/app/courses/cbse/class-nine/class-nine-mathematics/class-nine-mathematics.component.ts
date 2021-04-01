import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
declare var $: any;
@Component({
  selector: 'app-class-nine-mathematics',
  templateUrl: './class-nine-mathematics.component.html',
  styleUrls: ['./class-nine-mathematics.component.css']
})
export class ClassNineMathematicsComponent implements OnInit {

  constructor(public us: UtilityService) {
    console.log('class-nine-mathematics called');
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
