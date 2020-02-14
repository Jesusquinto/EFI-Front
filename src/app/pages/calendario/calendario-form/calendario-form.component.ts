import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendario-form',
  templateUrl: './calendario-form.component.html',
  styleUrls: ['./calendario-form.component.scss'],
  providers: [DatePipe]
})
export class CalendarioFormComponent implements OnInit {

  public datos: FormGroup;
  public tipos: Array<any>;
  public id: number;

  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<CalendarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public formBuilder: FormBuilder,
    private appService: AppService) {
    this.datos = this.formBuilder.group({
      idCalendario: [0, Validators.required],
      codigoChip: ['', Validators.required],
      descripcionChip: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      extemporaneo: ['', Validators.required],
      oportuno: ['', Validators.required],
      periodo: ['', Validators.required],
      activo: [1, Validators.required]
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

  public setCalendario() {
    const datos = this.datos.value;
    return {
      ...this.datos.value,
      fechaInicio: this.datePipe.transform(datos.fechaInicio, 'yyyy-MM-dd'),
      fechaFinal: this.datePipe.transform(datos.fechaFinal, 'yyyy-MM-dd'),
      extemporaneo: this.datePipe.transform(datos.extemporaneo, 'yyyy-MM-dd')
    };
  }

  public crear() {
    Swal.fire({
      title: 'Advertencia',
      text: 'Estas seguro de que quiere crear el Calendario?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Crear',
      confirmButtonClass: 'btn btn-info',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.appService.openSpinner();
        this.appService.post('calendario', this.setCalendario()).subscribe(
          (data: any) => {
            console.log(data),
            this.appService.closeSpinner();
            this.close(1);
            Swal.fire({
              type: 'success', text: 'El Calendario ' + data.idCalendario + ' Ha sido Creado!',
              timer: 3000, showConfirmButton: false
            });
          }, error => {
            this.appService.closeSpinner();
            Swal.fire({
              type: 'error', text: 'Error al crear calendario!',
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
        text: 'Estas seguro de que quiere editar El Calendario?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('calendario', this.setCalendario()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'El Calendario ' + data.idCalendario + ' Ha sido Editado!',
                timer: 3000, showConfirmButton: false
              });
            }, error => {
              this.appService.closeSpinner();
              Swal.fire({
                type: 'error', text: 'Error al editar calendario!',
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
