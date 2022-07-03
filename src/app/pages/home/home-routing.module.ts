import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // children: [
    //   {
    //     path: 'menu',
    //     component: HomeComponent,
    //   },
    //   {
    //     path: 'location',
    //     component: HomeComponent,
    //   },
    //   {
    //     path: 'about',
    //     component: HomeComponent,
    //   },
    //   {
    //     path: 'contact',
    //     component: HomeComponent,
    //   },
    //   {
    //     path: 'service',
    //     component: HomeComponent,
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
