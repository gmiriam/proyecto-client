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
                        <a class="navbar-brand" href="http://www.ull.es" title="Universidad de La Laguna">Universidad de La Laguna</a>
                    </div>

                    <div class="collapse navbar-collapse navbar-main-collapse">
                        <ul class="nav navbar-nav navbar-right">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Servicios telemáticos <b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a target="_blank" title="Gestión de perfil de usuario" href="http://usuarios.ull.es"><i class="fa fa-user"></i> Gestión de perfil de usuario</a></li>
                                    <li><a target="_blank" title="Portal ULL" href="http://portal.ull.es"><i class="fa fa-folder-open"></i> Portal</a></li>
                                    <li><a target="_blank" title="Sede electrónica" href="http://sede.ull.es"><i class="fa fa-briefcase"></i> Sede electrónica</a></li>
                                    <li><a target="_blank" title="Campus Virtual" href="https://campusvirtual.ull.es"><i class="fa fa-pencil"></i> Campus virtual</a></li>
                                    <li><a target="_blank" title="Correo electrónico" href="http://ull.edu.es"><i class="fa fa-envelope"></i> Correo electrónico</a></li>
                                    <li><a target="_blank" title="Disco duro virtual" href="http://ddv.ull.es"><i class="fa fa-hdd-o"></i> Disco duro virtual</a></li>
                                    <li><a target="_blank" title="Biblioteca digital" href="http://www.bbtk.ull.es/view/institucional/bbtk/Biblioteca_Digital/es"><i class="fa fa-book"></i> Biblioteca digital</a></li>
                                    <li><a target="_blank" title="Eventos" href="http://eventos.ull.es"><i class="fa fa-calendar"></i> Eventos</a></li>
                                </ul>
                            </li>

                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Contacto <b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a target="_blank" href="http://www.ull.es"><i class="fa fa-globe"></i> Página Web ULL</a></li>
                                    <li><a target="_blank" title="Formulario de contacto" href="http://www.ull.es/view/institucional/ull/Contacto_3/es"><i class="fa fa-list-alt"></i> Formulario de contacto</a></li>
                                    <li><a target="_blank" title="Teléfonos" href="http://www.ull.es/view/institucional/ull/Telefonos/es"><i class="fa fa-phone"></i> Directorio telefónico</a></li>
                                    <li class="divider"></li>
                                    <li>
                                        <ul class="rrss text-muted list-inline">
                                            <li><a target="_blank" href="http://www.facebook.com/universidaddelalaguna"><i class="fa fa-facebook-square"></i></a></li>
                                            <li><a target="_blank" href="http://www.tuenti.com/#m=Page&amp;func=index&amp;page_key=1_160_68944913"><i class="fa fa-tumblr-square"></i></a></li>
                                            <li><a target="_blank" href="http://twitter.com/CanalULL"><i class="fa fa-twitter-square"></i></a></li>
                                            <li><a target="_blank" href="http://www.linkedin.com/groups/Universidad-Laguna-2656178"><i class="fa fa-linkedin-square"></i></a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    `
})
export class navbarComponent {
}