import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("test intersptors");
    if(request.url.startsWith(environment.apiUrl)){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmI3OTc1YTc1YTA1ZGNkNjlhOWVlNWE0MTAyNWUyMzNmZjA3ZDgyOTRiZDgzMzllNDZhMjU0NjQwOWJmZTAxMjMzZDFhYmNiNmM5YmNmMmUiLCJpYXQiOjE1OTEzMjQ2NjcsIm5iZiI6MTU5MTMyNDY2NywiZXhwIjoxNjIyODYwNjY3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.mqG8TIYtco3kEIQISH9lHS01VUeIkKe9yzHwN0YmQoq71_qnNZmWo-RjfKLRwzOcEiFeV25VPSNp-64xF7dsDO4Hep8Ww7Qz9tych-DwuNwLhwTlhJibwEGnLCkj-STMbs8C8BG44zTmcGb1DH5QFtB5eog1NWY0Gf_rm-LzN5dlb0y9gSLc_m8jMWhK_8ZT0Zyr_jNEYdYBQSdIlLTPX9VcI-LwfBL_-a5jsH2_UjUml_wixBE9UGQSDWCBZVJRzqsYzWA5Q5bJPXFifD5ai685zpfTpDuJd97cB3Gr4j9kgpQNIf_cwAcQYf3hoy2Xpf7OmBhVX6svigg3_Xodf4oQA5O5GUZC1Uwav7wf38uPMnTR4YXsQ6hXllLxsCXnJ-fAKg1nhimTJbt7fWtx4oj3oxT9HDIqHaDfB-5Fo4DpIEenBpY9QfzN2kvzWMfJUEeUdhLImik-ZkZ9DAuyzmkaFfOWRnXLdaBZ8ePpd6snlAMoFvR2DM6RBEWNRhIcrFhQz6tJ2wCaAHwXGgBdrenoRwEo2zjrh71tqFzmzBfShflz8Kmx4A7tYtMA8kg94MEx72mcX5LH4fLjWFYLOcxxoyrfFuOJxtuuXaLnq54AhnoVitlGmC4zefgjAWWn0wJ2j4Qg5IZVyfRtxVIfs_9iWHuiMn-2u-AarLas-yk`
          // Authorization: localStorage.getItem("ACCESS_TOKEN")
          
        }
      });
    }
    
    return next.handle(request);
  }
}
