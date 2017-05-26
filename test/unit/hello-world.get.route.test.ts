/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { ReplyNoContinue } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

// element to test
import { HelloWorldService } from '../../src/services';
import { GetHelloWorldRoute } from '../../src/routes';

@suite('- Unit GetHelloWorldRouteTest file')
class GetHelloWorldRouteTest {
    // private property to store mock service instance
    private _helloWorldServiceMock: any;
    // private property to store route instance
    private _getHelloWorldRoute: GetHelloWorldRoute;

    /**
     * Function executed before the suite
     */
    static before() {}

    /**
     * Function executed after the suite
     */
    static after() {}

    /**
     * Class constructor
     * New lifecycle
     */
    constructor() {}

    /**
     * Function executed before each test
     */
    before() {
        this._getHelloWorldRoute = new GetHelloWorldRoute(new HelloWorldService());
        this._helloWorldServiceMock = unit.mock(this._getHelloWorldRoute['_helloWorldService']);
    }

    /**
     * Function executed after each test
     */
    after() {
        this._getHelloWorldRoute = undefined;
        this._helloWorldServiceMock = undefined;
    }

    /**
     * Test if `GetHelloWorldRoute` as a `onGet` function
     */
    @test('- `GetHelloWorldRoute` must have `onGet` function')
    testGetHelloWorldRouteOnGet() {
        unit.function(this._getHelloWorldRoute.onGet);
    }

    /**
     * Test if `GetHelloWorldRoute.onGet()` function call `reply` to send response
     */
    @test('- `GetHelloWorldRoute.onGet()` function must have a callback function returns `Hello World`')
    testGetHelloWorldRouteOnGetReply(done) {
        this._helloWorldServiceMock.expects('sayHello').returns(Observable.create(observer => {
            observer.next('Hello World');
            observer.complete();
        }));

        this._getHelloWorldRoute.onGet(null, <ReplyNoContinue>(res => {
            unit.string(res).is('Hello World').when(_ => {
                this._helloWorldServiceMock.verify();
                this._helloWorldServiceMock.restore();
                done();
            })
        }));
    }
}
