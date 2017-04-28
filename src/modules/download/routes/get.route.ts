import { OnGet, Route, Reply, Request } from '@hapiness/core';
import { HttpService } from '@hapiness/http';
import * as Boom from 'boom';

@Route({
    path: '/download',
    method: 'GET'
})
export class GetDownloadRoute implements OnGet {
    /**
     * Class constructor
     * @param _http
     */
    constructor(private _http: HttpService) {}

    /**
     * OnGet implementation
     * @param request
     * @param reply
     */
    onGet(request: Request, reply: Reply): void {
        this._http
            .getBuffer(request.query.url)
            .subscribe(
                data => reply(data.body).header('content-type', data.response.headers['content-type']),
                error => reply(Boom.badData(error.message))
            );
    }
}
