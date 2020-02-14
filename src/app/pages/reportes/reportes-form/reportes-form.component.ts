import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reportes-form',
  templateUrl: './reportes-form.component.html',
  styleUrls: ['./reportes-form.component.scss'],
  providers: [DatePipe]
})
export class ReportesFormComponent implements OnInit {

  public datos: FormGroup;
  public tipos: Array<any>;
  public id: number;

  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<ReportesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public formBuilder: FormBuilder,
    private appService: AppService) {
    this.datos = this.formBuilder.group({
      idReporte: [0, Validators.required],
      codigoChipReporte: ['', Validators.required],
      tipoReporte: ['', Validators.required],
      nombre: ['', Validators.required],
      orden: [1, Validators.required],
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
    if (this.data.tipoForm === 1) {
      console.log(this.data.data);
      this.datos.patchValue({
        ...this.data.data
      });
    }
  }

  public setReportes() {
    const datos = this.datos.value;
    console.log(datos);
    return {
      codigoChipReporte: datos.codigoChipReporte,
      estado: datos.estado,
      idReporte: datos.idReporte,
      nombre: datos.nombre,
      orden: datos.orden,
      tipoReporte: datos.tipoReporte
    };
  }

  public crear() {
    console.log(...this.datos.value)
    Swal.fire({
      title: 'Advertencia',
      text: 'Estas seguro de que quiere crear el Reporte?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Crear',
      confirmButtonClass: 'btn btn-info',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.appService.openSpinner();
        this.appService.post('reporteschip', this.setReportes()).subscribe(
          (data: any) => {
            console.log(data),
            this.appService.closeSpinner();
            this.close(1);
            Swal.fire({
              type: 'success', text: 'El Reporte ' + data.idReportes + ' Ha sido Creado!',
              timer: 3000, showConfirmButton: false
            });
          }, error => {
            this.appService.closeSpinner();
            Swal.fire({
              type: 'error', text: 'Error al crear reportes!',
              timer: 3000, showConfirmButton: false
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })

  }

  public editar() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere editar El Reporte?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('reporteschip', this.setReportes()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'El Reporte ' + data.idReportes + ' Ha sido Editado!',
                timer: 3000, showConfirmButton: false
              });
            }, error => {
              this.appService.closeSpinner();
              Swal.fire({
                type: 'error', text: 'Error al editar reportes!',
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

  public close(tipo: number): void {
    this.dialogRef.close(tipo);
  }

}
