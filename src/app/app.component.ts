import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { RouterFocusService } from './services/router-focus.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private routerFocusService: RouterFocusService) {
    this.initializeApp();
  }

  initializeApp() {
    if (Capacitor.isNativePlatform()) {
      /* To make sure we provide the fastest app loading experience 
          for our users, hide the splash screen automatically 
          when the app is ready to be used:

          https://capacitorjs.com/docs/apis/splash-screen#hiding-the-splash-screen
      */
      SplashScreen.hide();
    }
    this.routerFocusService.init();
  }
}
