import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import {AuthService} from "../auth/auth.service";
import {JwtService} from "../auth/jwt.service";
import {ChipModule} from "primeng/chip";
import {CommonModule} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone : true,
  imports: [CommonModule, MenubarModule, ChipModule]
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] | undefined ;
  authService: AuthService = inject(AuthService);
  jwtService: JwtService = inject(JwtService);
  userName:string = this.jwtService.getClaim('user');

  ngOnInit(): void {
    this.items = this.MenuItem;
  }

  MenuItem = [
    {
      label:'Libros',
      icon: 'pi pi-fw pi-user',
      visible: this.authService.hasRequiredRol('ADMIN') || this.authService.hasRequiredRol('STUDENT') ,
      items:[
        {
          label:'Listado de libros',
          routerLink:'/books/list-books'
        },
        {
          visible:this.authService.hasRequiredRol('ADMIN'),
          label:'Gestion Editoriales',
          routerLink:'/books/list-editorial'
        }
      ]
    },
    {
      label: 'Prestamos',
      icon: 'pi pi-fw pi-user',
      visible: this.authService.hasRequiredRol('ADMIN'),
      items:[
        {
          label:'Nuevo prestamo',
          routerLink: '/loans/list-loans'
        }
      ]
    },
    {
      label: 'Estudiantes',
      icon: 'pi pi-fw pi-user',
      visible: this.authService.hasRequiredRol('ADMIN'),
      items:[
        {
          label:'Estudiantes',
          routerLink:'/students/list-students'
        },
        {
          label:'Carreras',
          routerLink:'/students/list-careers'
        }
      ]
    },
    {
      label: 'Salir',
      visible: this.authService.hasRequiredRol('ADMIN') || this.authService.hasRequiredRol('STUDENT') ,
      icon: 'pi pi-fw pi-power-off',
      routerLink: '/logout',
    }
  ]
}
