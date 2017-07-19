import { Lib } from '@hapiness/core';
import { HttpService } from '@hapiness/http';
import { RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Observable } from 'rxjs/Observable';

@Lib()
class Test {
    constructor(private _http: HttpService) {}

    getData(): Observable<RxHttpRequestResponse> {
        return this._http.get('toto');
    }
}
