import { OnGet, Route, ReplyNoContinue, Request } from '@hapiness/core';
import { HttpService } from '@hapiness/http';
import { Biim } from '@hapiness/biim';

@Route({
    path: '/download',
    method: 'GET'
})
export class GetDownloadImageRoute implements OnGet {
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
    onGet(request: Request, reply: ReplyNoContinue): void {
        this._http
            .getBuffer((<any>request.query).url)
            .subscribe(
                data => reply(data.body).header('content-type', <string>data.response.headers['content-type']),
                error => reply(Biim.badData(error.message))
            );
    }
}
