import { Component, OnInit } from '@angular/core';



import { HomeService } from './home.service';
import { Logger } from '../logger';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'film-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    
})
export class HomeComponent implements OnInit {

    constructor(
        private homeService: HomeService,
        private logger: Logger,
        private router: Router
    ) {

    }



    ngOnInit(): void {
        
    }


    goToRFS(): void {
        this.router.navigate(['/show']);
    }

    goToLiba(): void {
        this.router.navigate(['/library']);
    }

    goToFFT(): void {
        this.router.navigate(['/ticket']);
    }
}