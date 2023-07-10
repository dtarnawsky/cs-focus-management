# Focus Management

This is an attempt to handle focus management through use of the Angular Router `navigationEnd` event and finding
the correct element to focus on the page. The concept is to ensure the screen reader will announce the correct
element when navigating to a page.

See [router-focus.service.ts](./services/router-focus.service.ts)