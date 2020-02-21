import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'app/models/data/User';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
    currentLang = 'en';
    toggleClass = 'ft-maximize';
    placement = 'bottom-right';
    public isCollapsed = true;
    layoutSub: Subscription;
    user: User;
    pic = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png';
    @Output()
    toggleHideSidebar = new EventEmitter<Object>();

    public config: any = {};

    constructor(
        public translate: TranslateService,
        private layoutService: LayoutService,
        private configService: ConfigService,
        public auth: AuthService,
        private router: Router
    ) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');

        this.layoutSub = layoutService.changeEmitted$.subscribe(
            direction => {
                const dir = direction.direction;
                if (dir === 'rtl') {
                    this.placement = 'bottom-left';
                } else if (dir === 'ltr') {
                    this.placement = 'bottom-right';
                }
            });
        this.auth.user$.subscribe(u => {
            this.user = u;
            if (!this.user.photoURL) {
                this.user.photoURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png';
            }
        })
    }

    ngOnInit() {
        this.config = this.configService.templateConf;
    }

    ngAfterViewInit() {
        if (this.config.layout.dir) {
            setTimeout(() => {
                const dir = this.config.layout.dir;
                if (dir === 'rtl') {
                    this.placement = 'bottom-left';
                } else if (dir === 'ltr') {
                    this.placement = 'bottom-right';
                }
            }, 0);

        }
    }

    ngOnDestroy() {
        if (this.layoutSub) {
            this.layoutSub.unsubscribe();
        }
    }

    ChangeLanguage(language: string) {
        this.translate.use(language);
    }

    setDefaultPic() {
        this.pic = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png";
    }

    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        } else {
            this.toggleClass = 'ft-maximize';
        }
    }

    toggleNotificationSidebar() {
        this.layoutService.emitNotiSidebarChange(true);
    }

    toggleSidebar() {
        const appSidebar = document.getElementsByClassName('app-sidebar')[0];
        const mainContent = document.getElementsByClassName('main-content')[0];
        const nav = document.getElementsByClassName('navbar-header')[0];

        if (appSidebar.classList.contains('hide-sidebar')) {
            mainContent.classList.remove('unpadded')
            nav.classList.remove('unpadded');
            this.toggleHideSidebar.emit(false);
        } else {
            mainContent.classList.add('unpadded')
            nav.classList.add('unpadded');
            this.toggleHideSidebar.emit(true);
        }
    }
}
