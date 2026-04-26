import { Component } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-not-found',
  imports: [IconComponent, Button],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
