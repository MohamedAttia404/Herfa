import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({providedIn:'root'})

export class UserService {

  private apiUrl=" http://127.0.0.1:8000/api";
  
  private userSubject= new BehaviorSubject(false);
  
  private headers = new HttpHeaders({
    'Content-Type':'application/json',
    // 'Accept':'application/json',
    // 'Authorization':this.token,
    'Authorization':localStorage.getItem("ACCESS_TOKEN"),
    
  });


  
  addUser(user){
    console.log(user); 
      return this.http.post(`${this.apiUrl}/register`,user,{
        headers: {'Accept':'application/json'}
        }
        );
    }
  constructor(private http:HttpClient) { }

  

    getUsers(){
      
      return this.http.get(`${this.apiUrl}/users`,  {
        headers: this.headers,
        
        });
    }


    getUsersById(id){
      return this.http.get(`${this.apiUrl}/users/${id}`,  {
        headers: this.headers,
        });
    }
    
 

  setToken(res) {
          localStorage.setItem("ACCESS_TOKEN",'Bearer '+res.token);
          localStorage.setItem("USER_ID", res.id);
  }
    signOut() {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("USER_ID");

    }

  //   isAuthenticated() {
  //     return  this.authSubject.asObservable();
  // }
  singIn(user){
    return this.http.post(`${this.apiUrl}/login`,user);
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
