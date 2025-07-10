import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
//   {
//     path: 'home',
//     component: AppComponent,
//   },
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
