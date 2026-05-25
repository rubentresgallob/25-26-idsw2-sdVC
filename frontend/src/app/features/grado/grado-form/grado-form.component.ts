import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grado } from '../models/grado.model';

export interface GradoFormData {
  grado?: Grado;
}

@Component({
  selector: 'app-grado-form',
  templateUrl: './grado-form.component.html',
  standalone: false,
})
export class GradoFormComponent implements OnInit {
  form: FormGroup;
  esEdicion: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GradoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GradoFormData,
  ) {
    this.esEdicion = !!data?.grado;
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      codigo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data?.grado) {
      this.form.patchValue(this.data.grado);
    }
  }

  guardar(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
