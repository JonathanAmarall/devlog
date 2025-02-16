import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

interface MenuButton {
  icon?: string;
  title: string;
  enabled: boolean;
  action: () => any;
}
@Component({
  selector: 'app-action-button',
  imports: [MatMenuModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css'
})
export class ActionButtonComponent {
  @Input() buttons: MenuButton[] = [{
    title: "Ver",
    enabled: true,
    action: () => alert('oi')
  }];
}
