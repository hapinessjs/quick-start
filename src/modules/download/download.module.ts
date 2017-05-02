import { HapinessModule } from '@hapiness/core';
import { HttpModule } from '@hapiness/http';
import { GetDownloadImageRoute } from './routes';

@HapinessModule({
    version: '1.0.0',
    imports: [
        HttpModule
    ],
    declarations: [
        GetDownloadImageRoute
    ]
})
export class DownloadModule {}
