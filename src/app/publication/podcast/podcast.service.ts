import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { SettingsService } from '../../settings';
import { Logger } from '../../logger';

import { Observable } from 'rxjs/Observable';
import '../../rxjs-operators';

import { Publication, PublicationMeta, PublicationResponse } from '../publication';
import { File } from '../../dvdliba/file';


@Injectable()
export class PodcastService {
    private PublicationGetUrl = 'publication/';
    private new_full_url = 'default';

    constructor(
        private http: Http,
        private logger: Logger,
        private settings: SettingsService
    ) { }

    getPodcastPublications(): Observable<PublicationResponse> {

        let params = '?pub_type=Podcast';

        let url = this.settings.api_base() + this.PublicationGetUrl + params;

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


    private getFullUrl(publication) {

        if (publication.cover_url && publication.cover_url.url) {
            publication.cover_url.full_url = this.settings.resource_base() + 'upload/' + publication.cover_url.url;
        } else {
            publication.cover_url.full_url = this.settings.resource_base() + 'img/qustion.png';
        }

        return publication;
    }

}
