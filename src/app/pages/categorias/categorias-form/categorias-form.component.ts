import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
  styleUrls: ['./categorias-form.component.scss']
})
export class CategoriasFormComponent implements OnInit {

  public datos: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CategoriasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    private appService: AppService) {
      this.datos = this.formBuilder.group({
        idCategoria: [0, Validators.required],
        categoria: ['', Validators.required],
        descripcionCategoria: ['', Validators.required],
        habitantesInferior: ['', Validators.required],
        habitantesSuperior: ['', Validators.required],
        ingresosCorrientes: ['', Validators.required],
        estado: [0, Validators.required]
      });
    }

    private markFormGroupTouched(formGroup: FormGroup) {
      (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        if (control.controls) {
          this.markFormGroupTouched(control);
        }
      });
    }

    public fieldValidation(datos: FormGroup, name: any) {
      if (datos.get([name]).invalid && datos.get([name]).touched) {
        return true;
      }
    }

  ngOnInit() {
    if (this.data.tipoForm === 1) {
      console.log(this.data.data);
      this.datos.patchValue({
        ...this.data.data
      });
    }
  }

  public setCategoria() {
    if (this.datos.valid) {
      return {
        ...this.datos.value,
        habitantesInferior: parseInt(this.datos.value.habitantesInferior),
        habitantesSuperior: parseInt(this.datos.value.habitantesSuperior),
        ingresosCorrientes: parseInt(this.datos.value.ingresosCorrientes),
      }
    }
  }

  public crear() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere crear la Categoria?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.post('categoria', this.setCategoria()).subscribe(
            (data: any) => {
              this.appService.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'lA Categoria ' + String(data.username).toUpperCase() + ' Ha sido Creada!',
                timer: 3000, showConfirmButton: false
              });
            },error => {
              this.appService.closeSpinner();
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      })
    }
  }

  public editar() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere editar la Categoria?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('categoria', this.setCategoria()).subscribe(
            (data: any) => {
              this.appService.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'La Categoria ' + String(data.username).toUpperCase() + ' Ha sido Editada!',
                timer: 3000, showConfirmButton: false
              });
            },error => {
              this.appService.closeSpinner();
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      })
    }
  }

  public submit() {
    if(this.datos.valid) {
      switch (this.data.tipoForm) {
        case 0:
          this.crear();
          break;
        case 1:
          this.editar();
          break;

        default:
          break;
      }
    }
  }

  public close(tipo: number): void {
    this.dialogRef.close(tipo);
  }

}
