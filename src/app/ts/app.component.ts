import { Component }       from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div class="container body-container">
      <router-outlet></router-outlet>
      <file-upload></file-upload>
    </div>
  `
})

export class AppComponent { }
