﻿import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// This library is imported to handle reloading in subpages, which is provided by angular itself!
// With hashtag strategy, when you reload at subpages, you will still stay in the same subpages.
// Otherwise, website will redirect to the entering root page or cause 404 error
// usage: RouterModule.forRoot(routes, {useHash: true})
// use {useHash: true}
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { HomeComponent } from './home/home.component';
import { ShowComponent } from './rfs/show.component';
import { DiskComponent } from './dvdliba/disk.component';
import { DiskDetailComponent } from './dvdliba/disk-detail/disk-detail.component';
import { DiskListComponent } from './dvdliba/disk-list/disk-list.component';
import { TicketComponent } from './fft/ticket.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { DocumentComponent } from './document/document.component';
import { MagazineComponent } from './publication/magazine/magazine.component';
import { PodcastComponent } from './publication/podcast/podcast.component';
import { PamphletComponent } from './publication/pamphlet/pamphlet.component';
import { MicroMagazineComponent } from './publication/micro-magazine/micro-magazine.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'show', component: ShowComponent },
    {
        path: 'library',
        component: DiskComponent,
        children: [
            {
                path: ':id',
                component: DiskDetailComponent,
            },
            {
                path: '',
                component: DiskListComponent,
            }
        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'ticket', component: TicketComponent },
    { path: 'about', component: AboutComponent },
    { path: 'news', component: NewsComponent },
    { path: 'document', component: DocumentComponent },
    { path: 'publication', component: MagazineComponent },
    { path: 'podcast', component: PodcastComponent },
    { path: 'pamphlet', component: PamphletComponent },
    { path: 'micro-magazine', component: MicroMagazineComponent },
    { path: 'userinfo', component: UserinfoComponent },
    { path: '**', component: PageNotFoundComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})

export class AppRoutingModule { }
