import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { GradoRoutingModule } from './grado-routing-module';
import { GradoListComponent } from './grado-list/grado-list.component';
import { GradoFormComponent } from './grado-form/grado-form.component';

@NgModule({
  declarations: [GradoListComponent, GradoFormComponent],
  imports: [SharedModule, GradoRoutingModule],
})
export class GradoModule {}
