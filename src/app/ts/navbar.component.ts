import {Component, Input} from 'angular2/core';

@Component({
  selector: 'navbar',
  template: `    
    <nav class="navbar navbar-ull navbar-fixed-top" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-app-collapse">
                            <span class="sr-only">Desplegar menú de aplicación</span>
                            <span class="fa fa-bars fa-stack"></span>
                        </button>
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                            <span class="sr-only">Desplegar menú de navegación</span>
                            <span class="fa fa-link fa-stack"></span>
                        </button>
                        <a class="navbar-brand" href="http://www.ull.es" title="Universidad de La Laguna"></a>
                    </div>

                    <div class="collapse navbar-collapse navbar-main-collapse">
                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <a class="Iniciar sesión" title="Iniciar sesión" href="*">
                                    <i class="fa fa-sign-in"></i> 
                                    <span>Iniciar sesión</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    `
})
export class navbarComponent {
}