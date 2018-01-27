import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  // remember to change the "resource_base" and the "url_base" when you change the domain name

  resource_base(): string {
    return 'http://film.su.ust.hk/asset/';
  }
  api_base(): string {
    return 'http://dma517.resnet.ust.hk:49000/film/api/';
  }
  login_url(): string {
    return 'http://dma517.resnet.ust.hk:49000/film/member/login/';
  }
  logout_url(): string {
    return 'http://dma517.resnet.ust.hk:49000/film/member/logout/';
  }
  url_base(): string {
    return '';
  }
  scribd_id(): string {
    return 'pub-51573345608846754358';
  }
}
