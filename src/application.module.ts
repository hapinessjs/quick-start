import { HapinessModule, OnStart, HttpServerExt, Server, Inject } from '@hapiness/core';
import { Config } from '@hapiness/config';
import { LoggerService } from '@hapiness/logger';
import { SwagModule } from '@hapiness/swag';
import { HelloWorldService } from './services';
import { GetHelloWorldRoute } from './routes';
import { DownloadModule } from './modules';

@HapinessModule({
    version: '1.0.0',
    imports: [
        DownloadModule,
        SwagModule.setConfig(Config.get('swag'))
    ],
    declarations: [
        GetHelloWorldRoute
    ],
    providers: [
        HelloWorldService,
        LoggerService
    ]
})
export class ApplicationModule implements OnStart {
    /**
     * Class constructor
     * @param _httpServer wrapper for instance of original Hapi server
     * @param _logger service
     */
    constructor(@Inject(HttpServerExt) private _httpServer: Server, private _logger: LoggerService) {}

    /**
     * OnStart process
     */
    onStart(): void {
        this._logger.info(`< Application.bootstrap > Server started at: ${this._httpServer.info.uri}`);
    }
}
