import { Component, OnInit } from '@angular/core';

import { Logger } from '../logger';
import { Router } from '@angular/router';

import { HomeService } from './home.service';
import { RouterService } from '../util/router.service';

@Component({
    moduleId: module.id,
    selector: 'film-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

    constructor(
        public routerService: RouterService,
        private homeService: HomeService,
        private logger: Logger,
        private router: Router
    ) {

    }

    ngOnInit(): void {

    }

}
