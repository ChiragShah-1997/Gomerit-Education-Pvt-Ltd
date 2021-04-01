import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-class-nine-mathematics-ncert-book',
  templateUrl: './class-nine-mathematics-ncert-book.component.html',
  styleUrls: ['./class-nine-mathematics-ncert-book.component.css']
})
export class ClassNineMathematicsNcertBookComponent implements OnInit {
  public isPdfLoaded = false;
  public ifanotherlinkclicked = false;
  @ViewChild('externalPdfViewer') public externalPdfViewer;

  constructor(public us: UtilityService) {
    this.us.navigateToTopOnPageInit();

   }
  ngOnInit(): void {
    //this.externalPdfViewer.pdfSrc = '';
  }

  public openPdf(url: any) {
    this.externalPdfViewer.pdfSrc = url;
    this.externalPdfViewer.refresh();
    this.isPdfLoaded = !this.isPdfLoaded;
    this.ifanotherlinkclicked = true;

    $(() => {
    var target = $('#viewer');
    if (target.length) {
        $('html,body').animate({
            scrollTop: target.offset().top - 70
        }, 1000);
        return false;
    }
      });
}

}
