/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Request, Reply } from '@hapiness/core';
import { HttpService } from '@hapiness/http';
import { Observable } from 'rxjs/Observable';
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
        this._httpServiceMock.expects('getBuffer').returns(Observable.create(observer => {
            observer.next({ body: Buffer.from('hello world', 'ascii'), response: {} });
            observer.complete();
        }));

        this._getDownloadImageRoute
            .onGet(<Request>{ query: { url: 'http://fake.uri' } }, <Reply>(res => {
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
        this._httpServiceMock.expects('getBuffer').returns(Observable.create(observer => {
            observer.error(new Error('option.uri is a required argument'));
        }));

        this._getDownloadImageRoute
            .onGet(<Request>{ query: { url: null } }, <Reply>(res => {
                unit.string(res.output.payload.message).is('option.uri is a required argument').when(_ => {
                    this._httpServiceMock.verify();
                    this._httpServiceMock.restore();
                    done();
                })
            }));
    }
}
