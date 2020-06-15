import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  prev: string="";
  next: string ="";
  constructor(private http: HttpClient) { }

  parseLinks(links){
    this.prev=links.prev;
    this.next=links.next;
  } 
  public getAll(){
    //return this.http.get(`${ environment.apiUrl }/api/products`);
    return this.http.get(`${ environment.apiUrl }/api/products`, {  params: new HttpParams({fromString: "_page=1&_limit=20"}), observe: "response"}).pipe(retry(3), tap((res: any) => {
      console.log(res.body.data);
      this.parseLinks(res.body.links);
    }));
    
  }

  public sendGetRequestToUrl(url: string){
    return this.http.get(url, { observe: "response"}).pipe(retry(3), tap((res:any) => {
      console.log(res);
      this.parseLinks(res.body.links);
  
    }));
  } 

  
  delete(id){
    return this.http.delete(`${ environment.apiUrl }/api/products/${id}`);
  }
  add(data){
    console.log(data);
    
    return this.http.post(`${ environment.apiUrl }/api/products`,data,{
      headers: {'Accept':'application/json', 'Authorization':localStorage.getItem("ACCESS_TOKEN"),}
      });
  }
  getProduct(id){
    return this.http.get(`${ environment.apiUrl }/api/products/${id}`);
  }
  update(data, id){
    return this.http.put(`${ environment.apiUrl }/api/products/${id}`,data);
  }
}
