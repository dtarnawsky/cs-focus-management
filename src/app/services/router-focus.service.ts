import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ScreenReader } from '@capacitor/screen-reader';

@Injectable({
    providedIn: 'root'
})
export class RouterFocusService {
    constructor(private router: Router) {
    }

    public init() {
        this.router.events.subscribe((event: RouterEvent) => this.focusFirst(event));
    }

    private async focusFirst(event: RouterEvent) {
        if (event instanceof NavigationEnd) {
            // This prevents reading of previously focused element
            await ScreenReader.speak({ value: '	 ' });

            const all = document.getElementsByClassName('page-focus');
            let repeat = true;
            let e: Element;
            while (repeat) {
                let count = 0;
                for (let i = 0, max = all.length; i < max; i++) {
                    if (this.getVisible(all[i] as HTMLElement)) {
                        count++;
                        e = all[i];
                    }
                }
                repeat = (count > 1);
                if (repeat) {
                    await this.delay(100);
                }
            }
            console.log(`Focus on ${e.tagName}`);
            (e as HTMLElement).setAttribute('tab-index', '0');
            (e as HTMLElement).focus();
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve =>
            setTimeout(resolve, ms)
        );
    }

    private getVisible(el: HTMLElement): boolean {
        // look for parent elements with class ion-page and see if ion-page-hidden class is present
        let e = el;
        while (e) {
            if (e.classList.contains('ion-page')) {
                return !e.classList.contains('ion-page-hidden');
            }
            e = e.parentElement;
        }
    }
}
