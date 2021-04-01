import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassNineComponent } from './courses/cbse/class-nine/class-nine.component';
import { ClassTenComponent } from './courses/cbse/class-ten/class-ten.component';
import { ClassNineMathematicsComponent } from './courses/cbse/class-nine/class-nine-mathematics/class-nine-mathematics.component';
import { ClassNineScienceComponent } from './courses/cbse/class-nine/class-nine-science/class-nine-science.component';
import { ClassTenMathematicsComponent } from './courses/cbse/class-ten/class-ten-mathematics/class-ten-mathematics.component';
import { ClassTenScienceComponent } from './courses/cbse/class-ten/class-ten-science/class-ten-science.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailOtpComponent } from './verify-email-otp/verify-email-otp.component';
import { GenerateNewPasswordComponent } from './generate-new-password/generate-new-password.component';
import { ChangePasswordOnceAfterLoginComponent } from './change-password-once-after-login/change-password-once-after-login.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ClassTenStudyMaterialsComponent } from './courses/cbse/class-ten/class-ten-study-materials/class-ten-study-materials.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { OnlineLectureComponent } from './admin/online-lecture/online-lecture.component';
import { ClassNineStudyMaterialsComponent } from './courses/cbse/class-nine/class-nine-study-materials/class-nine-study-materials.component';
import { ClassTenMathematicsNcertBookComponent } from './courses/cbse/class-ten/class-ten-mathematics-ncert-book/class-ten-mathematics-ncert-book.component';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ClassTenScienceNcertBookComponent } from './courses/cbse/class-ten/class-ten-science-ncert-book/class-ten-science-ncert-book.component';
import { ClassNineMathematicsNcertBookComponent } from './courses/cbse/class-nine/class-nine-mathematics-ncert-book/class-nine-mathematics-ncert-book.component';
import { ClassNineScienceNcertBookComponent } from './courses/cbse/class-nine/class-nine-science-ncert-book/class-nine-science-ncert-book.component';



const routes: Routes = [
  {path: 'home', redirectTo: '/' , pathMatch: 'full' },
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'change-password-once-after-login', component: ChangePasswordOnceAfterLoginComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'forgot-password/verify-email-otp', component: VerifyEmailOtpComponent},
  { path: 'forgot-password/verify-email-otp/generate-new-password', component: GenerateNewPasswordComponent},
  { path: 'gallery', component: GalleryComponent},
  { path: 'courses/cbse/class-nine', component: ClassNineComponent},
  { path: 'courses/cbse/pdf-viewer/:id', component: PdfViewerComponent},
  { path: 'courses/cbse/class-nine/class-nine-mathematics', component: ClassNineMathematicsComponent},
  { path: 'courses/cbse/class-nine/class-nine-science', component: ClassNineScienceComponent},
  { path: 'courses/cbse/class-ten/class-ten-mathematics', component: ClassTenMathematicsComponent},
  { path: 'courses/cbse/class-ten/class-ten-science', component: ClassTenScienceComponent},
  { path: 'courses/cbse/class-nine/class-nine-study-materials', component: ClassNineStudyMaterialsComponent},
  { path: 'courses/cbse/class-nine/class-nine-study-materials/class-nine-mathematics-ncert-book',
  component: ClassNineMathematicsNcertBookComponent},
 { path: 'courses/cbse/class-nine/class-nine-study-materials/class-nine-science-ncert-book',
  component: ClassNineScienceNcertBookComponent},
  { path: 'courses/cbse/class-ten/class-ten-study-materials', component: ClassTenStudyMaterialsComponent},
  { path: 'courses/cbse/class-ten/class-ten-study-materials/class-ten-mathematics-ncert-book',
   component: ClassTenMathematicsNcertBookComponent},
  { path: 'courses/cbse/class-ten/class-ten-study-materials/class-ten-science-ncert-book',
   component: ClassTenScienceNcertBookComponent},
  {path: 'courses/cbse/class-ten', component: ClassTenComponent,
          children: [{path: 'Mathematics', component: ClassTenMathematicsComponent},
                     {path: 'Science', component: ClassTenScienceComponent},
                     {path: 'Study-Materials', component: ClassTenStudyMaterialsComponent},
        ]},


  { path: 'admin/admin-login', component: AdminLoginComponent},
  { path: 'admin/admin-dashboard', component: AdminDashboardComponent},
  { path: 'admin/admin-dashboard/online-lecture', component: OnlineLectureComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
