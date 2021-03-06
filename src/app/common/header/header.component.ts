import { Component, ViewChild, ElementRef } from '@angular/core';
import { ThemeService } from '../../service/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app-state';
import { LogOut } from '../../store/actions/user-actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  languageOption = [
    { text: 'en', value: 'en' },
    { text: 'fr', value: 'fr' }
  ]
  constructor(
    private themeService: ThemeService,
    public translate: TranslateService,
    private store: Store<AppState>,

  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  onLogout(): void {
    this.store.dispatch(new LogOut());
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }


  getdark() {
    return this.themeService.theme === 'dark';
  }

  setdark(enabled: boolean) {
    this.themeService.theme = enabled ? 'dark' : null;
  }

  onChangeTheme(event) {
    if (event) {
      this.setdark(true);
    } else {
      this.setdark(false);
    }
  }
}
