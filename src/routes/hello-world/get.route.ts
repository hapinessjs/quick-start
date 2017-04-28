import { OnGet, Route, Reply, Request } from '@hapiness/core';
import { HelloWorldService } from '../../services';

@Route({
    path: '/helloWorld',
    method: 'GET'
})
export class GetHelloWorldRoute implements OnGet {
    /**
     * Class constructor
     * @param _helloWorldService
     */
    constructor(private _helloWorldService: HelloWorldService) {}

    /**
     * OnGet implementation
     * @param request
     * @param reply
     */
    onGet(request: Request, reply: Reply): void {
        this._helloWorldService.sayHello().subscribe(m => reply(m));
    }
}
