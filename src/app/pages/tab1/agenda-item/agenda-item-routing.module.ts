import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaItemPage } from './agenda-item.page';

const routes: Routes = [
  {
    path: '',
    component: AgendaItemPage,
    title: 'cool item'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaItemPageRoutingModule {}
