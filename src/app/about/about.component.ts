import { Component, OnInit, AfterContentInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../userinfo/user.service';
import { Logger } from '../logger';

import { AboutService } from './about.service';
import { Exco, ExcoMeta, ExcoResponse } from './exco';
import { BaseResponse } from '../dvdliba/disk-detail/disk-detail';



@Component({
    moduleId: module.id,
    selector: 'film-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})

export class AboutComponent implements OnInit {

    excoes: Exco[];
    public initLoading: boolean;
    public afterClick: boolean;
    private meta: ExcoMeta;


    private max_index: number;
    private next_page: number;
    private page_size: number;

    public selectedExco: Exco;
    private scrollLoading: boolean;

    constructor(
        private aboutService: AboutService,
        private logger: Logger,
    ) { }


    getExcoes(): void {
        this.aboutService.getExcoes()
            .subscribe(
            this.getExcoesOnLoad,
            this.logger.error
          );
    }

    getExcoesOnLoad = (res: ExcoResponse) => {
        if (res.errno) {
            this.logger.customErrorHandler(res);
        } else {
            this.max_index = res.meta.total;
            this.meta = res.meta;
            this.excoes = res.objects;
            this.initLoading = false;
            this.scrollLoading = false;
            this.selectedExco = this.excoes[0];
        }

    }

    ngOnInit() {

        this.initLoading = true;
        this.afterClick = false;
        this.getExcoes();

    }

    // handle click event
    goToExco(exco): void {
        this.afterClick = true;
        this.selectedExco = exco;
    }

    backToIntro(): void {
        this.afterClick = false;
    }

}
