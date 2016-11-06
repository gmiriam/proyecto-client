/*import {Directive, Attribute, ViewContainerRef, ComponentResolver} from '@angular/core';
import {Router, RouterOutlet, ComponentInstruction} from '@angular/router';
import {Login} from './login';

@Directive({
  selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(_viewContainerRef: ViewContainerRef, _loader: ComponentResolver,
              _parentRouter: Router, @Attribute('name') nameAttr: string) {
    super(_viewContainerRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    // The Boolean following each route below 
    // denotes whether the route requires authentication to view
    this.publicRoutes = {
      'login': true,
      'signup': true
    };
  }

  activate(instruction: ComponentInstruction) {

    let url = instruction.urlPath;

    if (!this.publicRoutes[url] && !localStorage.getItem('accessToken')) {
      this.parentRouter.navigateByUrl('/login');
    }

    return super.activate(instruction);
  }
}*/