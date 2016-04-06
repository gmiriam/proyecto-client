import { Component, View } from 'angular2/angular2';

@Component({
  selector: 'hello-component'
})
@View({
  template: `<p>{{ message }}</p>`
})
export class HelloComponent {  
  constructor() {
    this.message = "Hola, Angular 2!";
  }
}
