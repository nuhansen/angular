import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfiguration } from 'src/app/services/api-configuration';
import { BaseService } from 'src/app/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseService {
  // private apiUrl = 'http://localhost:8088/blog';


  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  // saveBlog$Response(params: saveBlog$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  //   return saveBook(this.http, this.rootUrl, params, context);
  // }

  saveBlog(blog: any):Observable<any>{
    return this.http.post<any>(this.rootUrl, blog);
  }
}
