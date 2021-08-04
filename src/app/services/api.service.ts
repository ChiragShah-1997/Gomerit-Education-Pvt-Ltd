import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Enrollment } from '../models/Enrollment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RegistrationAndLogin } from '../models/RegistrationAndLogin';
import { AdminLogin } from '../models/AdminLogin';
import { OnlineLectureDetails } from '../models/OnlineLectureDetails';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  Url: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');

  constructor(private http: HttpClient) {
    this.Url = 'https://localhost:44305/api';
    //this.Url = 'https://api.gomerit.in/api';
  }


  PasswordChangeAndPasswordChangeFlagToTrue(obj: RegistrationAndLogin) {

    return this.http.put<RegistrationAndLogin[]>(this.Url +
      '/RegistrationAndLogin/changePasswordAndtogglePasswordChangeFlag', obj, { headers: this.headers });
  }

  sendWelcomeGreeting(studentname: any, emailid: any, password: any) {
    let obj = {
      'student_name': studentname,
      'student_email_id': emailid,
      'student_password': password
    };
    return this.http.post<any>(this.Url + '/Email/sendWelcomeGreeting', JSON.stringify(obj), { headers: this.headers });
  }


  updatePassword(emailid: any, password: any) {
    const httpBody = new HttpParams()
      .set('student_email_id', emailid)
      .set('password', password);
    return this.http.put(this.Url + '/RegistrationAndLogin/updatePassword?' + httpBody, { headers: this.headers });
  }

  StudentAuthentication(login: RegistrationAndLogin) {

    return this.http.post<RegistrationAndLogin[]>(this.Url + '/RegistrationAndLogin/login', login, { headers: this.headers });
  }


  AdminAuthentication(login: AdminLogin) {

    return this.http.post<AdminLogin[]>(this.Url + '/Admin/login', login, { headers: this.headers });
  }

  checkIfAlreadyRegistered(emailid: any, phone: any) {

    const httpBody = new HttpParams()
      .set('email_id', emailid)
      .set('phone', phone);
    return this.http.post(this.Url + '/RegistrationAndLogin/checkIfAlreadyRegistered?' + httpBody, { headers: this.headers });
  }


  checkIfAlreadyEnrolled(emailid: any, phone: any) {
    const httpBody = new HttpParams()
      .set('email_id', emailid)
      .set('phone', phone);
    return this.http.post(this.Url + '/Enrollment/checkIfAlreadyEnrolled?' + httpBody, { headers: this.headers });
  }

  insertEnrollmentDetails(data): Observable<any> {
    return this.http.post(this.Url + '/Enrollment/post/', data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  insertContactUsDetails(data): Observable<any> {
    return this.http.post(this.Url + '/Contact/post/', data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  insertOnlineLectureDetails(data): Observable<any> {
    return this.http.post(this.Url + '/Admin/postLectureDetails/', data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  updateOnlineLectureDetails(id: any, onlinelecturedetails: OnlineLectureDetails): Observable<OnlineLectureDetails> {
    return this.http.put<OnlineLectureDetails>(this.Url + '/Admin/putLectureDetails/' + id, onlinelecturedetails, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  getAllScheduledLecturesDetails(): Observable<any> {
    return this.http.get(this.Url + '/Admin/getAllScheduledLecturesDetails', { headers: this.headers });
  }

  getAllStudentsCount(): Observable<any> {
    return this.http.get(this.Url + '/RegistrationAndLogin/getStudentsTotalCount', { headers: this.headers });
  }

  getAllLecturesScheduleCount(): Observable<any> {
    return this.http.get(this.Url + '/Admin/getAllLecturesScheduleCount', { headers: this.headers });
  }

  getNearbyLectureScheduleDetails(): Observable<any> {
    return this.http.get(this.Url + '/Admin/getNearByScheduledLectureDetails', { headers: this.headers });
  }

  getSpecificScheduledLectureDetails(id: any): Observable<any> {
    const httpBody = new HttpParams()
      .set('lec_id', id);
    return this.http.get(this.Url + '/Admin/getSpecificScheduledLectureDetails?' + httpBody, { headers: this.headers });
  }

  deleteSpecificScheduledLectureDetails(id: any): Observable<any> {
    const httpBody = new HttpParams()
      .set('lec_id', id);
    return this.http.delete(this.Url + '/Admin/deleteSpecificScheduledLectureDetails?' + httpBody, { headers: this.headers });
  }

  deleteLectureScheduledAfterOneDay(): Observable<any> {
    return this.http.delete(this.Url + '/Admin/automaticallyDeleteLectureScheduledAfterOneDay', { headers: this.headers });
  }

  checkIfStudentExistInDatabase(emailid: any) {
    const httpBody = new HttpParams()
      .set('email_id', emailid);
    return this.http.post(this.Url + '/RegistrationAndLogin/checkIfStudentExistInDatabase?' + httpBody, { headers: this.headers });
  }

  sendOTPForPasswordVerification(studentEmailId: any, otp: any) {
    const httpBody = new HttpParams()
      .set('student_email_id', studentEmailId)
      .set('otp', otp);
    return this.http.post(this.Url + '/Email/sendOTP?' + httpBody, { headers: this.headers });
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }



}
