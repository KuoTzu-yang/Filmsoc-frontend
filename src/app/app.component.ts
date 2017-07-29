import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './userinfo/user.service';
import { SettingsService } from './settings';
import { RouterService } from './util/router.service';

import { MEMBERSHIP_TABLE } from './userinfo/userinfo';

@Component({
    moduleId: module.id,
    selector: 'film-app',
    templateUrl:'./app.component.html',  
    styleUrls: ['./app.component.css', '../scrollbar.css', '../loaders.min.css'],
   
})
export class AppComponent {
    
    public MEMBERSHIP_TABLE: {};

    constructor(
        public userService: UserService,
        public routerService: RouterService,
        private settings: SettingsService,
        private router: Router,
    ) {
        userService.getCurrentUser()
        this.MEMBERSHIP_TABLE = MEMBERSHIP_TABLE;
    }

    
    title = "Film Society, HKUSTSU";
}

