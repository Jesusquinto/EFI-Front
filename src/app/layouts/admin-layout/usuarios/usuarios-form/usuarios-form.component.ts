import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';

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
        id: this.getId(),
        username: datos.username,
        nombre: datos.nombre,
        apellido: datos.apellido,
        documento: datos.documento,
        email: datos.email,
        enabled: datos.enabled,
        password: this.getPaswword(),
        roles: this.getRole()
      }
    }
  }

  public getId() {
    switch (this.data.tipoForm) {
      case 0:
        return 0;
        break;
      case 1:
        return this.data.data.id;
      default:
        break;
    }
  };

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

  public getPaswword(){
    switch (this.data.tipoForm) {
      case 0:
        return this.datos.value.documento;
        break;
      case 1:
        return '$2a$10$xUQQEHf585VH0qxePGPhTu8u8BO4t1IKDMePJu2T0ChI7QZuGnHCq';
        break;
      default:
        break;
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
          this.appService.post('usuarios', this.setUsuario()).subscribe(
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
