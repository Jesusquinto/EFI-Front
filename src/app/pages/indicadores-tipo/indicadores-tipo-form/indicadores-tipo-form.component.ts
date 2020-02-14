import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-indicadores-tipo-form',
  templateUrl: './indicadores-tipo-form.component.html',
  styleUrls: ['./indicadores-tipo-form.component.scss']
})
export class IndicadoresTipoFormComponent implements OnInit {

  public datos: FormGroup;
  

  constructor(
    public dialogRef: MatDialogRef<IndicadoresTipoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    private appService: AppService) { 
      this.datos = this.formBuilder.group({
        nombreTipo: ['', Validators.required],
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
    if (this.data.tipoForm == 1) {
      console.log(this.data.data);
      this.datos.patchValue({
        nombreTipo: this.data.data.nombreTipo,
        estado: this.data.data.estado
      });
    }
  }

  public setTipo() {
    if (this.datos.valid) {
      const datos = this.datos.value;
      return {
        nombreTipo: datos.nombreTipo,
        estado: datos.estado,
        idTipoIndicador: this.setId(),
        fkEmpresa: 1,
      }
    }
  }

  setId() {
    switch (this.data.tipoForm) {
      case 0:
        return 0;
        break;
      case 1:
        return this.data.data.idTipoIndicador;
      default:
        break;
    }
  }

  public crear() {
    if (this.datos.valid) {
      console.log(this.setTipo());
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere crear el Tipo Indicador?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.post('indicadorTipo', this.setTipo()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              Swal.fire({type: 'success', timer: 3000,
              text: 'El Tipo Indicador ' + String(data.nombreTipo).toUpperCase() + ' ha sido Creado', showConfirmButton: false });
              this.close(1);
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
        text: 'Estas seguro de que quiere editar el Tipo Indicador?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('indicadorTipo', this.setTipo()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              Swal.fire({type: 'success', timer: 3000,
              text: 'El Tipo Indicador ' + String(data.nombreTipo).toUpperCase() + ' ha sido Editado', showConfirmButton: false });
              this.close(1);
            },error => {
              this.appService.closeSpinner();
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      })
    }
  }

  public submit(){
    if(this.datos.valid){
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
