import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';



import { SettingsService } from '../settings';
import { Logger } from '../logger';

import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';

@Injectable()
export class HomeService {
    
    constructor(
        private http: Http,
        private logger: Logger,
        private settings: SettingsService
    ) { }

}