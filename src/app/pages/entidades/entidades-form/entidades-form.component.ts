import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-entidades-form',
  templateUrl: './entidades-form.component.html',
  styleUrls: ['./entidades-form.component.scss']
})
export class EntidadesFormComponent implements OnInit {

  public datos: FormGroup;
  public categorias: Array<any> = [];

  constructor(

    public dialogRef: MatDialogRef<EntidadesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public formBuilder: FormBuilder,
    private appService: AppService) {
    this.datos = this.formBuilder.group({
      idEntidad: [0, Validators.required],
      entidad: ['', Validators.required],
      nit: ['', Validators.required],
      correo: ['', Validators.required],
      direccion: ['', Validators.required],
      telefonos: ['', Validators.required],
      sector: ['', Validators.required],
      naturaleza: ['', Validators.required],
      tipo: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      fax: ['', Validators.required],
      paginaWeb: ['', Validators.required],
      codigoChip: ['', Validators.required],
      codigoDane: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      fkCategoria: ['', Validators.required],
      estado: [0, Validators.required],
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
    this.getCategorias();
  }

  public getCategorias() {
    this.appService.get('categoria/estado/0').subscribe(
      (data: any) => {
        console.log(data);
        this.categorias = data;
      }
    );
  }

  public setCuenta() {
    if (this.datos.valid) {
      return {
        ...this.datos.value,
        codigoChip: parseInt(this.datos.value.codigoChip),
        codigoPostal: parseInt(this.datos.value.codigoPostal),
      }
    }
  }

  public crear() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere crear la Entidad?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.post('entidades', this.setCuenta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              Swal.fire({
                type: 'success', text: 'La Entidad ' + String(data.entidad).toUpperCase() + ' Ha sido Creada!',
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
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere editar la Entidad?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('entidades', this.setCuenta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              Swal.fire({
                type: 'success', text: 'La Entidad ' + String(data.entidad).toUpperCase() + ' Ha sido Editada!',
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
