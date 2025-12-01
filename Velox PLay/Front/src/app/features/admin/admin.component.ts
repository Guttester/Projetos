import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isSidebarExpanded = true;
  isModalOpen = false;
  
   onSidebarToggle(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }

  openModal(){ this.isModalOpen = true; }
}