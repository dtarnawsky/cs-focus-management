# Focus Management

By default, a screen reader will read the __closest__ element when a user transitions from one page to another.

This may behavior can be changed so that the screen reader will read a __chosen__ element (such as the first element on the page).

## Implementation

See [router-focus.service.ts](./src/app/services/router-focus.service.ts)

This service has a method `init` that can be called when your applicaiton starts up. It will use Angular's Router `navigationEnd` event to find an element with the class `page-focus` which it will focus when the routing to the page.