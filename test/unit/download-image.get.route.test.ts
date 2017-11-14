/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Request, ReplyNoContinue } from '@hapiness/core';
import { HttpService } from '@hapiness/http';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { Buffer } from 'buffer';

// element to test
import { GetDownloadImageRoute } from '../../src/modules/download/module/routes';

@suite('- Unit GetDownloadImageRouteTest file')
class GetDownloadImageRouteTest {
    // private property to store mock service instance
    private _httpServiceMock: any;
    // private property to store route instance
    private _getDownloadImageRoute: GetDownloadImageRoute;

    /**
     * Function executed before the suite
     */
    static before() {
    }

    /**
     * Function executed after the suite
     */
    static after() {
    }

    /**
     * Class constructor
     * New lifecycle
     */
    constructor() {
    }

    /**
     * Function executed before each test
     */
    before() {
        this._getDownloadImageRoute = new GetDownloadImageRoute(new HttpService());
        this._httpServiceMock = unit.mock(this._getDownloadImageRoute['_http']);
    }

    /**
     * Function executed after each test
     */
    after() {
        this._getDownloadImageRoute = undefined;
        this._httpServiceMock = undefined;
    }

    /**
     * Test if `GetDownloadImageRoute` as a `onGet` function
     */
    @test('- `GetDownloadImageRoute` must have `onGet` function')
    testGetDownloadImageRouteOnGet() {
        unit.function(this._getDownloadImageRoute.onGet);
    }

    /**
     * Test if `GetHelloWorldRoute.onGet()` function call `reply` to send response
     */
    @test('- `GetDownloadImageRoute.onGet()` function must have a callback function returns `Buffer`')
    testGetDownloadImageRouteOnGetReply(done) {
        this._httpServiceMock.expects('getBuffer').returns(of({
            body: Buffer.from('hello world', 'ascii'),
            response: {}
        }));

        // mock request
        let request: Request = unit.mock(Request);
        request.query = { url: 'http://fake.uri' };

        this._getDownloadImageRoute
            .onGet(request, <ReplyNoContinue>(res => {
                unit.object(res).isInstanceOf(Buffer).when(_ => {
                    this._httpServiceMock.verify();
                    this._httpServiceMock.restore();
                    done();
                })
            }));
    }

    /**
     * Test if `GetHelloWorldRoute.onGet()` function call `reply` to send error response
     */
    @test('- `GetDownloadImageRoute.onGet()` function must have a callback function returns `Error` when uri is missing')
    testGetDownloadImageRouteOnGetReplyError(done) {
        this._httpServiceMock.expects('getBuffer').returns(_throw(new Error('option.uri is a required argument')));

        // mock request
        let request: Request = unit.mock(Request);
        request.query = { url: null };

        this._getDownloadImageRoute
            .onGet(request, <ReplyNoContinue>(res => {
                unit.string(res.output.payload.message).is('option.uri is a required argument').when(_ => {
                    this._httpServiceMock.verify();
                    this._httpServiceMock.restore();
                    done();
                })
            }));
    }
}
