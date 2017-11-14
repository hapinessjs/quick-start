import { Injectable } from '@hapiness/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HelloWorldService {
    /**
     * Function to say Hello World
     * @return {Observable<string>}
     */
    sayHello(): Observable<string> {
        return of('Hello World');
    }
}
