import { HapinessModule } from '@hapiness/core';
import { HttpModule } from '@hapiness/http';
import { GetDownloadRoute } from './routes';

@HapinessModule({
    version: '1.0.0',
    imports: [
        HttpModule
    ],
    declarations: [
        GetDownloadRoute
    ]
})
export class DownloadModule {}
