import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([])],
})
export class AsignaturaModule {}
