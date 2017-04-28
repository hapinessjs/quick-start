import { HapinessModule, HttpServer, OnStart } from '@hapiness/core';
import { HelloWorldService } from './services';
import { GetHelloWorldRoute } from './routes';
import { DownloadModule } from './modules';

@HapinessModule({
    version: '1.0.0-beta.2',
    options: {
        host: '0.0.0.0',
        port: 4443
    },
    imports: [
        DownloadModule
    ],
    declarations: [
        GetHelloWorldRoute
    ],
    providers: [
        HelloWorldService
    ]
})
export class ApplicationModule implements OnStart {
    /**
     * Class constructor
     * @param _httpServer wrapper for instance of original Hapi server
     */
    constructor(private _httpServer: HttpServer) {}

    /**
     * OnStart process
     */
    onStart(): void {
        console.log(`< Application.bootstrap > Server started at: ${this._httpServer.instance.info.uri}`);
    }
}
