import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'grados', pathMatch: 'full' },
      {
        path: 'grados',
        loadChildren: () =>
          import('./features/grado/grado-module').then((m) => m.GradoModule),
      },
      {
        path: 'asignaturas',
        loadChildren: () =>
          import('./features/asignatura/asignatura-module').then(
            (m) => m.AsignaturaModule,
          ),
      },
      {
        path: 'alumnos',
        loadChildren: () =>
          import('./features/alumno/alumno-module').then(
            (m) => m.AlumnoModule,
          ),
      },
      {
        path: 'baterias',
        loadChildren: () =>
          import('./features/pregunta/pregunta-module').then(
            (m) => m.PreguntaModule,
          ),
      },
      {
        path: 'examenes',
        loadChildren: () =>
          import('./features/examen/examen-module').then(
            (m) => m.ExamenModule,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
