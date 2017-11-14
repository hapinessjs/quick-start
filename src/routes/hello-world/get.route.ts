import { OnGet, Route, Request } from '@hapiness/core';
import { HelloWorldService } from '../../services';
import { Observable } from 'rxjs/Observable';

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
     *
     * @param {Request} request
     *
     * @return {Observable<string>}
     */
    onGet(request: Request): Observable<string> {
        return this._helloWorldService.sayHello();
    }
}
