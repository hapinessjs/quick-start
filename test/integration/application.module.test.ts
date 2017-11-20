/**
 * @see https://github.com/pana-cc/mocha-typescript
 */
import { test, suite } from 'mocha-typescript';

/**
 * @see http://unitjs.com/
 */
import * as unit from 'unit.js';

import { Hapiness, HttpServerExt } from '@hapiness/core';
import { Config } from '@hapiness/config';

// load config before bootstrap and import application module
Config.load();

// element to test
import { ApplicationModule } from '../../src/application.module';

@suite('- Integration ApplicationModuleTest file')
export class ApplicationModuleTest {
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
        Hapiness.bootstrap(ApplicationModule, [HttpServerExt.setConfig({
            host: '0.0.0.0',
            port: 4443
        })]).then(() => {
            const server = Hapiness['extensions'].pop().value;
            server.inject('/helloWorld', reply => unit.string(reply.result).is('Hello World')
                .when(_ => server.stop().then(__ => done())));
        });
    }

    /**
     * Test if downloadImage GET route returns `image/jpeg`
     */
    @test('- check if `downloadImage` GET route returns `image/png`')
    testGetDownloadImageRoute(done) {
        Hapiness.bootstrap(ApplicationModule, [HttpServerExt.setConfig({
            host: '0.0.0.0',
            port: 4443
        })]).then(() => {
            const server = Hapiness['extensions'].pop().value;
            server.inject('/download?url=https://avatars4.githubusercontent.com/u/25975764?v=4&s=200',
                reply => unit.string(reply.headers['content-type']).is('image/png').when(_ => server.stop().then(__ => done())));
        });
    }
}
