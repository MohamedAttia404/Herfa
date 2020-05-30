import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // private _courseApi="http://127.0.0.8000/api/courses";

  constructor(private http: HttpClient) { }

  // get all courses
  public getAll(){
    console.log("getAll");

    return this.http.get(`${ environment.apiUrl }/api/courses`);
    // return this.http.get(this._courseApi);
  }
}
