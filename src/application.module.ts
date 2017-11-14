import { HapinessModule, OnStart, HttpServerService } from '@hapiness/core';
import { Config } from '@hapiness/config';
import { LoggerModule, LoggerService } from '@hapiness/logger';
import { SwagModule } from '@hapiness/swag';
import { HelloWorldService } from './services';
import { GetHelloWorldRoute } from './routes';
import { DownloadModule } from './modules';

@HapinessModule({
    version: '1.0.0',
    imports: [
        LoggerModule,
        DownloadModule,
        SwagModule.setConfig(Config.get('swag'))
    ],
    declarations: [
        GetHelloWorldRoute
    ],
    providers: [
        HelloWorldService,
        HttpServerService
    ]
})
export class ApplicationModule implements OnStart {
    /**
     * Class constructor
     * @param _httpServer wrapper for instance of original Hapi server
     * @param _logger service
     */
    constructor(private _httpServer: HttpServerService, private _logger: LoggerService) {}

    /**
     * OnStart process
     */
    onStart(): void {
        this._logger.info(`< Application.bootstrap > Server started at: ${this._httpServer.instance().info.uri}`);
    }
}
