import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class RouterService {
    constructor(
        private router: Router,
    ) { }

    goToHome() {
        this.router.navigate(['/home']);
    }

    goToRFS() {
        this.router.navigate(['/show']);
    }

    goToLiba() {
        this.router.navigate(['/library']);
    }

    goToFFT() {
        this.router.navigate(['/ticket']);
    }

    goToNews() {
        this.router.navigate(['/news']);
    }

    goToDoc() {
        this.router.navigate(['/document']);
    }

    goToPub() {
        this.router.navigate(['/publication']);
    }

    goToAbout() {
        this.router.navigate(['/about']);
    }
}
