import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Enrollment } from '../models/Enrollment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
declare var $: any;

// declare let AOS: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;
  isShow: boolean;
  topPosToStartShowing = 100;
  outside: boolean = false;
  internalRouteHeader: boolean = true;
  internalRouteHeader2: boolean = true;
  internalRouteAboutUs: boolean = true;
  internalRouteAboutUs2: boolean = true;
  internalRouteGallery: boolean = true;
  internalRouteFAQ: boolean = true;
  internalRouteRegister: boolean = true;
  externalViewGallery: boolean = true;
  externalViewForgotPassword: boolean = true;
  externalViewVerifyPassword: boolean = true;
  externalViewGenerateNewPassword: boolean = true;
  internalRouteContactUs: boolean = true;

  sessionExist = true;

  registerForm: FormGroup;
  loginForm: FormGroup;
  loadingforlogin = false;
  loadingforregister = false;
  submittedregister = false;
  submittedlogin = false;
  returnUrl: string;
  NearByLectureScheduleArray = [];
  dateDetails: any;
  starttimeDetails: any;
  endtimeDetails: any;
  standard: any;
  topic: any;
  subject: any;

  constructor(public us: UtilityService, private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router) {

    $(document).ready(() => {
      $('.venobox').venobox();
      $('.venobox').venobox({
        numeratio: true,
      });

      $(window).scroll(function () {

        var distanceTop = $('#last').offset().top - $(window).height();

        if ($(window).scrollTop() > distanceTop)
          $('#slidebox').animate({ 'right': '20px' }, 300);
        else
          $('#slidebox').stop(true).animate({ 'right': '-520px' }, 100);
      });


      $('#slidebox .close').bind('click', function () {
        $(this).parent().remove();
      });

      let portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      $('#portfolio-flters li').on('click', function () {
        $('#portfolio-flters li').removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({
          filter: $(this).data('filter')
        });
      });
    });

    this.automaticallyDeleteLectureScheduledAfterOneDay();

  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      student_name: ['', Validators.required],
      student_email_id: ['', Validators.required],
      student_mobile: ['', Validators.required],
      student_gender: ['Male', Validators.required],
      student_date_of_birth: ['', Validators.required],
      student_school_name: ['', Validators.required],
      student_standard: ['9', Validators.required],
      student_address: ['', Validators.required]
    });

    this.loginForm = this.formBuilder.group({
      student_email_id: ['', Validators.required],
      student_password: ['', Validators.required]
    });


    $(() => {

      document.onkeydown = function (e) {
        if (e.keyCode == 123) {
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
          return false;
        }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
          return false;
        }
      }


      $('[data-toggle="password"]').each(function () {
        var input = $(this);
        var eye_btn = $(this).parent().find('.input-group-text');
        eye_btn.css('cursor', 'pointer').addClass('input-password-hide');
        eye_btn.on('click', function () {
          if (eye_btn.hasClass('input-password-hide')) {
            eye_btn.removeClass('input-password-hide').addClass('input-password-show');
            eye_btn.find('.fa').removeClass('fa-eye-slash').addClass('fa-eye');
            input.attr('type', 'text');
          } else {
            eye_btn.removeClass('input-password-show').addClass('input-password-hide');
            eye_btn.find('.fa').removeClass('fa-eye').addClass('fa-eye-slash');
            input.attr('type', 'password');
          }
        });
      });
    });

    // tslint:disable-next-line: prefer-const
    let date = new Date();
    // tslint:disable-next-line: prefer-const
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    $('#datepicker').datepicker({
      uiLibrary: 'bootstrap4',
      modal: true,
      footer: true,
      format: 'yyyy-mm-dd',
      maxDate: today,
      showOtherMonths: false
    });



    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
      } else {
        $('#header').removeClass('header-scrolled');
      }
    });

    $(() => {
      $('.toggle-accordion').on('click', function () {
        var accordionId = $(this).attr('accordion-id'),
          // tslint:disable-next-line: prefer-const
          numPanelOpen = $(accordionId + ' .collapse.in').length;

        $(this).toggleClass('active');

        if (numPanelOpen == 0) {

        } else {

        }
      });



    }

    );



    // Stick the header at top on scroll
    $('#header').sticky({
      topSpacing: 0,
      zIndex: '50'
    });

    // Smooth scroll for the navigation menu and links with .scrollto classes
    $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {

          var scrollto = target.offset().top;
          var scrolled = 2;

          if ($('#header-sticky-wrapper').length) {
            scrollto -= $('#header-sticky-wrapper').outerHeight() - scrolled;
          }

          if ($(this).attr('href') == '#header') {
            scrollto = 0;
          }

          $('html, body').animate({
            scrollTop: scrollto
          }, 0, 'easeInOutExpo');

          if ($(this).parents('.nav-menu, .mobile-nav').length) {
            $('.nav-menu .active, .mobile-nav .active').removeClass('active');

            // $(this).removeClass('active');
            $(this).parent().addClass('active');
          }

          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
          return false;
        }
      }
    });

    $(document).on('click', '.mobile-nav-toggle', function (e) {
      e.preventDefault();
      $('#nav-bar > ul').css('display', 'block');
      $('#nav-bar').removeClass('.nav-menu float-right d-lg-block').addClass('mobile-nav d-lg-block');
      // $('.nav-menu').toggleClass('mobile-nav d-lg-none');
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
      $('#register').css('display', 'block');
      $('#login').css('display', 'block');
      $('#logout').css('display', 'block');


    });

    $(document).on('click', '.nav-menu .drop-down > ul .ul2 .one >  a', function (e) {
      e.preventDefault();
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').fadeOut();
      }
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      if ($('.nav-menu .drop-down > ul .ul2 .two').hasClass('active')) {
        $('.nav-menu .drop-down > ul .ul2 .two').removeClass('active');
      }
      // $(this).next().slideToggle(300);
      $(this).prev().addClass('active');
      $(this).parent().addClass('active');
      $(this).parent().parent().parent().addClass('active');
      $(this).parent().parent().parent().parent().parent().addClass('active');
    });
    $(document).on('click', '.nav-menu .drop-down > ul .ul2 .two >  a', function (e) {
      e.preventDefault();
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').fadeOut();
      }
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      // $(this).next().slideToggle(300);
      if ($('.nav-menu .drop-down > ul .ul2 .one').hasClass('active')) {
        $('.nav-menu .drop-down > ul .ul2 .one').removeClass('active');
      }
      if ($('.nav-menu .drop-down > ul .ul2 .two').hasClass('active')) {
        $('.nav-menu .drop-down > ul .ul2 .two').removeClass('active');
      }

      $(this).prev().addClass('active');
      $(this).parent().addClass('active');
      $(this).parent().parent().parent().addClass('active');
      $(this).parent().parent().parent().parent().parent().addClass('active');
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });


    $(document).click(function (e) {
      var container = $('.mobile-nav, .mobile-nav-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });

    // Intro carousel
    var heroCarousel = $('#heroCarousel');
    var heroCarouselIndicators = $('#hero-carousel-indicators');
    heroCarousel.find('.carousel-inner').children('.carousel-item').each(function (index) {
      (index === 0) ?
        heroCarouselIndicators.append('<li data-target=\'#heroCarousel\' data-slide-to=\'' + index + '\' class=\'active\'></li>') :
        heroCarouselIndicators.append('<li data-target=\'#heroCarousel\' data-slide-to=\'' + index + '\'></li>');
    });

    heroCarousel.on('slid.bs.carousel', function (e) {
      $(this).find('h2').addClass('animated fadeInDown');
      $(this).find('p').addClass('animated fadeInUp');
      $(this).find('.btn-get-started').addClass('animated fadeInUp');
    });

    // Back to top button
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });

    $('.back-to-top').click(function () {
      $('html, body').animate({
        scrollTop: 0
      }, 1500, 'easeInOutExpo');
      return false;
    });

    // Initiate the venobox plugin
    $(window).on('load', function () {
      $('.venobox').venobox({
        numeratio: true,
      });

    });

    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
      delay: 1,
      time: 50
    });

    // Porfolio isotope and filter
    $(window).on('load', function () {
      var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      $('#portfolio-flters li').on('click', function () {
        $('#portfolio-flters li').removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({
          filter: $(this).data('filter')
        });
      });

      // Initiate venobox (lightbox feature used in portofilo)
      $(document).ready(function () {
        $('.venobox').venobox();
      });
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // convenience getter for easy access to form fields
  get l() { return this.registerForm.controls; }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  register() {
    this.submittedregister = true;
    const date = new Date();
    // tslint:disable-next-line: prefer-const
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.registerForm.controls.student_date_of_birth.setValue(
      $('#datepicker').val()
    );
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loadingforregister = true;


    this.checkIfAlreadyEnrolled(this.registerForm.controls.student_email_id.value, this.registerForm.controls.student_mobile.value);

    // reset alerts on submit
    // this.alertService.clear();




    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.router.navigate([this.returnUrl]);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         });
  }

  login() {
    this.submittedlogin = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loadingforlogin = true;
    this.apiService.StudentAuthentication(this.loginForm.value).subscribe((data: any) => {
      if (data !== null) {
        this.loadingforlogin = false;
        sessionStorage.setItem('student_email_id', this.loginForm.controls.student_email_id.value);
        this.loginForm.reset();
        this.submittedlogin = false;
        $('#myModal').modal('hide');
        this.toastr.success('Logged In Successfully', 'Success');
        if (data.student_password_change_flag == 1) {
          if (data.student_standard == '9') {
            sessionStorage.setItem('student_standard', '9');
            this.router.navigate(['/courses/cbse/class-nine']);
          }
          else {
            sessionStorage.setItem('student_standard', '10');
            this.router.navigate(['/courses/cbse/class-ten']);
          }
        }
        else {
          this.router.navigate(['/change-password-once-after-login']);
          sessionStorage.setItem('onetimeview', this.makeAlphanumericId(32));
          sessionStorage.setItem('student_name', data.student_name);
        }

      }
      else {
        this.loadingforlogin = false;
        this.toastr.error('Invalid Email Address or Password', 'Error');
      }
    });
    //this.checkIfAlreadyRegistered(this.loginForm.controls.student_email_id.value , this.loginForm.controls.student_password.value);

  }


  // checkIfAlreadyRegistered(student_email_id , student_mobile) {
  // return this.apiService.checkIfAlreadyRegistered(student_email_id , student_mobile).subscribe(
  //   (response) =>
  //   {
  //     console.log(response);
  //     if (response == 'False')
  //     {
  //      this.toastr.warning('You Are Already Enrolled With Us.');
  //      return;

  //     }
  //     else {
  //       // const enrollmentformObj = this.registerForm.value;
  //       // this.insertEnrollmentDetails(enrollmentformObj);
  //       alert('success')
  //      }
  //     });
  //   }

  makeAlphanumericId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  // tslint:disable-next-line: variable-name
  checkIfAlreadyEnrolled(student_email_id, student_mobile) {
    return this.apiService.checkIfAlreadyEnrolled(student_email_id, student_mobile).subscribe(
      (response) => {
        console.log(response);
        if (response == 'False') {
          this.toastr.warning('You Are Already Enrolled With Us.');
          return;

        }
        else {
          const enrollmentformObj = this.registerForm.value;
          this.insertEnrollmentDetails(enrollmentformObj);
        }
      });
  }

  insertEnrollmentDetails(eObj: Enrollment) {
    this.apiService.insertEnrollmentDetails(eObj).subscribe(
      (res) => {

        this.toastr.success('Enrolled Successfully', 'Success');
        this.registerForm.reset({ student_gender: 'Male', student_standard: '9' });
        this.submittedregister = false;
      }, (error) => {
        console.log(error);
      }
    );

  }
  @HostListener('window:scroll')
  checkScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {

    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;

  }


  scrollTo(args: any) {
    $('#hero').css('display', 'block');
    $('#about').css('display', 'block');
    $('#mission').css('display', 'block');
    $('#main').css('display', 'block');
    $('#livelec').css('display', 'block');


    $('html, body').animate({
      scrollTop: $('#' + args).offset().top - 759
    }, 1500, 'easeInOutExpo');



    this.outside = false;
    this.internalRouteHeader = true;
    this.internalRouteHeader2 = true;
    this.internalRouteAboutUs = true;
    this.internalRouteAboutUs2 = true;
    this.internalRouteGallery = true;
    this.internalRouteFAQ = true;
    this.internalRouteRegister = true;
    this.externalViewGallery = true;
    this.externalViewForgotPassword = true;
    this.externalViewVerifyPassword = true;
    this.externalViewGenerateNewPassword = true;
    this.internalRouteContactUs = true;

    setTimeout(() => {
      this.changeActiveClassBasedOnParameter(args);
    }, 50);
    // return false;

  }


  changeActiveClassBasedOnParameter(args) {
    var href = '';
    href = '#' + args
    if ($('.nav-menu, .mobile-nav').length) {
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');

      // $(this).removeClass('active');
      // $(href).addClass('active');

      // if ($('.nav-menu > ul >  li > a[href="' + href + '"]').length) {
      $('#ul > li > a[href="' + href + '"]').parent().addClass('active');
      // }
    }

  }

  toggleFlag() {
    this.outside = true;
    this.internalRouteHeader = false;
    this.internalRouteHeader2 = false;
    this.internalRouteAboutUs = false;
    this.internalRouteAboutUs2 = false;
    this.internalRouteGallery = false;
    this.internalRouteFAQ = false;
    this.internalRouteRegister = false;
    this.externalViewGallery = false;
    this.externalViewForgotPassword = false;
    this.externalViewVerifyPassword = false;
    this.externalViewGenerateNewPassword = false;
    this.internalRouteContactUs = false;

    $('#hero').css('display', 'none');
    $('#about').css('display', 'none');
    $('#mission').css('display', 'none');
    $('#main').css('display', 'none');
    $('#livelec').css('display', 'none');
    // $('#hero').css('display' , 'block');
    // $('#hero').css('display' , 'block');
  }

  closeModal() {
    $('#myModal').modal('hide');
  }
  ToggleExpandAndCollapse() {
    $('.special-text').toggleClass('manageexpandcollapse expanded');

    if ($('.special-text').hasClass('expanded')) {
      $('.expand-button').html('Collapse Content');

    } else {
      $('.expand-button').html('Continue Reading');
    }
  }

  logout() {
    sessionStorage.clear();
    this.sessionExist = false;
    this.us.toggleSectionsVisibility();

  }
  removeFlotingNotification() {
    // document.getElementById('livelec').style.display = 'none';
    $(() => {
      $('#livelec').css('display', 'none');
    });

  }

  automaticallyDeleteLectureScheduledAfterOneDay() {
    this.apiService.deleteLectureScheduledAfterOneDay().subscribe(
      (response) => {

        this.getLectureScheduleDetails();

      }, (error) => {
        console.log(error);
      }
    );
  }

  getLectureScheduleDetails() {
    this.apiService.getNearbyLectureScheduleDetails().subscribe((data: any) => {
      if (data !== null) {
        this.NearByLectureScheduleArray = data;
        this.NearByLectureScheduleArray.forEach((item) => {
          item.online_lecture_date = item.online_lecture_date.split('T')[0];
        });

        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var now = new Date(this.NearByLectureScheduleArray[0].online_lecture_date);
        this.dateDetails = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();

        this.starttimeDetails = this.NearByLectureScheduleArray[0].online_lecture_start_time;
        this.endtimeDetails = this.NearByLectureScheduleArray[0].online_lecture_end_time;
        this.standard = this.NearByLectureScheduleArray[0].student_standard;
        this.topic = this.NearByLectureScheduleArray[0].online_lecture_topic;
        this.subject = this.NearByLectureScheduleArray[0].online_lecture_subject;
      }

    });
  }

  checkIfsessionExist() {
    if (this.us.sessionExist() && this.us.IfNineClassStudent() && this.NearByLectureScheduleArray[0].student_standard === '9') {
      let url = this.NearByLectureScheduleArray[0].online_lecture_url;
      window.open(url, '_blank');
    }
    else if (this.us.sessionExist() && this.us.IfTenClassStudent() && this.NearByLectureScheduleArray[0].student_standard === '10') {
      let url = this.NearByLectureScheduleArray[0].online_lecture_url;
      window.open(url, '_blank');
    }
    else {
      $('#myModal').modal('show');
    }
  }


}
