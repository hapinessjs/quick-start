/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Hapiness, HapinessModule, HttpServerExt, Lib } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

// element to test
import { HelloWorldService } from '../../src/services';

@suite('- Integration HelloWorldServiceTest file')
export class HelloWorldServiceTest {
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
    before() {}

    /**
     * Function executed after each test
     */
    after() {}

    /**
     * Test if injected service is an instance of HelloWorldService
     */
    @test('- Injected service must be an instance of `HelloWorldService`')
    testInjectableHelloWorldService(done) {
        @Lib()
        class HelloWorldLib {
            constructor(private _helloWorldService: HelloWorldService) {
                unit.object(this._helloWorldService).isInstanceOf(HelloWorldService);
            }
        }

        @HapinessModule({
            version: '1.0.0',
            declarations: [
                HelloWorldLib
            ],
            providers: [
                HelloWorldService
            ]
        })
        class ApplicationModuleMock {}

        Hapiness.bootstrap(ApplicationModuleMock, [HttpServerExt.setConfig({
            host: '0.0.0.0',
            port: 4443
        })])
        .then(_ =>
            Hapiness['extensions'][0]
                .value
                .stop()
                .then(__ => done())
                .catch(__ => done(__))
        )
        .catch(err => done(err));
    }

    /**
     * Test if injected `HelloWorldService` as a `sayHello` function
     */
    @test('- Injected `HelloWorldService` must have `sayHello` function')
    testInjectableHelloWorldServiceSayHello(done) {
        @Lib()
        class HelloWorldLib {
            constructor(private _helloWorldService: HelloWorldService) {
                unit.function(this._helloWorldService.sayHello);
            }
        }

        @HapinessModule({
            version: '1.0.0',
            declarations: [
                HelloWorldLib
            ],
            providers: [
                HelloWorldService
            ]
        })
        class ApplicationModuleMock {}

        Hapiness.bootstrap(ApplicationModuleMock, [HttpServerExt.setConfig({
            host: '0.0.0.0',
            port: 4443
        })])
        .then(_ =>
            Hapiness['extensions'][0]
                .value
                .stop()
                .then(__ => done())
                .catch(__ => done(__))
        )
        .catch(err => done(err));
    }

    /**
     * Test if injected `HelloWorldService.sayHello()` function returns an Observable
     */
    @test('- Injected `HelloWorldService.sayHello()` function must return an Observable')
    testInjectableHelloWorldServiceSayHelloObservable(done) {
        @Lib()
        class HelloWorldLib {
            constructor(private _helloWorldService: HelloWorldService) {
                unit.object(this._helloWorldService.sayHello()).isInstanceOf(Observable);
            }
        }

        @HapinessModule({
            version: '1.0.0',
            declarations: [
                HelloWorldLib
            ],
            providers: [
                HelloWorldService
            ]
        })
        class ApplicationModuleMock {}

        Hapiness.bootstrap(ApplicationModuleMock, [HttpServerExt.setConfig({
            host: '0.0.0.0',
            port: 4443
        })])
        .then(_ =>
            Hapiness['extensions'][0]
                .value
                .stop()
                .then(__ => done())
                .catch(__ => done(__))
        )
        .catch(err => done(err));
    }

    /**
     * Test if injected `HelloWorldService.sayHello()` Observable returns 'Hello World'
     */
    @test('- Injected `HelloWorldService.sayHello()` Observable function must return a string with `Hello World` value')
    testInjectableHelloWorldServiceSayHelloObservableReturnString(done) {
        @Lib()
        class HelloWorldLib {
            constructor(private _helloWorldService: HelloWorldService) {
                this._helloWorldService.sayHello().subscribe(m => unit.string(m).is('Hello World'))
            }
        }

        @HapinessModule({
            version: '1.0.0',
            declarations: [
                HelloWorldLib
            ],
            providers: [
                HelloWorldService
            ]
        })
        class ApplicationModuleMock {}

        Hapiness.bootstrap(ApplicationModuleMock, [HttpServerExt.setConfig({
            host: '0.0.0.0',
            port: 4443
        })])
        .then(_ =>
            Hapiness['extensions'][0]
                .value
                .stop()
                .then(__ => done())
                .catch(__ => done(__))
        )
        .catch(err => done(err));
    }
}
