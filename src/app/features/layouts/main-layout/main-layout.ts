import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet],
  template: `
    <main class="min-h-2/3 w-full max-w-300 mx-auto px-6 py-8 ">
      <router-outlet />
    </main>
  `,
  styleUrl: './main-layout.css',
})
export class MainLayout {}
