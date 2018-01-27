import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Document, DocumentMeta, DocumentResponse } from './document';

import { SettingsService } from '../settings';
import { Logger } from '../logger';

import { Observable } from 'rxjs/Observable';
import '../rxjs-operators';

@Injectable()
export class DocumentService {
    private DocumentGetUrl = "document/"

    constructor(
        private http: Http,
        private logger: Logger,
        private settings: SettingsService
    ) { }

    getDocuments(): Observable<DocumentResponse> {

        let url = this.settings.api_base() + this.DocumentGetUrl;

        return this.http.get(url)
            .map(this.extractNewRes)
            .catch(this.logger.errorHandler);
    }

    private extractNewRes = (res: Response) => {
        let body = res.json();
        let i: number;
        for (i = 0; i < body.objects.length; i++) {
            body.objects[i] = this.getFullUrl(body.objects[i]);
        }
        return body || {};
    }

    private getFullUrl(document) {

        if (document.doc_url && document.doc_url.url) {

            document.doc_url.full_url = this.settings.resource_base() + 'upload/' + document.doc_url.url;
        } else {
            document.doc_url.full_url = this.settings.resource_base() + 'img/qustion.png';
        }

        return document;
    }

}
