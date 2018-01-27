import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './userinfo/user.service';
import { SettingsService } from './settings';
import { RouterService } from './util/router.service';


@Component({
    moduleId: module.id,
    selector: 'film-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css', '../scrollbar.css', '../loaders.min.css'],
})
export class AppComponent {
    constructor(
        public userService: UserService,
        public routerService: RouterService,
        private settings: SettingsService,
        private router: Router,
    ) {
        userService.getCurrentUser();
    }
    title = 'Film Society, HKUSTSU';
}
