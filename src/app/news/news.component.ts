import { Component, OnInit } from '@angular/core';

import { NewsResponse, News, NewsMeta } from './news';

import { NewsService } from './news.service';
import { Logger } from '../logger';
import { Router } from '@angular/router';

import { NewsAnimations } from './news.animations';

@Component({
    moduleId: module.id,
    selector: 'film-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    animations: NewsAnimations,

})
export class NewsComponent implements OnInit {
    newses: News[];

    private meta: NewsMeta;
    public selectedNews: News;

    public initLoading: boolean;
    public toggled: boolean;

    private max_index: number;
    private next_page: number;
    private page_size: number;

    private scrollLoading: boolean;

    constructor(
        private newsService: NewsService,
        private logger: Logger,
        private router: Router
    ) {
    }

    getNews(index: number, limit: number): void {
        this.newsService.getNews(index, limit)
            .subscribe(
            this.onGetNewRes,
            this.logger.error
          );
    }

    private onGetNewRes = (res: NewsResponse) => {

        if (res.errno) {
            this.logger.customErrorHandler(res);
        } else {
            this.max_index = res.meta.total;
            this.meta = res.meta;
            this.newses = this.newses.concat(res.objects);
            this.initLoading = false;
            this.scrollLoading = false;
        }
        if (this.next_page === 2) {
            this.selectedNews = this.newses[0];
        }
    }

    private nextPage(): void {
        if (this.next_page > this.max_index) {
            return;
        } else {
            if (this.next_page > 1) {
                this.scrollLoading = true;
            }
            this.getNews(this.next_page, this.page_size);
            this.next_page += 1;
        }
    }



    ngOnInit(): void {
        this.page_size = 6;
        this.next_page = 1;
        this.max_index = 1;
        this.newses = [];
        this.nextPage();
        this.toggled = false;
        this.initLoading = true;
        this.scrollLoading = false;
    }

    toggle(): void {
        this.toggled = !(this.toggled);
    }

    trackByNewses(index: number, news: News) {
        return news.id;
    }

    goToNews(news): void {
        this.selectedNews = news;
    }

}
