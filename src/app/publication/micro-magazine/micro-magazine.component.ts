import { Component, OnInit } from '@angular/core';


import { Logger } from '../../logger';
import { Router } from '@angular/router';
import { SettingsService } from '../../settings';

import { Publication, PublicationMeta, PublicationResponse } from '../publication';
import { MicroMagazineService } from './micro-magazine.service';
import { MicroMagazineAnimations } from './micro-magazine.animations';

import { DomSanitizer } from '@angular/platform-browser';


@Component({
    moduleId: module.id,
    selector: 'film-publication-micro-magazine',
    templateUrl: './micro-magazine.component.html',
    styleUrls: ['./micro-magazine.component.css'],
    providers: [MicroMagazineService],
    animations: MicroMagazineAnimations,
})
export class MicroMagazineComponent implements OnInit {

    public microMagazines: Publication[];
    public toggled: boolean;
    public initLoading: boolean;

    private meta: PublicationMeta;

    private max_index: number;
    private next_page: number;
    private page_size: number;

    public selectedPublication: Publication;


    constructor(
        private microMagazineService: MicroMagazineService,
        private logger: Logger,
        private router: Router,
        private settings: SettingsService,
        private sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit(): void {
        this.initLoading = true;
        this.toggled = false;
        this.getMicroMagazines();
    }

    getMicroMagazines(): void {

        console.log("loading micro magazines");
        this.microMagazineService.getMicroMagazinePublications()
            .subscribe(
            this.onGetMicroMagazineRes,
            this.logger.error
            )
    }

    private onGetMicroMagazineRes = (res: PublicationResponse) => {

        if (res.errno) {
            this.logger.customErrorHandler(res);
        } else {
            this.max_index = res.meta.total;
            this.meta = res.meta;
            this.microMagazines = res.objects;
            console.log("completed");
            this.initLoading = false;
            this.goToMicroMagazine(this.microMagazines[0]);
        }

    }



    goToMicroMagazine(publication): void {
        this.selectedPublication = publication;
    }

    private nextPage(): void {
        //Maybe useful in the future, keep this now
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