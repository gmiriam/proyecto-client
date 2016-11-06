import { Component }       from '@angular/core';

@Component({
  selector: 'auth-app',
  template: `
    <div class="container body-container">
      <router-outlet></router-outlet>
    </div>
  `
})

export class AppComponent {
  constructor() {}
}
