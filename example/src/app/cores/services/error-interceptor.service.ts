/**
 * 统一错误拦截器
 * @author cool1024
 * @date   2018-06-21
 */
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, TimeoutError } from 'rxjs';
import { timeout, catchError, map } from 'rxjs/operators';
import { ToastService } from 'ng-tools-ui';
import { HttpConfig, INTERCEPTOR_MESSAGES } from '../../configs/http.config';
import { ApiData, ApiResponse } from '../classes/api-data.class';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private toast: ToastService,
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // 获取请求参数
        const httpParams = request.params;

        // 获取请求超时时间
        const maxRequestTime = HttpConfig.TIME_OUT;

        // 允许重设请求超时，如果请求参数中出现了关键参数REQUEST_TIME_OUT
        // if (httpParams.has('REQUEST_TIME_OUT')) {
        //     maxRequestTime = parseInt(httpParams.get('REQUEST_TIME_OUT'), 10);
        //     httpParams = httpParams.delete('REQUEST_TIME_OUT');
        // }

        // 更新请求参数
        request = request.clone({ params: httpParams });

        let handle = next.handle(request);

        // 后置错误拦截
        handle = handle.pipe(
            // 超时处理
            timeout(maxRequestTime),
            // 异常捕获
            catchError(error => {

                let errorMessage = '';

                let errorTitle = '';

                // 识别服务器响应错误
                if (error instanceof HttpErrorResponse) {
                    const code = error.status;
                    errorTitle = `${code} : ${error.statusText}`;

                    // 需要跳转的状态码
                    if (code === 401) {
                        this.router.navigateByUrl(HttpConfig.TOKEN_ERROR_URL);
                    } else if (code === 403) {
                        this.router.navigateByUrl(HttpConfig.AUTH_ERROR_URL);
                    }

                    // 获取状态码对应提示消息
                    if (code === 422) {
                        const apiData = new ApiData(error.error.error, error.error.message, error.error.datas);
                        errorMessage = apiData.messageStr;
                    } else {
                        errorMessage = INTERCEPTOR_MESSAGES[code] || HttpConfig.HTTP_ERRORS.RESPONSE_CONTENT_ERROR;
                    }

                    // 显示提示消息
                    if (~HttpConfig.INFO_CODES.indexOf(code)) {
                        this.toast.info(errorTitle, errorMessage, HttpConfig.TOAST_ERROR_TIME);
                    } else if (~HttpConfig.WARNING_CODES.indexOf(code)) {
                        this.toast.warning(errorTitle, errorMessage, HttpConfig.TOAST_ERROR_TIME);
                    } else {
                        this.toast.danger(errorTitle, errorMessage, HttpConfig.TOAST_ERROR_TIME);
                    }

                } else if (error instanceof TimeoutError) {
                    errorMessage = HttpConfig.HTTP_ERRORS.TIMEOUT_ERROR;
                    errorTitle = '通信异常';
                    this.toast.danger(errorTitle, errorMessage, HttpConfig.TOAST_ERROR_TIME);
                } else {
                    errorMessage = HttpConfig.HTTP_ERRORS.OTHER_ERROR;
                    errorTitle = '请求发送失败';
                    this.toast.danger(errorTitle, errorMessage, HttpConfig.TOAST_ERROR_TIME);
                }
                return of<HttpResponse<string>>(new HttpResponse<string>({
                    status: 200,
                    body: (new ApiData(false, errorMessage).toJsonString())
                }));

            }),
            map(res => {

                if (res instanceof HttpResponse) {
                    if (res.body !== null && ApiResponse.isApiResponse(res.body)) {
                        const apiData = new ApiData(res.body.result, res.body.message, res.body.datas);
                        if (apiData.result === false) {
                            if (apiData.messageStr !== HttpConfig.HTTP_ERRORS.CHECK_ERROR) {
                                this.toast.warning('操作失败', apiData.messageStr, HttpConfig.TOAST_ERROR_TIME);
                            } else {
                                this.toast.info('登入过期', '您的登入已经过期，请登入～', HttpConfig.TOAST_ERROR_TIME);
                            }
                        }
                        res = res.clone<ApiData>({ body: apiData });

                    } else if (request.responseType !== 'text') {
                        res = res.clone<ApiData>({ body: new ApiData(false, HttpConfig.HTTP_ERRORS.API_DATA_ERROR) });
                    }
                }

                return res;
            })
        );

        return handle;
    }
}
