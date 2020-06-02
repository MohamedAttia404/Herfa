import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
// import { HttpClient,HttpHeaders,HttpXsrfTokenExtractor } from '@angular/common/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({providedIn:'root'})

export class UserService {

  private apiUrl=" http://127.0.0.1:8000/api";
  
  private userSubject= new BehaviorSubject(false);
  
  private headers = new HttpHeaders({
    // 'Content-Type':'multipart/form-data',
    'Content-Type':'application/json',
    // 'Authorization':this.token,
    'Authorization':localStorage.getItem("ACCESS_TOKEN"),
    
  });
  // constructor( private tokenService: HttpXsrfTokenExtractor,
  constructor(private http:HttpClient) { }
    
    // token = this.tokenService.getToken();
    
    // changeData(data){
    //   this.userSubject.next(data);
    // }

    // get userSubjectObservable(){
    //   return this.userSubject.asObservable();
    // }
  
  

    getUsers(){
      console.log("user")
      return this.http.get(`${this.apiUrl}/users`,  {
        headers: this.headers,
        
        });
    }


    getUsersById(id){
      return this.http.get(`${this.apiUrl}/users/${id}`,  {
        headers: this.headers,
        });
    }
    
    // register(user): Observable<JwtResponse> {
    //   // return this.http.post<JwtResponse>(`${this.AUTH_SERVER}/register`, user).pipe(
    //   return this.http.post<JwtResponse>(this.apiUrl, user).pipe(
    //     tap((res:  JwtResponse ) => {
  
    //       if (res.user) {
    //         localStorage.set("ACCESS_TOKEN", res.user.access_token);
    //         localStorage.set("EXPIRES_IN", res.user.expires_in);
    //         this.userSubject.next(true);
    //       }
    //     })
  
    //   );
    // }
  //   singIn(user: User): Observable<JwtResponse> {
  //   // singIn(user): Observable<JwtResponse> {
  //     return this.http.post(`${this.AUTH_SERVER}/login`, user).pipe(
  //       tap(async (res: JwtResponse) => {
  
  //         if (res.user) {
  //           localStorage.setItem("ACCESS_TOKEN", res.user.access_token);
  //           localStorage.setItem("EXPIRES_IN", res.user.expires_in);
  //           this.authSubject.next(true);
  //         }
  //       })
  //     );
  //   }

  setToken(res) {
          localStorage.setItem("ACCESS_TOKEN",'Bearer '+res.token);
          localStorage.setItem("USER_ID", res.id);
  }
    signOut() {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("USER_ID");
      // localStorage.removeItem("EXPIRES_IN");
      // this.authSubject.next(false);
    }

  //   isAuthenticated() {
  //     return  this.authSubject.asObservable();
  // }
  singIn(user){
    return this.http.post(`${this.apiUrl}/login`,user);
  }

    addUser(user){

      // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Accept', 'application/json');
      // headers.append('Content-Type', 'application/json');
      // // headers.append('withCredentials', 'true' );
      // headers.append('X-XSRF-TOKEN',this.token);
      // headers.append('Authorization',this.token);
    
      // req = req.clone({headers: req.headers.set(this.headerName, token)});
      return this.http.post(`${this.apiUrl}/register`,user);
      // return this.http.post(this.apiUrl,user,{ headers: new HttpHeaders().set(['Content-Type':'application/json','X-XSRF-TOKEN':this.token]) });
      // return this.http.post(this.apiUrl,user,{ headers: new HttpHeaders().set('X-XSRF-TOKEN',this.token) });
    }

    updateUser(user){

      return this.http.put(`${this.apiUrl}/users/${user.id}`,user, {
        headers: this.headers,
        });
    }
    
    deleteUser(id){
      return this.http.delete(`${this.apiUrl}/users/${id}`, {
        headers: this.headers,
        });
    }

}
