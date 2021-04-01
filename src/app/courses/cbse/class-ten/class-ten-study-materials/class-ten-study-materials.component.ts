import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-class-ten-study-materials',
  templateUrl: './class-ten-study-materials.component.html',
  styleUrls: ['./class-ten-study-materials.component.css']
})
export class ClassTenStudyMaterialsComponent implements OnInit {

  constructor(public us: UtilityService) { }

  ngOnInit(): void {
      this.us.navigateToTopOnPageInit();
  }

}
