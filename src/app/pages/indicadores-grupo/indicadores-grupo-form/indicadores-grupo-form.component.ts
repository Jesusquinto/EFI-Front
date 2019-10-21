import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-indicadores-grupo-form',
  templateUrl: './indicadores-grupo-form.component.html',
  styleUrls: ['./indicadores-grupo-form.component.scss']
})
export class IndicadoresGrupoFormComponent implements OnInit {

  public datos: FormGroup;
  public tipos: Array<any>;
  public id: number;

  constructor(

    public dialogRef: MatDialogRef<IndicadoresGrupoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public formBuilder: FormBuilder,
    private appService: AppService) {
    this.datos = this.formBuilder.group({
      nombreGrupo: ['', Validators.required],
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
    this.getTipoIndicadores();
    if (this.data.tipoForm === 1) {
      console.log(this.data.data);
      this.datos.patchValue({
        nombreGrupo: this.data.data.nombreGrupo,
        estado: this.data.data.estado
      });
    }
  }

  public getTipoIndicadores() {
    this.appService.get('indicadorTipo').subscribe(
      (data: any) => {
        console.log(data);
        this.tipos = data;
      }
    );
  }

  public setTipo(data: any) {
    this.datos.patchValue({
      nombreGrupo: this.datos.value.nombreGrupo
    });
    this.id = data.idTipoIndicador;
    console.log(data);
    console.log(this.datos.value);
  }

  public setGrupo() {
    const datos = this.datos.value;
    return {
      nombreGrupo: datos.nombreGrupo,
      estado: datos.estado,
      fkEmpresa : 1,
      idGrupo: this.setId(),
      fkTipo: {idTipoIndicador: this.id}
    }
  }

  setId() {
    switch (this.data.tipoForm) {
      case 0:
        return 0;
        break;
      case 1:
        return this.data.data.idGrupo;
        break;
      default:
        break;
    }
  }

  public crear() {
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
        this.appService.post('indicadorGrupo', this.setGrupo()).subscribe(
          (data: any) => {
            console.log(data),
            this.appService.closeSpinner();
            this.close(1);
            Swal.fire({
              type: 'success', text: 'El Grupo ' + String(data.nombreGrupo).toUpperCase() + ' Ha sido Creado!',
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

  public editar() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere editar El Grupo?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('indicadorGrupo', this.setGrupo()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'El Grupo ' + String(data.nombreGrupo).toUpperCase() + ' Ha sido Editado!',
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
