import { Injectable } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HelloWorldService {
    /**
     * Function to say Hello World
     * @return {Observable<string>}
     */
    sayHello(): Observable<string> {
        return Observable.create(observer => {
            observer.next('Hello World');
            observer.complete();
        });
    }
}
