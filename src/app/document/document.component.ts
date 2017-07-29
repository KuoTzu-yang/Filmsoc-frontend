import { Component, OnInit } from '@angular/core';

import { DocumentService } from './document.service';
import { Logger } from '../logger';
import { Router } from '@angular/router';

import { Document, DocumentMeta, DocumentResponse } from './document';

import { DocumentAnimations } from './document.animations';

import { DomSanitizer } from '@angular/platform-browser';


@Component({
    moduleId: module.id,
    selector: 'film-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.css'],
    animations: DocumentAnimations,
})
export class DocumentComponent implements OnInit {

    public documents: Document[];
    public toggled: boolean;
    public initLoading: boolean;
    
    private meta: DocumentMeta;

    private max_index: number;
    private next_page: number;
    private page_size: number;

    public selectedDocument: Document;
    

    constructor(
        private documentService: DocumentService,
        private logger: Logger,
        private router: Router,
        private sanitizer: DomSanitizer,
    ) {
    }
    
    ngOnInit(): void {
        this.initLoading = true;
        this.toggled = false;
        this.getDocuments();
    }

    getDocuments(): void {
       

        this.documentService.getDocuments()
            .subscribe(
            this.onGetDocumentRes,
            this.logger.error
            )
    }

    private onGetDocumentRes = (res: DocumentResponse) => {
        //console.log("Response: ");
        //console.log(res.objects);

        if (res.errno) {
            this.logger.customErrorHandler(res);
        } else {
            //console.log(res);
            this.max_index = res.meta.total;
            this.meta = res.meta;
            this.documents = res.objects;
            //console.log(this.excoes);
            this.initLoading = false;
            this.selectedDocument = this.documents[0];
        }
        
    }


 
    goToDocument(document): void {
        
        this.selectedDocument = document;
    }

    private nextPage(): void {
  
    }

    toggle(): void {
        this.toggled = !(this.toggled);
    }

    private FileURL(): any {
        //console.log(this.selectedDocument.doc_url.full_url);
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedDocument.doc_url.full_url);
    }

    private FileDownloadURL(): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedDocument.doc_url.full_url + "?force_download=true&dn_name=" + this.selectedDocument.title);
    }

}