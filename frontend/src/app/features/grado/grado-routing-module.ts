import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradoListComponent } from './grado-list/grado-list.component';

const routes: Routes = [{ path: '', component: GradoListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GradoRoutingModule {}
