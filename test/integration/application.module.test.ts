/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Hapiness } from '@hapiness/core';

// element to test
import { ApplicationModule } from '../../src/application.module';

@suite('- Integration ApplicationModuleTest file')
class ApplicationModuleTest {
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
     * Test if helloWorld GET route returns `Hello World`
     */
    @test('- check if `helloWorld` GET route returns `Hello World`')
    testHelloWorldGetRoute(done) {
        Hapiness.bootstrap(ApplicationModule).then(() => {
            Hapiness['mainModule'].server.inject('/helloWorld', reply => unit.string(reply.result).is('Hello World')
                .when(_ => Hapiness.kill().subscribe(__ => done())));
        });
    }
}
