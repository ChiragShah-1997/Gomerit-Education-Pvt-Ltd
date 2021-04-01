import { Component, OnInit, HostListener } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(public us: UtilityService, private router: Router) {
    $(document).ready(() => {
      $('.venobox').venobox();
      $('.venobox').venobox({
        numeratio: true,
      });

      var portfolioIsotope = $('.portfolio-container').isotope({
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });

      $('#portfolio-flters li').on('click', function() {
          $('#portfolio-flters li').removeClass('filter-active');
          $(this).addClass('filter-active');

          portfolioIsotope.isotope({
            filter: $(this).data('filter')
          });
        });
    });
}

  ngOnInit(): void {
this.us.navigateToTopOnPageInit();
  }


@HostListener('window:popstate', ['$event'])
onPopState(event) {
  this.router.navigate(['/']);
  this.us.toggleSectionsVisibility();
}
}
