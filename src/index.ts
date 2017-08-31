import { HapiConfig, Hapiness, HttpServerExt } from '@hapiness/core';
import { Config } from '@hapiness/config';
import { LoggerExt } from '@hapiness/logger';
import { LoggerOptions, createLogger } from 'bunyan';

import { ApplicationModule } from './application.module';

// bootstrap application
Hapiness.bootstrap(ApplicationModule, [
    HttpServerExt.setConfig(Config.get<HapiConfig>('server')),
    LoggerExt.setConfig({ logger: createLogger(Config.get<LoggerOptions>('logger')) })
]);
