/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Observable } from 'rxjs/Observable';

// element to test
import { HelloWorldService } from '../../src/services';

@suite('- Unit HelloWorldServiceTest file')
class HelloWorldServiceTest {
    // private property to store service instance
    private _helloWorldService: HelloWorldService;

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
        this._helloWorldService = new HelloWorldService();
    }

    /**
     * Function executed after each test
     */
    after() {
        this._helloWorldService = undefined;
    }

    /**
     * Test if `HelloWorldService` as a `sayHello` function
     */
    @test('- `HelloWorldService` must have `sayHello` function')
    testHelloWorldServiceSayHello() {
        unit.function(this._helloWorldService.sayHello);
    }

    /**
     * Test if `HelloWorldService.sayHello()` function returns an Observable
     */
    @test('- `HelloWorldService.sayHello()` function must return an Observable')
    testHelloWorldServiceSayHelloObservable() {
        unit.object(this._helloWorldService.sayHello()).isInstanceOf(Observable);
    }
    /**
     * Test if `HelloWorldService.sayHello()` Observable returns 'Hello World'
     */
    @test('- `HelloWorldService.sayHello()` Observable function must return a string with `Hello World` value')
    testHelloWorldServiceSayHelloObservableReturnString(done) {
        this._helloWorldService.sayHello().subscribe(m => unit.string(m).is('Hello World').when(_ => done()));
    }
}
