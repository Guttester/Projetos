import { Component, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-sidebar-left',
  standalone: false,
  templateUrl: './sidebar-left.component.html',
  styleUrl: './sidebar-left.component.css'
})
export class SidebarLeftComponent {
   @Output() expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isExpanded = true;
  isDisabled = true;
  
  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.expandedChange.emit(this.isExpanded);
  }
}
