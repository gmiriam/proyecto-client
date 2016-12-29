import { Component }       from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div class="container body-container">
      <router-outlet></router-outlet>
    </div>
  `
})

export class AppComponent {}
