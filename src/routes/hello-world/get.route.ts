import { OnGet, Route, ReplyNoContinue, Request } from '@hapiness/core';
import { HelloWorldService } from '../../services';

@Route({
    path: '/helloWorld',
    method: 'GET',
    config: {
        description: 'Hello world',
        notes: 'Say Hello World to you',
        tags: ['api', 'hello']
    }
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
    onGet(request: Request, reply: ReplyNoContinue): void {
        this._helloWorldService.sayHello().subscribe(m => reply(m));
    }
}
