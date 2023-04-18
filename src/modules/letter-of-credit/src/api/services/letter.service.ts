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

import { BaseResponseModel } from '../models/base-response-model';
import { LetterCommissionResponseModel } from '../models/letter-commission-response-model';
import { LetterContractFileModel } from '../models/letter-contract-file-model';
import { LetterEditModel } from '../models/letter-edit-model';
import { LetterEditResult } from '../models/letter-edit-result';
import { LetterListExtendedModel } from '../models/letter-list-extended-model';
import { LetterListItemModel } from '../models/letter-list-item-model';

@Injectable({
  providedIn: 'root',
})
export class LetterService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiLcEnableLcOffersClientIdPost
   */
  static readonly ApiLcEnableLcOffersClientIdPostPath = '/api/LC/enableLCOffers/{clientId}';

  /**
   * Метод выключает режим автоматического предложения покрытого аккредитива для конкретного контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcEnableLcOffersClientIdPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcEnableLcOffersClientIdPost$Plain$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * ИНН контрагента
     */
    contractor: string;
  }): Observable<StrictHttpResponse<BaseResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcEnableLcOffersClientIdPostPath, 'post');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('contractor', params.contractor, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResponseModel>;
      })
    );
  }

  /**
   * Метод выключает режим автоматического предложения покрытого аккредитива для конкретного контрагента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcEnableLcOffersClientIdPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcEnableLcOffersClientIdPost$Plain(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * ИНН контрагента
     */
    contractor: string;
  }): Observable<BaseResponseModel> {

    return this.apiLcEnableLcOffersClientIdPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<BaseResponseModel>) => r.body as BaseResponseModel)
    );
  }

  /**
   * Метод выключает режим автоматического предложения покрытого аккредитива для конкретного контрагента.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcEnableLcOffersClientIdPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcEnableLcOffersClientIdPost$Json$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * ИНН контрагента
     */
    contractor: string;
  }): Observable<StrictHttpResponse<BaseResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcEnableLcOffersClientIdPostPath, 'post');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('contractor', params.contractor, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResponseModel>;
      })
    );
  }

  /**
   * Метод выключает режим автоматического предложения покрытого аккредитива для конкретного контрагента.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcEnableLcOffersClientIdPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcEnableLcOffersClientIdPost$Json(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * ИНН контрагента
     */
    contractor: string;
  }): Observable<BaseResponseModel> {

    return this.apiLcEnableLcOffersClientIdPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<BaseResponseModel>) => r.body as BaseResponseModel)
    );
  }

  /**
   * Path part for operation apiLcIsLcOffersEnabledClientIdGet
   */
  static readonly ApiLcIsLcOffersEnabledClientIdGetPath = '/api/LC/isLCOffersEnabled/{clientId}';

  /**
   * Метод проверяет можно или нет показывать всплывающее окно для предложения на покрытый аккредитив конкретному контрагенту.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcIsLcOffersEnabledClientIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcIsLcOffersEnabledClientIdGet$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * ИНН контрагента
     */
    contractor: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcIsLcOffersEnabledClientIdGetPath, 'get');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('contractor', params.contractor, {});
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
   * Метод проверяет можно или нет показывать всплывающее окно для предложения на покрытый аккредитив конкретному контрагенту.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcIsLcOffersEnabledClientIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcIsLcOffersEnabledClientIdGet(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * ИНН контрагента
     */
    contractor: string;
  }): Observable<void> {

    return this.apiLcIsLcOffersEnabledClientIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiLcRegisterOfferClientIdPost
   */
  static readonly ApiLcRegisterOfferClientIdPostPath = '/api/LC/registerOffer/{clientId}';

  /**
   * Метод проверяет можно или нет показывать всплывающее окно для предложения на покрытый аккредитив конкретному контрагенту.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcRegisterOfferClientIdPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcRegisterOfferClientIdPost$Plain$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * ИНН контрагента
     */
    contractor: string;
  }): Observable<StrictHttpResponse<BaseResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcRegisterOfferClientIdPostPath, 'post');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('contractor', params.contractor, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResponseModel>;
      })
    );
  }

  /**
   * Метод проверяет можно или нет показывать всплывающее окно для предложения на покрытый аккредитив конкретному контрагенту.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcRegisterOfferClientIdPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcRegisterOfferClientIdPost$Plain(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * ИНН контрагента
     */
    contractor: string;
  }): Observable<BaseResponseModel> {

    return this.apiLcRegisterOfferClientIdPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<BaseResponseModel>) => r.body as BaseResponseModel)
    );
  }

  /**
   * Метод проверяет можно или нет показывать всплывающее окно для предложения на покрытый аккредитив конкретному контрагенту.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcRegisterOfferClientIdPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcRegisterOfferClientIdPost$Json$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * ИНН контрагента
     */
    contractor: string;
  }): Observable<StrictHttpResponse<BaseResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcRegisterOfferClientIdPostPath, 'post');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('contractor', params.contractor, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResponseModel>;
      })
    );
  }

  /**
   * Метод проверяет можно или нет показывать всплывающее окно для предложения на покрытый аккредитив конкретному контрагенту.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcRegisterOfferClientIdPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcRegisterOfferClientIdPost$Json(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * ИНН контрагента
     */
    contractor: string;
  }): Observable<BaseResponseModel> {

    return this.apiLcRegisterOfferClientIdPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<BaseResponseModel>) => r.body as BaseResponseModel)
    );
  }

  /**
   * Path part for operation apiLcDocumentsClientIdGet
   */
  static readonly ApiLcDocumentsClientIdGetPath = '/api/LC/documents/{clientId}';

  /**
   * Метод возвращает список поданных заявок на покрытый аккредитив, отобранных в соответствии с заданными параметрами.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdGet$Plain$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Начало периода выборки
     */
    startDate?: string;

    /**
     * Конец периода выборки
     */
    endDate?: string;

    /**
     * Статус, в соответствии со статусной моделью
     */
    state?: number;

    /**
     * Количество выводимых элементов списка
     */
    count?: number;

    /**
     * Начиная с какого индекса выводить
     */
    offset?: number;
  }): Observable<StrictHttpResponse<Array<LetterListItemModel>>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdGetPath, 'get');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('startDate', params.startDate, {});
      rb.query('endDate', params.endDate, {});
      rb.query('state', params.state, {});
      rb.query('count', params.count, {});
      rb.query('offset', params.offset, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LetterListItemModel>>;
      })
    );
  }

  /**
   * Метод возвращает список поданных заявок на покрытый аккредитив, отобранных в соответствии с заданными параметрами.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdGet$Plain(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Начало периода выборки
     */
    startDate?: string;

    /**
     * Конец периода выборки
     */
    endDate?: string;

    /**
     * Статус, в соответствии со статусной моделью
     */
    state?: number;

    /**
     * Количество выводимых элементов списка
     */
    count?: number;

    /**
     * Начиная с какого индекса выводить
     */
    offset?: number;
  }): Observable<Array<LetterListItemModel>> {

    return this.apiLcDocumentsClientIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LetterListItemModel>>) => r.body as Array<LetterListItemModel>)
    );
  }

  /**
   * Метод возвращает список поданных заявок на покрытый аккредитив, отобранных в соответствии с заданными параметрами.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdGet$Json$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Начало периода выборки
     */
    startDate?: string;

    /**
     * Конец периода выборки
     */
    endDate?: string;

    /**
     * Статус, в соответствии со статусной моделью
     */
    state?: number;

    /**
     * Количество выводимых элементов списка
     */
    count?: number;

    /**
     * Начиная с какого индекса выводить
     */
    offset?: number;
  }): Observable<StrictHttpResponse<Array<LetterListItemModel>>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdGetPath, 'get');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('startDate', params.startDate, {});
      rb.query('endDate', params.endDate, {});
      rb.query('state', params.state, {});
      rb.query('count', params.count, {});
      rb.query('offset', params.offset, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LetterListItemModel>>;
      })
    );
  }

  /**
   * Метод возвращает список поданных заявок на покрытый аккредитив, отобранных в соответствии с заданными параметрами.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdGet$Json(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Начало периода выборки
     */
    startDate?: string;

    /**
     * Конец периода выборки
     */
    endDate?: string;

    /**
     * Статус, в соответствии со статусной моделью
     */
    state?: number;

    /**
     * Количество выводимых элементов списка
     */
    count?: number;

    /**
     * Начиная с какого индекса выводить
     */
    offset?: number;
  }): Observable<Array<LetterListItemModel>> {

    return this.apiLcDocumentsClientIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LetterListItemModel>>) => r.body as Array<LetterListItemModel>)
    );
  }

  /**
   * Path part for operation apiLcDocumentsClientIdCreatePost
   */
  static readonly ApiLcDocumentsClientIdCreatePostPath = '/api/LC/documents/{clientId}/Create';

  /**
   * Метод создает заявку на покрытый аккредитив.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdCreatePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiLcDocumentsClientIdCreatePost$Plain$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Форма заявки в виде JSON
     */
    body?: LetterEditModel
  }): Observable<StrictHttpResponse<LetterEditResult>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdCreatePostPath, 'post');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LetterEditResult>;
      })
    );
  }

  /**
   * Метод создает заявку на покрытый аккредитив.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdCreatePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiLcDocumentsClientIdCreatePost$Plain(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Форма заявки в виде JSON
     */
    body?: LetterEditModel
  }): Observable<LetterEditResult> {

    return this.apiLcDocumentsClientIdCreatePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<LetterEditResult>) => r.body as LetterEditResult)
    );
  }

  /**
   * Метод создает заявку на покрытый аккредитив.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdCreatePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiLcDocumentsClientIdCreatePost$Json$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Форма заявки в виде JSON
     */
    body?: LetterEditModel
  }): Observable<StrictHttpResponse<LetterEditResult>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdCreatePostPath, 'post');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LetterEditResult>;
      })
    );
  }

  /**
   * Метод создает заявку на покрытый аккредитив.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdCreatePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiLcDocumentsClientIdCreatePost$Json(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Форма заявки в виде JSON
     */
    body?: LetterEditModel
  }): Observable<LetterEditResult> {

    return this.apiLcDocumentsClientIdCreatePost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<LetterEditResult>) => r.body as LetterEditResult)
    );
  }

  /**
   * Path part for operation apiLcDocumentsClientIdUpdatePost
   */
  static readonly ApiLcDocumentsClientIdUpdatePostPath = '/api/LC/documents/{clientId}/Update';

  /**
   * Метод обновляет заявку на покрытый аккредитив.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdUpdatePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiLcDocumentsClientIdUpdatePost$Plain$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;

    /**
     * Форма заявки в виде JSON
     */
    body?: LetterEditModel
  }): Observable<StrictHttpResponse<LetterEditResult>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdUpdatePostPath, 'post');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('letterId', params.letterId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LetterEditResult>;
      })
    );
  }

  /**
   * Метод обновляет заявку на покрытый аккредитив.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdUpdatePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiLcDocumentsClientIdUpdatePost$Plain(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;

    /**
     * Форма заявки в виде JSON
     */
    body?: LetterEditModel
  }): Observable<LetterEditResult> {

    return this.apiLcDocumentsClientIdUpdatePost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<LetterEditResult>) => r.body as LetterEditResult)
    );
  }

  /**
   * Метод обновляет заявку на покрытый аккредитив.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdUpdatePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiLcDocumentsClientIdUpdatePost$Json$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;

    /**
     * Форма заявки в виде JSON
     */
    body?: LetterEditModel
  }): Observable<StrictHttpResponse<LetterEditResult>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdUpdatePostPath, 'post');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('letterId', params.letterId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LetterEditResult>;
      })
    );
  }

  /**
   * Метод обновляет заявку на покрытый аккредитив.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdUpdatePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiLcDocumentsClientIdUpdatePost$Json(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;

    /**
     * Форма заявки в виде JSON
     */
    body?: LetterEditModel
  }): Observable<LetterEditResult> {

    return this.apiLcDocumentsClientIdUpdatePost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<LetterEditResult>) => r.body as LetterEditResult)
    );
  }

  /**
   * Path part for operation apiLcDocumentsClientIdGetInfoGet
   */
  static readonly ApiLcDocumentsClientIdGetInfoGetPath = '/api/LC/documents/{clientId}/getInfo';

  /**
   * Метод возвращает полные данные заявления.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdGetInfoGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdGetInfoGet$Plain$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;
  }): Observable<StrictHttpResponse<LetterListExtendedModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdGetInfoGetPath, 'get');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('letterId', params.letterId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LetterListExtendedModel>;
      })
    );
  }

  /**
   * Метод возвращает полные данные заявления.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdGetInfoGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdGetInfoGet$Plain(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;
  }): Observable<LetterListExtendedModel> {

    return this.apiLcDocumentsClientIdGetInfoGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<LetterListExtendedModel>) => r.body as LetterListExtendedModel)
    );
  }

  /**
   * Метод возвращает полные данные заявления.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdGetInfoGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdGetInfoGet$Json$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;
  }): Observable<StrictHttpResponse<LetterListExtendedModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdGetInfoGetPath, 'get');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('letterId', params.letterId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LetterListExtendedModel>;
      })
    );
  }

  /**
   * Метод возвращает полные данные заявления.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdGetInfoGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdGetInfoGet$Json(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;
  }): Observable<LetterListExtendedModel> {

    return this.apiLcDocumentsClientIdGetInfoGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<LetterListExtendedModel>) => r.body as LetterListExtendedModel)
    );
  }

  /**
   * Path part for operation apiLcDocumentsClientIdGetContractFromLetterGet
   */
  static readonly ApiLcDocumentsClientIdGetContractFromLetterGetPath = '/api/LC/documents/{clientId}/getContractFromLetter';

  /**
   * Получение содержимого файла в бинарном виде.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdGetContractFromLetterGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdGetContractFromLetterGet$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;

    /**
     * Идентификатор файла
     */
    contractFileId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdGetContractFromLetterGetPath, 'get');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('letterId', params.letterId, {});
      rb.query('contractFileId', params.contractFileId, {});
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
   * Получение содержимого файла в бинарном виде.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdGetContractFromLetterGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdGetContractFromLetterGet(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;

    /**
     * Идентификатор файла
     */
    contractFileId: string;
  }): Observable<void> {

    return this.apiLcDocumentsClientIdGetContractFromLetterGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiLcDocumentsClientIdAppendContractToLetterPost
   */
  static readonly ApiLcDocumentsClientIdAppendContractToLetterPostPath = '/api/LC/documents/{clientId}/appendContractToLetter';

  /**
   * Метод позволяет добавить файл договора к заявке.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdAppendContractToLetterPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiLcDocumentsClientIdAppendContractToLetterPost$Plain$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;
    body?: LetterContractFileModel
  }): Observable<StrictHttpResponse<BaseResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdAppendContractToLetterPostPath, 'post');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('letterId', params.letterId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResponseModel>;
      })
    );
  }

  /**
   * Метод позволяет добавить файл договора к заявке.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdAppendContractToLetterPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiLcDocumentsClientIdAppendContractToLetterPost$Plain(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;
    body?: LetterContractFileModel
  }): Observable<BaseResponseModel> {

    return this.apiLcDocumentsClientIdAppendContractToLetterPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<BaseResponseModel>) => r.body as BaseResponseModel)
    );
  }

  /**
   * Метод позволяет добавить файл договора к заявке.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdAppendContractToLetterPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiLcDocumentsClientIdAppendContractToLetterPost$Json$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;
    body?: LetterContractFileModel
  }): Observable<StrictHttpResponse<BaseResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdAppendContractToLetterPostPath, 'post');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('letterId', params.letterId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResponseModel>;
      })
    );
  }

  /**
   * Метод позволяет добавить файл договора к заявке.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdAppendContractToLetterPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiLcDocumentsClientIdAppendContractToLetterPost$Json(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;
    body?: LetterContractFileModel
  }): Observable<BaseResponseModel> {

    return this.apiLcDocumentsClientIdAppendContractToLetterPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<BaseResponseModel>) => r.body as BaseResponseModel)
    );
  }

  /**
   * Path part for operation apiLcDocumentsClientIdRemoveContractFromLetterPost
   */
  static readonly ApiLcDocumentsClientIdRemoveContractFromLetterPostPath = '/api/LC/documents/{clientId}/removeContractFromLetter';

  /**
   * Метод удаляет загруженный в заявку файл.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdRemoveContractFromLetterPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdRemoveContractFromLetterPost$Plain$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;

    /**
     * Идентификатор файла
     */
    contractFileId?: string;
  }): Observable<StrictHttpResponse<BaseResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdRemoveContractFromLetterPostPath, 'post');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('letterId', params.letterId, {});
      rb.query('contractFileId', params.contractFileId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResponseModel>;
      })
    );
  }

  /**
   * Метод удаляет загруженный в заявку файл.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdRemoveContractFromLetterPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdRemoveContractFromLetterPost$Plain(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;

    /**
     * Идентификатор файла
     */
    contractFileId?: string;
  }): Observable<BaseResponseModel> {

    return this.apiLcDocumentsClientIdRemoveContractFromLetterPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<BaseResponseModel>) => r.body as BaseResponseModel)
    );
  }

  /**
   * Метод удаляет загруженный в заявку файл.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdRemoveContractFromLetterPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdRemoveContractFromLetterPost$Json$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;

    /**
     * Идентификатор файла
     */
    contractFileId?: string;
  }): Observable<StrictHttpResponse<BaseResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdRemoveContractFromLetterPostPath, 'post');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('letterId', params.letterId, {});
      rb.query('contractFileId', params.contractFileId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResponseModel>;
      })
    );
  }

  /**
   * Метод удаляет загруженный в заявку файл.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdRemoveContractFromLetterPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdRemoveContractFromLetterPost$Json(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;

    /**
     * Идентификатор файла
     */
    contractFileId?: string;
  }): Observable<BaseResponseModel> {

    return this.apiLcDocumentsClientIdRemoveContractFromLetterPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<BaseResponseModel>) => r.body as BaseResponseModel)
    );
  }

  /**
   * Path part for operation apiLcCalculateCommissionGet
   */
  static readonly ApiLcCalculateCommissionGetPath = '/api/LC/calculateCommission';

  /**
   * Метод рассчитывает размер комиссии на выпуск покрытого аккредитива для указанной суммы.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcCalculateCommissionGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcCalculateCommissionGet$Plain$Response(params?: {

    /**
     * Сумма на которую необходимо рассчитать размер комиссии
     */
    total?: number;
  }): Observable<StrictHttpResponse<LetterCommissionResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcCalculateCommissionGetPath, 'get');
    if (params) {
      rb.query('total', params.total, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LetterCommissionResponseModel>;
      })
    );
  }

  /**
   * Метод рассчитывает размер комиссии на выпуск покрытого аккредитива для указанной суммы.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcCalculateCommissionGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcCalculateCommissionGet$Plain(params?: {

    /**
     * Сумма на которую необходимо рассчитать размер комиссии
     */
    total?: number;
  }): Observable<LetterCommissionResponseModel> {

    return this.apiLcCalculateCommissionGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<LetterCommissionResponseModel>) => r.body as LetterCommissionResponseModel)
    );
  }

  /**
   * Метод рассчитывает размер комиссии на выпуск покрытого аккредитива для указанной суммы.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcCalculateCommissionGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcCalculateCommissionGet$Json$Response(params?: {

    /**
     * Сумма на которую необходимо рассчитать размер комиссии
     */
    total?: number;
  }): Observable<StrictHttpResponse<LetterCommissionResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcCalculateCommissionGetPath, 'get');
    if (params) {
      rb.query('total', params.total, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LetterCommissionResponseModel>;
      })
    );
  }

  /**
   * Метод рассчитывает размер комиссии на выпуск покрытого аккредитива для указанной суммы.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcCalculateCommissionGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcCalculateCommissionGet$Json(params?: {

    /**
     * Сумма на которую необходимо рассчитать размер комиссии
     */
    total?: number;
  }): Observable<LetterCommissionResponseModel> {

    return this.apiLcCalculateCommissionGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<LetterCommissionResponseModel>) => r.body as LetterCommissionResponseModel)
    );
  }

  /**
   * Path part for operation apiLcDocumentsClientIdStateGet
   */
  static readonly ApiLcDocumentsClientIdStateGetPath = '/api/LC/documents/{clientId}/State';

  /**
   * Метод возвращает статус рассмотрения заявки на аккредитив.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdStateGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdStateGet$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdStateGetPath, 'get');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('letterId', params.letterId, {});
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
   * Метод возвращает статус рассмотрения заявки на аккредитив.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdStateGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdStateGet(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;
  }): Observable<void> {

    return this.apiLcDocumentsClientIdStateGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiLcSendDeteiledInformationPost
   */
  static readonly ApiLcSendDeteiledInformationPostPath = '/api/LC/sendDeteiledInformation';

  /**
   * Метод отправляет электронное письмо с подробным описанием услуги на указанный адрес электронной почты.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcSendDeteiledInformationPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcSendDeteiledInformationPost$Plain$Response(params: {

    /**
     * Адрес почты на который необходимо отправить письмо
     */
    email: string;
  }): Observable<StrictHttpResponse<BaseResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcSendDeteiledInformationPostPath, 'post');
    if (params) {
      rb.query('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResponseModel>;
      })
    );
  }

  /**
   * Метод отправляет электронное письмо с подробным описанием услуги на указанный адрес электронной почты.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcSendDeteiledInformationPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcSendDeteiledInformationPost$Plain(params: {

    /**
     * Адрес почты на который необходимо отправить письмо
     */
    email: string;
  }): Observable<BaseResponseModel> {

    return this.apiLcSendDeteiledInformationPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<BaseResponseModel>) => r.body as BaseResponseModel)
    );
  }

  /**
   * Метод отправляет электронное письмо с подробным описанием услуги на указанный адрес электронной почты.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcSendDeteiledInformationPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcSendDeteiledInformationPost$Json$Response(params: {

    /**
     * Адрес почты на который необходимо отправить письмо
     */
    email: string;
  }): Observable<StrictHttpResponse<BaseResponseModel>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcSendDeteiledInformationPostPath, 'post');
    if (params) {
      rb.query('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResponseModel>;
      })
    );
  }

  /**
   * Метод отправляет электронное письмо с подробным описанием услуги на указанный адрес электронной почты.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcSendDeteiledInformationPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcSendDeteiledInformationPost$Json(params: {

    /**
     * Адрес почты на который необходимо отправить письмо
     */
    email: string;
  }): Observable<BaseResponseModel> {

    return this.apiLcSendDeteiledInformationPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<BaseResponseModel>) => r.body as BaseResponseModel)
    );
  }

  /**
   * Path part for operation apiLcDocumentsClientIdGetTemplateGet
   */
  static readonly ApiLcDocumentsClientIdGetTemplateGetPath = '/api/LC/documents/{clientId}/getTemplate';

  /**
   * Метод отправляет в ДБО запрос на генерацию файла заявления.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiLcDocumentsClientIdGetTemplateGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdGetTemplateGet$Response(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, LetterService.ApiLcDocumentsClientIdGetTemplateGetPath, 'get');
    if (params) {
      rb.path('clientId', params.clientId, {});
      rb.query('branchId', params.branchId, {});
      rb.query('letterId', params.letterId, {});
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
   * Метод отправляет в ДБО запрос на генерацию файла заявления.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiLcDocumentsClientIdGetTemplateGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiLcDocumentsClientIdGetTemplateGet(params: {

    /**
     * Идентификатор клиента
     */
    clientId: string;

    /**
     * Идентификатор филиала
     */
    branchId: string;

    /**
     * Идентификатор заявки
     */
    letterId: string;
  }): Observable<void> {

    return this.apiLcDocumentsClientIdGetTemplateGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
