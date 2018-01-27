import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';

import { Logger } from '../logger';

import { SettingsService } from '../settings';
import { Exco, ExcoMeta, ExcoResponse } from './exco';


@Injectable()
export class AboutService {

    private ExcoGetUrl = 'exco/';

    constructor(
        private http: Http,
        private settings: SettingsService,
        private logger: Logger,
    ) { }


    getExcoes(): Observable<ExcoResponse> {

        let url = this.settings.api_base() + this.ExcoGetUrl ;

        return this.http.get(url)
            .map(this.extractData)
            .catch(this.logger.errorHandler);
    }

    private extractData = (res: Response) => {
        let body = res.json();
        let i: number;
        for (i = 0; i < body.objects.length; i++) {
            body.objects[i] = this.getFullUrl(body.objects[i]);
        }
        return body || {};
    }

    private getFullUrl(exco: Exco) {
        if (exco.img_url && exco.img_url.url) {
            exco.img_url.full_url = this.settings.resource_base() + 'upload/' + exco.img_url.url;
        } else {
            exco.img_url.full_url = this.settings.resource_base() + 'img/qustion.png';
        }
        return exco;
    }

    private handleError(error: any): Promise<any> {
        console.error('Error: ', error);
        return Promise.reject(error.message || error);
    }
}
