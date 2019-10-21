import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit {

  public datos: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UsuariosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    private appService: AppService) { 
      this.datos = this.formBuilder.group({
        id: [0, Validators.required],
        username: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        documento: ['', Validators.required],
        email: ['', Validators.required],
        enabled: [true, Validators.required]
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
        username: this.data.data.username,
        nombre: this.data.data.nombre,
        apellido: this.data.data.apellido,
        documento: this.data.data.documento,
        email: this.data.data.email,
        enabled: this.data.data.enabled
      });
    }
  }

  public setUsuario() {
    if (this.datos.valid) {
      const datos = this.datos.value;
      return {
        ...this.datos.value,
        password: this.getPaswword(),
        roles: this.getRole(),
        idEmpresa: 1
      }
    }
  }


  public getRole() {
    switch (this.data.tipoForm) {
      case 0:
        return [{nombre: 'ROLE_USER', id: 2}];
        break;
      case 1:
        return this.data.data.roles;
      default:
        break;
    }
  }

  public getPaswword() {
    switch (this.data.tipoForm) {
      case 0:
        return this.datos.value.documento;
        break;
      case 1:
        return this.data.data.password;
        break;
      default:
        break;
    }
  }

  public crear() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere crear el Usuario?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.post('usuarios', this.setUsuario()).subscribe(
            (data: any) => {
              this.appService.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'El Usuario ' + String(data.username).toUpperCase() + ' Ha sido Creado!',
                timer: 3000, showConfirmButton: false
              });
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
        text: 'Estas seguro de que quiere editar el Usuario?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('usuarios',this.setUsuario()).subscribe(
            (data: any) => {
              this.appService.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'El Usuario ' + String(data.username).toUpperCase() + ' Ha sido Editado!',
                timer: 3000, showConfirmButton: false
              });
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
