import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-encuesta-form',
  templateUrl: './encuesta-form.component.html',
  styleUrls: ['./encuesta-form.component.scss']
})
export class EncuestaFormComponent implements OnInit {

  public datos: FormGroup;
  public preguntas: Array<any> = [];
  public preguntasSelected: Array<any> = [];

  constructor(

    public dialogRef: MatDialogRef<EncuestaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public formBuilder: FormBuilder,
    private appService: AppService) {
    this.datos = this.formBuilder.group({
      nombre: ['', Validators.required],
      estado: [1, Validators.required]
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
    this.getPreguntas();
    if (this.data.tipoForm === 1) {
      console.log(this.data.data);
      this.datos.patchValue({
        codigoBanco: this.data.data.nombre,
        estado: this.data.data.estado
      });
    }
  }

  public getPreguntas() {
    this.appService.get('preguntas/native').subscribe(
      (data: any) => {
        console.log(data);
        this.preguntas = data;
      }
    );
  }

  public seleccionarPregunta(item: any) {
    this.preguntas.splice(item.index, 1);
    this.preguntasSelected.push(item.data);
  }

  public setEncuesta() {
    if (this.datos.valid) {
      const date = new Date();
      const datos = this.datos.value;
      return {
        id: this.setId(),
        nombre: datos.nombre,
        estado: datos.estado,
        idEmpresa: {id: 1},
        idUsuario: {id: 8},
        fecha: date
      }
    }
  }

  setId() {
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
        text: 'Estas seguro de que quiere crear la Encuesta?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.post('encuestas', this.setEncuesta()).subscribe(
            (data: any) => {
              console.log(data),
              this.close(1);
              this.appService.closeSpinner();
              Swal.fire({
                type: 'success', text: 'La Encuesta' + String(data.nombre).toUpperCase() + ' Ha sido Creada!',
                timer: 3000, showConfirmButton: false
              });
            }, error => {
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
        text: 'Estas seguro de que quiere editar la Encuesta?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('encuestas', this.setEncuesta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'La Encuesta' + String(data.nombre).toUpperCase() + ' Ha sido Editada!',
                timer: 3000, showConfirmButton: false
              });
            }, error => {
              this.appService.closeSpinner();
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
