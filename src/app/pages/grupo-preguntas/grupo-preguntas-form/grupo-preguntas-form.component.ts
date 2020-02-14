import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-grupo-preguntas-form',
  templateUrl: './grupo-preguntas-form.component.html',
  styleUrls: ['./grupo-preguntas-form.component.scss']
})
export class GrupoPreguntasFormComponent implements OnInit {

  public datos: FormGroup;

  constructor(

    public dialogRef: MatDialogRef<GrupoPreguntasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public formBuilder: FormBuilder,
    private appService: AppService) {
    this.datos = this.formBuilder.group({
      nombre: ['', Validators.required],
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
    if (this.data.tipoForm == 1) {
      console.log(this.data.data);
      this.datos.patchValue({
        nombre: this.data.data.nombre
      });
    }
  }

  public setGrupoPregunta() {
    if (this.datos.valid) {
      const datos = this.datos.value;
      return {
        nombre: datos.nombre,
        id : this.setId()
      }
    }
  }

  public setId() {
    switch (this.data.tipoForm) {
      case 0:
        return 0;
        break;
      case 1:
        return this.data.data.id;
        break;
      default:
        break;
    }
  }

  public crear() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere crear el Grupo?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.post('gruposPregunta', this.setGrupoPregunta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'El Grupo ' + String(data.nombre).toUpperCase() + ' Ha sido Creado!',
                timer: 3000, showConfirmButton: false
              });
            }, error => {
              this.appService.closeSpinner();
              Swal.fire({
                type: 'error', text: 'Error al Realizar la Peticion!',
                timer: 3000, showConfirmButton: false
              });
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
        text: 'Estas seguro de que quiere editar la Grupo Pregunta?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('gruposPregunta', this.setGrupoPregunta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'El Grupo ' + String(data.nombre).toUpperCase() + ' Ha sido Editado!',
                timer: 3000, showConfirmButton: false
              });
            }, error => {
              this.appService.closeSpinner();
              Swal.fire({
                type: 'error', text: 'Error al Realizar la Peticion!',
                timer: 3000, showConfirmButton: false
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      })
    }
  }

  public submit() {
    if (this.datos.valid) {
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
