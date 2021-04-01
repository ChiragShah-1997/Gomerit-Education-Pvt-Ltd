import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public sessionExist() {
    if (sessionStorage.getItem('student_email_id')){
      return true;
    }
    else {
      return false;
    }

  }

  public IfNineClassStudent() {
    if (sessionStorage.getItem('student_standard') === '9'){
      return true;
    }
    else {
      return false;
    }

  }

  public IfTenClassStudent() {
    if (sessionStorage.getItem('student_standard') === '10'){
      return true;
    }
    else {
      return false;
    }

  }



  public navigateToTopOnPageInit() {
    window.scrollTo(0, 0);
    $('#hero').css('display' , 'none');
    $('#about').css('display' , 'none');
    $('#mission').css('display' , 'none');
    $('#main').css('display' , 'none');
    $('#livelec').css('display', 'none !important');
  }


  public toggleSectionsVisibility() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    $('#hero').css('display' , 'block');
    $('#about').css('display' , 'block');
    $('#mission').css('display' , 'block');
    $('#main').css('display' , 'block');
    $('#livelec').css('display', 'block');

  }

  public hideEverthingForAdminLogin() {
    window.scrollTo(0, 0);
    $('#hero').css('display' , 'none');
    $('#about').css('display' , 'none');
    $('#mission').css('display' , 'none');
    $('#main').css('display' , 'none');
    $('#topbar').removeClass('d-lg-block');
    $('#topbar').css('display' , 'none !important');
    $('#header').css('display' , 'none');
    $('#footer').css('display' , 'none');
    $('#header-sticky-wrapper').css('display', 'none');
    $('#livelec').css('display', 'none !important');
  }

}
