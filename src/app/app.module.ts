import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SettingsService } from './settings';
import { Logger } from './logger';


// Home
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';

// Regular Film Show
import { ShowComponent } from './rfs/show.component';
import { ShowService } from './rfs/show.service';

// DVD/VCD Liba
import { DiskSearchComponent } from './dvdliba/disk-search/disk-search.component';
import { DiskDetailComponent } from './dvdliba/disk-detail/disk-detail.component';
import { DiskListComponent } from './dvdliba/disk-list/disk-list.component';
import { DiskComponent } from './dvdliba/disk.component';
import { DiskService } from './dvdliba/disk.service';
import { DiskSearchService } from './dvdliba/disk-search/disk-search.service';

// Free Film Ticket
import { TicketComponent } from './fft/ticket.component';
import { TicketService } from './fft/ticket.service';

// News
import { NewsComponent } from './news/news.component';
import { NewsService } from './news/news.service';

// Documents
import { DocumentComponent } from './document/document.component';
import { DocumentService } from './document/document.service';

// Publications
import { MagazineComponent } from './publication/magazine/magazine.component';
import { PodcastComponent } from './publication/podcast/podcast.component';
import { MicroMagazineComponent } from './publication/micro-magazine/micro-magazine.component';
import { PamphletComponent } from './publication/pamphlet/pamphlet.component';

// About us
import { AboutComponent } from './about/about.component';
import { AboutService } from './about/about.service';

// Notification
import { NotificationComponent } from './notification/notification.component';
import { Notification } from './notification/notification';
import { NotificationService } from './notification/notification.service';

// One-Sentence
import { OneSentence } from './one-sentence/one-sentence';
import { OneSentenceComponent } from './one-sentence/one-sentence.component';
import { OneSentenceService } from './one-sentence/one-sentence.service';

// Extra Resources & Util
import { RouterService } from './util/router.service';
import { InfiniteScroll } from './util/infinite-scroll.directive';
import { LoadersCssModule } from 'angular2-loaders-css';
import { requestOptionsProvider } from './util/default-request-options.service';

// Userinfo
import { UserinfoComponent } from './userinfo/userinfo.component';
import { UserService } from './userinfo/user.service';

// Page Not Found
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// For the purpose of loading PDF,  source:
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        LoadersCssModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ShowComponent,
        DiskComponent,
        DiskListComponent,
        DiskSearchComponent,
        DiskDetailComponent,
        TicketComponent,
        NewsComponent,
        DocumentComponent,
        MagazineComponent,
        PodcastComponent,
        MicroMagazineComponent,
        PamphletComponent,
        AboutComponent,
        NotificationComponent,
        OneSentenceComponent,
        InfiniteScroll,
        PageNotFoundComponent,
        UserinfoComponent,
    ],
    providers: [
        RouterService,
        Logger,
        SettingsService,
        HomeService,
        ShowService,
        DiskService,
        DiskSearchService,
        TicketService,
        NewsService,
        DocumentService,
        AboutService,
        NotificationService,
        OneSentenceService,
        UserService,
        requestOptionsProvider,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
