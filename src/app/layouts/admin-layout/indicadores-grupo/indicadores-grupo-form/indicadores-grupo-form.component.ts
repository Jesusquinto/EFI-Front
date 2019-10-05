import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app-service';

@Component({
  selector: 'app-indicadores-grupo-form',
  templateUrl: './indicadores-grupo-form.component.html',
  styleUrls: ['./indicadores-grupo-form.component.scss']
})
export class IndicadoresGrupoFormComponent implements OnInit {

  public datos: FormGroup;

  constructor(

    public dialogRef: MatDialogRef<IndicadoresGrupoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public formBuilder: FormBuilder,
    private appService: AppService) {
    this.datos = this.formBuilder.group({
      codigoBanco: ['', Validators.required],
      codigoCta: ['', Validators.required],
      nombreCuenta: ['', Validators.required],
      tercero: ['', Validators.required],
      tipoCuenta: ['', Validators.required],
      cuentaNro: ['', Validators.required],
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
        codigoBanco: this.data.data.codigoBanco,
        codigoCta: this.data.data.codigoCta,
        nombreCuenta: this.data.data.nombreCuenta,
        tercero: String(this.data.data.tercero),
        tipoCuenta: this.data.data.tipoCuenta,
        cuentaNro: this.data.data.cbancoCuentaPK.cuentaNro
      });
    }
  }

  public setCuenta() {
    if (this.datos.valid) {
      const datos = this.datos.value;
      return {
        "codigoBanco": datos.codigoBanco,
        "codigoCta": datos.codigoCta,
        "nombreCuenta": datos.nombreCuenta,
        "tercero": parseInt(datos.tercero),
        "tipoCuenta": datos.tipoCuenta,
        "cbancoCuentaPK": {
          "codigoEntidad": "1",
          "cuentaNro": datos.cuentaNro
        }
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
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.post('cbancocuenta/new', this.setCuenta()).subscribe(
            (data: any) => {
              console.log(data),
                this.appService.closeSpinner();
              this.close(1)
            }, error => {
              console.log(error)
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
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('cbancocuenta/edit', this.setCuenta()).subscribe(
            (data: any) => {
              console.log(data),
                this.appService.closeSpinner();
              this.close(1)
            }, error => {
              console.log(error),
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
