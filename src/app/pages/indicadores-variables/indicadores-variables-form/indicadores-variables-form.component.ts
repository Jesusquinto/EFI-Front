import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-indicadores-variables-form',
  templateUrl: './indicadores-variables-form.component.html',
  styleUrls: ['./indicadores-variables-form.component.scss']
})
export class IndicadoresVariablesFormComponent implements OnInit {

  public datos: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'nombreGrupo', 'nombreTipo', 'estado'];
  public dataSource: any;
  public display = false;

  constructor(

    public dialogRef: MatDialogRef<IndicadoresVariablesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public formBuilder: FormBuilder,
    private appService: AppService) {
    this.datos = this.formBuilder.group({
      codigoFut: ['', Validators.required],
      estado: [1, Validators.required],
      fkGrupo: ['', Validators.required],
      nombreGrupo: ['', Validators.required],
      nombreVariable: ['', Validators.required],
      css: ['', Validators.required]
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
        fkGrupo: this.data.data.fkGrupo.idGrupo,
        nombreVariable: this.data.data.nombreVariable,
        nombreGrupo: this.data.data.fkGrupo.nombreGrupo
      });
    }
    console.log("INDICADOR: ",this.datos.value);

    this.getIndicadoresGrupos();
  }

  public getIndicadoresGrupos() {
    this.appService.get('indicadorGrupo/estado/0').subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => { }
    );
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage() }
  }

  public setCuenta() {
    if (this.datos.valid) {
      return {
        ...this.datos.value,
        fkEmpresa: 1,
        idVariable: this.setId()
      }
    }
  }

  public setId() {
    switch (this.data.tipoForm) {
      case 0:
        return 0;
        break;
      case 1:
        return this.data.data.idVariable;
        break;
      default:
        break;
    }
  }

  public crear() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere crear la Variable?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.post('indicadorVariables', this.setCuenta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              Swal.fire({
               type: 'success', text: 'La Variable '
               + String(data.nombreVariable).toUpperCase() + 'ha sido Creada!',
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
        text: 'Estas seguro de que quiere editar la Cuenta?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('indicadorVariables', this.setCuenta()).subscribe(
            (data: any) => {
              console.log(data),
              this.appService.closeSpinner();
              Swal.fire({
                type: 'success', text: 'La Variable '
                + String(data.nombreVariable).toUpperCase() + 'ha sido Editada!',
                showConfirmButton: false, timer: 3000
               });
              this.close(1)
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

  public selectGrupo(item: any) {
     this.datos.patchValue({
       fkGrupo: item.idGrupo,
       nombreGrupo: item.nombreGrupo
     });
     this.closeTable();
  }

}
