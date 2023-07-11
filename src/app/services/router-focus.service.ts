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
            // Ignore if the screen reader is not enabled
            if (!ScreenReader.isEnabled()) {
                return;
            }

            // This prevents reading of previously focused element
            await ScreenReader.speak({ value: '	 ' });

            // We look for an element on an ion-content that we want to focus
            const all = document.getElementsByClassName('page-focus');

            // We repeatedly look as the previous page will eventually disappear and the new one will animate in
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

            // We need to set tabindex to -1 and focus the element for the screen reader to read what we want
            (e as HTMLElement).setAttribute('tabindex', '-1');
            (e as HTMLElement).focus();
            setTimeout(()=> {
                // This ensures the focus outline doesnt remain on the element
                (e as HTMLElement).blur();
            }, 50);
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
