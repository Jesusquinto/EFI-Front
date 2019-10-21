import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/services/app.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-encuesta-form',
  templateUrl: './encuesta-form.component.html',
  styleUrls: ['./encuesta-form.component.scss']
})

export class EncuestaFormComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'responsable', 'descripcion', 'referencia', 'periodo', 'grupo', 'categoria'];
  public dataSource: any;
  public datos: FormGroup;
  public preguntas: Array<any> = [];
  public preguntasSelected: Array<any> = [];
  public detalles: Array<any> = [];
  public display = false;
  public desc1: number;
  public desc2: number;
  public desc3: number;
  public usuario: any;
  public count = 0;

  constructor(

    public dialogRef: MatDialogRef<EncuestaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private appService: AppService) {
    this.datos = this.formBuilder.group({
      nombre: ['', Validators.required],
      estado: [0, Validators.required],
      usuario: ['', Validators.required],
      idUsuario: ['', Validators.required],
      empresa: ['', Validators.required],
      idEmpresa: ['', Validators.required],
    });
    this.usuario = this.auth.obtenerDatosUser();
    this.appService.get('usuarios/' + this.usuario.id).subscribe((data: any) => {
      this.usuario = data;
      console.log(data);
      this.datos.patchValue({
        usuario: data.nombre,
        idUsuario: data.id,
        empresa: data.idEmpresa.nombre,
        idEmpresa: data.idEmpresa.id
      });
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
    this.getPreguntas();
    if (this.data.tipoForm === 1) {
      console.log(this.data.data);
      this.datos.patchValue({
        codigoBanco: this.data.data.nombre,
        estado: this.data.data.estado
      });
    }
  }

  public getPreguntas() {
    this.appService.openSpinner();
    this.appService.get('preguntas').subscribe(
      (data: any) => {
        console.log(data);
        this.preguntas = data;
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.appService.closeSpinner();
      }
    );
  }

  public seleccionarPregunta(item: any) {
    this.preguntasSelected.push(item);

/*     for (let index = 0; index < this.preguntasSelected.length; index++) {
      const l = this.preguntasSelected[index];
      console.log(l)
      if (l.id === item.id) {
        pass = true;
        break;
      }
    }

    if (this.preguntasSelected.length > 0) {
        if (pass === true) {
          Swal.fire({
            type: 'warning',
            text: 'la pregunta #: ' + item.id + ' ya fue seleccionada',
            showConfirmButton: false,
            timer: 3000
          });
          pass = false;
      }
    } else { this.preguntasSelected.push(item); console.log(this.preguntasSelected); } */
  }

  public deletePregunta(index) {
    this.preguntasSelected.splice(index, 1);
  }

  setId() {
    switch (this.data.tipoForm) {
      case 0:
        return 0;
        break;
      case 1:
        return this.data.data.id;
        break;
      default:
        break;
    }
  }

  public setEncuesta() {
    if (this.datos.valid) {
      const date = new Date();
      const datos = this.datos.value;
      return {
        id: this.setId(),
        nombre: datos.nombre,
        estado: datos.estado,
        idEmpresa: { id: datos.idEmpresa },
        idUsuario: { id: datos.idUsuario },
        fecha: date
      }
    }
  }

  public setDetalle(idEncuesta: number, idPregunta: number) {
    return {
      id: 0,
      requerido: 0,
      idEncuesta: { id: idEncuesta },
      idPregunta: { id: idPregunta },
      estado: 0
    }
  }

  public crearDetalle(idEncuesta: number, idPregunta: number) {
    var estado = false;
    this.appService.post('encuestaDetalle', this.setDetalle(idEncuesta, idPregunta)).subscribe(
      (data: any) => {
        console.log(data);
        estado = true;
        this.count = this.count + 1;
        console.log(estado, this.count);
        if (this.count === this.preguntasSelected.length) {
          this.close(1);
          this.appService.closeSpinner();
          this.count = 0;
          Swal.fire({
            type: 'success', text: 'La Encuesta' + String(data.nombre).toUpperCase() + ' Ha sido Creada!',
            timer: 3000, showConfirmButton: false
          });
        }
      }
    );
  }

  public crearDetallePreguntas(idEncuesta: number) {
    for (let index = 0; index < this.preguntasSelected.length; index++) {
      const item = this.preguntasSelected[index];
      this.crearDetalle(idEncuesta, item[0]);
    }
  }

  public crear() {
    if (this.datos.valid) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Estas seguro de que quiere crear la Encuesta?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Crear',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.post('encuestas', this.setEncuesta()).subscribe(
            (data: any) => {
              console.log(data),
                this.crearDetallePreguntas(data.id);
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
        text: 'Estas seguro de que quiere editar la Encuesta?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Editar',
        confirmButtonClass: 'btn btn-info',
        cancelButtonText: 'No, Cancelar'
      }).then((result) => {
        if (result.value) {
          this.appService.openSpinner();
          this.appService.put('encuestas', this.setEncuesta()).subscribe(
            (data: any) => {
              this.appService.closeSpinner();
              this.close(1);
              Swal.fire({
                type: 'success', text: 'La Encuesta' + String(data.nombre).toUpperCase() + ' Ha sido Editada!',
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

  mouseEnter(e) { this.desc1 = e.id; }

  mouseLeave(e) { this.desc1 = 0; }

  mouseEnter2(e) { this.desc2 = e.id; }

  mouseLeave2(e) { this.desc2 = 0; }

  mouseEnter3(e) { this.desc3 = e.id; }

  mouseLeave3(e) { this.desc3 = 0; }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage() }
  }

  public openModal() { this.display = true; }

  public closeModal() { this.display = false; }

  public close(tipo: number): void {
    this.dialogRef.close(tipo);
  }

}
