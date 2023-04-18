/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthorizationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation authGenerateTokenGet
   */
  static readonly AuthGenerateTokenGetPath = '/auth/generateToken';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authGenerateTokenGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  authGenerateTokenGet$Response(params: {
    userId: string;
    branchId: string;
    clientId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthorizationService.AuthGenerateTokenGetPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('clientId', params.clientId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authGenerateTokenGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authGenerateTokenGet(params: {
    userId: string;
    branchId: string;
    clientId: string;
  }): Observable<void> {

    return this.authGenerateTokenGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
