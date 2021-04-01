import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-class-nine-study-materials',
  templateUrl: './class-nine-study-materials.component.html',
  styleUrls: ['./class-nine-study-materials.component.css']
})
export class ClassNineStudyMaterialsComponent implements OnInit {

  constructor(public us: UtilityService) {
    this.us.navigateToTopOnPageInit();
   }

  ngOnInit(): void {
  }

}
