import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClassNineComponent } from './courses/cbse/class-nine/class-nine.component';
import { ClassTenComponent } from './courses/cbse/class-ten/class-ten.component';
import { ClassNineMathematicsComponent } from './courses/cbse/class-nine/class-nine-mathematics/class-nine-mathematics.component';
import { ClassNineScienceComponent } from './courses/cbse/class-nine/class-nine-science/class-nine-science.component';
import { ClassTenMathematicsComponent } from './courses/cbse/class-ten/class-ten-mathematics/class-ten-mathematics.component';
import { ClassTenScienceComponent } from './courses/cbse/class-ten/class-ten-science/class-ten-science.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
// import {PdfViewerModule} from 'ng2-pdf-viewer';

import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

import {HttpClientModule} from '@angular/common/http';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailOtpComponent } from './verify-email-otp/verify-email-otp.component';
import { GenerateNewPasswordComponent } from './generate-new-password/generate-new-password.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChangePasswordOnceAfterLoginComponent } from './change-password-once-after-login/change-password-once-after-login.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ClassTenStudyMaterialsComponent } from './courses/cbse/class-ten/class-ten-study-materials/class-ten-study-materials.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { OnlineLectureComponent } from './admin/online-lecture/online-lecture.component';
import {DataTablesModule} from 'angular-datatables';
import { ClassNineStudyMaterialsComponent } from './courses/cbse/class-nine/class-nine-study-materials/class-nine-study-materials.component';
import { ClassTenMathematicsNcertBookComponent } from './courses/cbse/class-ten/class-ten-mathematics-ncert-book/class-ten-mathematics-ncert-book.component';
import { ClassTenScienceNcertBookComponent } from './courses/cbse/class-ten/class-ten-science-ncert-book/class-ten-science-ncert-book.component';
import { ClassNineMathematicsNcertBookComponent } from './courses/cbse/class-nine/class-nine-mathematics-ncert-book/class-nine-mathematics-ncert-book.component';
import { ClassNineScienceNcertBookComponent } from './courses/cbse/class-nine/class-nine-science-ncert-book/class-nine-science-ncert-book.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClassNineComponent,
    ClassTenComponent,
    ClassNineMathematicsComponent,
    ClassNineScienceComponent,
    ClassTenMathematicsComponent,
    ClassTenScienceComponent,
    GalleryComponent,
    ContactUsComponent,
    ForgotPasswordComponent,
    VerifyEmailOtpComponent,
    GenerateNewPasswordComponent,
    ChangePasswordOnceAfterLoginComponent,
    PasswordStrengthComponent,
    PrivacyPolicyComponent,
    ClassTenStudyMaterialsComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    OnlineLectureComponent,
    ClassNineStudyMaterialsComponent,
    ClassTenMathematicsNcertBookComponent,
    ClassTenScienceNcertBookComponent,
    ClassNineMathematicsNcertBookComponent,
    ClassNineScienceNcertBookComponent,
    HeaderComponent,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule,
    PdfJsViewerModule,
    ToastrModule.forRoot(
      { maxOpened: 2,
        preventDuplicates: true,
        timeOut: 2000,
        closeButton: true,
        progressBar: true,
        autoDismiss: true,
        newestOnTop: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
