import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.scss']
})
export class EmpresaFormComponent implements OnInit {

  public datos: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'entidad', 'nit', 'correo', 'direccion', 'telefonos',
    'departamento', 'ciudad', 'estado'];
  public dataSource: any;
  public itemSelected: any;
  public display = false;

  constructor(

    public dialogRef: MatDialogRef<EmpresaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public formBuilder: FormBuilder,
    private appService: AppService) {
    this.datos = this.formBuilder.group({
      id: [0, Validators.required],
      nombre: ['', Validators.required],
      nit: ['', Validators.required],
      orden: ['', Validators.required],
      licencia: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      logo: ['none.jpg', Validators.required],
      contactoNombre: ['', Validators.required],
      contactoTelefono: ['', Validators.required],
      contactoEmail: ['', Validators.required],
      contactoCargo: ['', Validators.required],
      fkEntidad: ['', Validators.required],
      nombreEntidad: ['', Validators.required],
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
      this.datos.patchValue({
        ...this.data.data,
        fkEntidad: this.data.data.fkEntidad.idEntidad,
        nombreEntidad: this.data.data.fkEntidad.entidad
      });
    }
    this.getEntidadess();
  }

  public getEntidadess() {
    this.appService.openSpinner();
    this.appService.get('entidades').subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.appService.closeSpinner();
      },
      error => { this.appService.closeSpinner(); }
    );
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage() }
  }

  public setCuenta() {
    if (this.datos.valid) {
      return {
        ...this.datos.value
      }
    }
  }

  public crear() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere crear la Empresa?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.post('empresa', this.setCuenta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              Swal.fire({
                type: 'success', text: 'La Empresa '
                + String(data.nombre).toUpperCase() + 'ha sido Creada!',
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

  public editar() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere editar la Empresa?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('empresa', this.setCuenta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              Swal.fire({
                type: 'success', text: 'La Empresa '
                + String(data.nombre).toUpperCase() + 'ha sido Editada!',
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

  public openTable() {
    this.display = true;
  }

  public closeTable() {
    this.display = false;
  }

  public selectEntidad(item: any) {
    this.datos.patchValue({
      fkEntidad: item.idEntidad,
      nombreEntidad: item.entidad
    });
    this.closeTable();
  }

}
