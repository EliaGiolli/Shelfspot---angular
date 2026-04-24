import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/layouts/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./features/layouts/homepage/homepage').then(m => m.Homepage),
      },
      {
        path: 'contacts',
        loadComponent: () => import('./features/contacts/contacts').then(m => m.Contacts)
      }
    ]
  },
  {
    path: 'books',
    // Qui in futuro aggiungeremo: canActivate: [authGuard]
    loadComponent: () => import('./features/layouts/book-layout/book-layout').then(m => m.BookLayout),
    children: [
      {
        path: 'search',
        loadComponent: () => import('./features/book-search/search-page/search-page').then(m => m.SearchPage)
      },
      {
        path: 'search/:id',
        loadComponent: () => import('./features/book-search/search-modal/search-modal').then(m => m.SearchModal)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./features/favorites/favorite-page/favorite-page').then(m => m.FavoritePage)
      },
      {
        path: 'loans',
        loadComponent: () => import('./features/loans/loans-page/loans-page').then(m => m.LoansPage)
      }
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFound)
  }
];