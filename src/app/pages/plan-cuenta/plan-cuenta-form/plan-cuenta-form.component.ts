import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-plan-cuenta-form',
  templateUrl: './plan-cuenta-form.component.html',
  styleUrls: ['./plan-cuenta-form.component.scss']
})

export class PlanCuentaFormComponent implements OnInit {

  public datos: FormGroup;

  constructor(

    public dialogRef: MatDialogRef<PlanCuentaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public formBuilder: FormBuilder,
    private appService: AppService) {
    this.datos = this.formBuilder.group({
      idCuenta: ['', Validators.required],
      tipoPlan: ['', Validators.required],
      orden: ['', Validators.required],
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      nivel: ['', Validators.required],
      entidad: ['', Validators.required],
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

  public setCuenta() {
    if (this.datos.valid) {
      return {
        ...this.datos.value,
        orden: 11
      }
    }
  }

  public crear() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere crear la Cuenta?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.post('planCuentas', this.setCuenta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              Swal.fire({
                type: 'success', text: 'La Cuenta #:' + data.idCuenta + 'ha sido Creada!',
                showConfirmButton: false, timer: 3000
               });
              this.close(1);
            }, error => {
              this.appService.closeSpinner()
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
        text: 'Estas seguro de que quiere editar la Cuenta?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('planCuentas', this.setCuenta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              Swal.fire({
                type: 'success', text: 'La Cuenta #:' + data.idCuenta + 'ha sido Editada!',
                showConfirmButton: false, timer: 3000
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
