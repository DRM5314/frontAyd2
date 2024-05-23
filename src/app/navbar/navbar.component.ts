import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MenubarModule } from 'primeng/menubar';
import { MenuItemFactory } from './menu-options';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] | undefined ;

  ngOnInit(): void {
    this.items = this.MenuItem;
  }

  MenuItem = [
    {
      label:'Libros',
      icon: 'pi pi-fw pi-user',
      items:[
        {
          label:'Gestion libros',
          routerLink:'/books/list-books'
        },
        {
          label:'Gestion Editoriales',
          routerLink:'/books/list-editorial'
        }
      ]
    },
    {
      label: 'Prestamos',
      icon: 'pi pi-fw pi-user',
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
    }
  ]
}
