import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas-form',
  templateUrl: './preguntas-form.component.html',
  styleUrls: ['./preguntas-form.component.scss']
})

export class PreguntasFormComponent implements OnInit {

  public datos: FormGroup;
  public grupos: Array<any> = [];
  public categoria: Array<any> = [];

  constructor(

    public dialogRef: MatDialogRef<PreguntasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public formBuilder: FormBuilder,
    private appService: AppService) {
    this.datos = this.formBuilder.group({
      descripcion: ['', Validators.required],
      responsable: ['', Validators.required],
      referencia: ['', Validators.required],
      periodo: ['', Validators.required],
      codigo: ['', Validators.required],
      idCategoria: [1, Validators.required],
      idEmpresa: [1, Validators.required],
      idGrupo: [1, Validators.required],
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
      const datos = this.data.data;
      this.datos.patchValue({
        ...this.data.data,
        idCategoria: datos.id,
        idEmpresa: 1,
        idGrupo: datos.id
      });
    }
    this.getInfo();
  }


  public getInfo() {
    this.appService.get('gruposPregunta').subscribe(
      (data: any) => {
        console.log(data);
        this.grupos = data;
        this.appService.get('categoriasPregunta').subscribe(
          (data2: any) => {
            this.categoria = data;
            console.log(data2);
          }
        );
      }
    );
  }

  public setCuenta() {
    if (this.datos.valid) {
      return {
        id: this.setId(),
        ...this.datos.value
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
        text: 'Estas seguro de que quiere crear la Pregunta?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.post('preguntas', this.setCuenta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              Swal.fire({
                type: 'success', text: 'la Pregunta #: ' + data.id + 'ha sido Creado!',
                timer: 3000, showConfirmButton: false
              });
              this.close(1);
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
      console.log(this.setCuenta());
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere editar la Pregunta?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('preguntas', this.setCuenta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              Swal.fire({
                type: 'success', text: 'la Pregunta #: ' + data.id + 'ha sido Editada!',
                timer: 3000, showConfirmButton: false
              });
              this.close(1)
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
