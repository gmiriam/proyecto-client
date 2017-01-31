import {Component, Input} from '@angular/core';

@Component({
  selector: 'sidebar',
  template: `    
     <nav id="sidebar" class="CustomScrollbar">
        <div class="CustomScrollBox" tabindex="0" style="max-height: none;">
            <div  class="mCSB_container" style="position:relative; top:0; left:0;" >
                <ul class="pws_side">
                    <li>
                        <span>Usuarios/span>
                        <ul>
                            <li> <a routerLink="/teachers" routerLinkActive="active"> Ver Profesores </a></li>
                            <li> <a routerLink="/students" routerLinkActive="active"> Ver Alumnos </a></li>
                            <li> <a routerLink="/admins" routerLinkActive="active"> Ver Administradores </a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>  
    `,
    styleUrls: [ '../../src/app/ts/Bars/sidebar.css' ]
})
export class SideBarComponent {
}