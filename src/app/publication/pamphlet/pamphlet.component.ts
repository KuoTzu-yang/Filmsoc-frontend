import { Component, OnInit } from '@angular/core';


import { Logger } from '../../logger';
import { Router } from '@angular/router';
import { SettingsService } from '../../settings';

import { Publication, PublicationMeta, PublicationResponse } from '../publication';
import { PamphletService } from './pamphlet.service';
import { PamphletAnimations } from './pamphlet.animations';

import { DomSanitizer } from '@angular/platform-browser';


@Component({
    moduleId: module.id,
    selector: 'film-publication-pamphlet',
    templateUrl: './pamphlet.component.html',
    styleUrls: ['./pamphlet.component.css'],
    providers: [ PamphletService ],
    animations: PamphletAnimations,
})
export class PamphletComponent implements OnInit {

    public pamphlets: Publication[];
    public toggled: boolean;
    public initLoading: boolean;

    private meta: PublicationMeta;

    private max_index: number;
    private next_page: number;
    private page_size: number;

    public selectedPublication: Publication;


    constructor(
        private settings: SettingsService,
        private pamphletService: PamphletService,
        private logger: Logger,
        private router: Router,
        private sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit(): void {
        this.initLoading = true;
        this.toggled = false;
        this.getPamphlets();

    }

    getPamphlets(): void {
        this.pamphletService.getPamphletPublications()
            .subscribe(
            this.onGetPamphletRes,
            this.logger.error
          );
    }

    private onGetPamphletRes = (res: PublicationResponse) => {

        if (res.errno) {
            this.logger.customErrorHandler(res);
        } else {
            this.max_index = res.meta.total;
            this.meta = res.meta;
            this.pamphlets = res.objects;
            this.initLoading = false;
            this.goToPamphlet(this.pamphlets[0]);
        }
    }



    goToPamphlet(publication): void {
        this.selectedPublication = publication;
    }

    private nextPage(): void {
        // Maybe useful in the future, keep this now
    }

    toggle(): void {
        this.toggled = !(this.toggled);
    }

    private FileDownloadURL(): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.filter(this.selectedPublication) + "?force_download=true&dn_name=" + this.selectedPublication.title);
    }

    private FileURL(): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.filter(this.selectedPublication));
    }

    private filter(publication: Publication): string {

        let new_full_url: string;

        // file store in the upload folder
        if (publication.doc_url && publication.doc_url.url) {
            publication.doc_url.full_url = this.settings.resource_base() + 'upload/' + publication.doc_url.url;
        } else {
            // publication.doc_url.full_url = this.settings.resource_base() + 'img/qustion.png';
        }

        // file not store in the upload folder
        if (publication.ext_doc_url) {
            new_full_url = publication.ext_doc_url;
        } else {
            new_full_url = publication.doc_url.full_url;
        }
        return new_full_url;
    }

}
