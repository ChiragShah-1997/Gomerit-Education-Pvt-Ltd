import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sessionExist: boolean;
  us: any;

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    //sessionStorage.clear();
    //this.sessionExist = false;
    //this.us.toggleSectionsVisibility();

  }

  scrollTo(args: string) {
  
    //args.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    $('html, body').animate({
    scrollTop: $('#' + args).offset().top
}, 1500 , 'easeInOutExpo');

}
}
