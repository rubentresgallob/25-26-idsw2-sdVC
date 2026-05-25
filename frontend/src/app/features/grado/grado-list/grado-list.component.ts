import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GradoService } from '../services/grado.service';
import { GradoFormComponent } from '../grado-form/grado-form.component';
import { Grado } from '../models/grado.model';

@Component({
  selector: 'app-grado-list',
  templateUrl: './grado-list.component.html',
  styleUrl: './grado-list.component.scss',
  standalone: false,
})
export class GradoListComponent implements OnInit {
  grados: Grado[] = [];
  columnas = ['codigo', 'titulo', 'acciones'];
  cargando = false;

  constructor(
    private gradoService: GradoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.gradoService.getAll().subscribe({
      next: (data) => {
        this.grados = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.snackBar.open('Error al cargar los grados', 'Cerrar', { duration: 3000 });
      },
    });
  }

  abrirFormulario(grado?: Grado): void {
    const ref = this.dialog.open(GradoFormComponent, {
      width: '480px',
      data: { grado },
    });

    ref.afterClosed().subscribe((resultado) => {
      if (!resultado) return;

      const op$ = grado
        ? this.gradoService.actualizar(grado.id, resultado)
        : this.gradoService.crear(resultado);

      op$.subscribe({
        next: () => {
          this.snackBar.open(
            grado ? 'Grado actualizado' : 'Grado creado',
            'Cerrar',
            { duration: 2500 },
          );
          this.cargar();
        },
        error: () =>
          this.snackBar.open('Error al guardar el grado', 'Cerrar', { duration: 3000 }),
      });
    });
  }

  eliminar(grado: Grado): void {
    if (!confirm(`¿Eliminar el grado "${grado.titulo}"?`)) return;

    this.gradoService.eliminar(grado.id).subscribe({
      next: () => {
        this.snackBar.open('Grado eliminado', 'Cerrar', { duration: 2500 });
        this.cargar();
      },
      error: () =>
        this.snackBar.open('Error al eliminar el grado', 'Cerrar', { duration: 3000 }),
    });
  }
}
