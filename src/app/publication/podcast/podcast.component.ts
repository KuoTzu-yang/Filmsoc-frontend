import { Component, OnInit } from '@angular/core';

import { Logger } from '../../logger';
import { Router } from '@angular/router';

import { SettingsService } from '../../settings';

import { Publication, PublicationMeta, PublicationResponse } from '../publication';
import { PodcastService } from './podcast.service';
import { PodcastAnimations } from './podcast.animations';

import { DomSanitizer } from '@angular/platform-browser';


@Component({
    moduleId: module.id,
    selector: 'film-publication-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.css'],
    providers: [ PodcastService ],
    animations: PodcastAnimations,
})
export class PodcastComponent implements OnInit {

    public podcasts: Publication[];
    public toggled: boolean;
    public initLoading: boolean;
    
    private meta: PublicationMeta;

    private max_index: number;
    private next_page: number;
    private page_size: number;

    public selectedPublication: Publication;
    

    constructor(
        private settings: SettingsService,
        private podcastService: PodcastService,
        private logger: Logger,
        private router: Router,
        private sanitizer: DomSanitizer,
    ) {
    }
    
    ngOnInit(): void {
        this.initLoading = true;
        this.toggled = false;
        this.getPodcasts();
    }

    getPodcasts(): void {
       
        console.log("loading podcasts");
        this.podcastService.getPodcastPublications()
            .subscribe(
            this.onGetPodcastRes,
            this.logger.error
            )
    }

    private onGetPodcastRes = (res: PublicationResponse) => {
     

        if (res.errno) {
            this.logger.customErrorHandler(res);
        } else {
            
            this.max_index = res.meta.total;
            this.meta = res.meta;
            this.podcasts = res.objects;
            console.log("completed");
            this.initLoading = false;
            this.goToPodcast(this.podcasts[0]);
        }
        
    }
    
    goToPodcast(publication): void {
        
        this.selectedPublication = publication;
    }

    private nextPage(): void {
        //Maybe useful in the future, keep this now

    }

    toggle(): void {
        this.toggled = !(this.toggled);
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