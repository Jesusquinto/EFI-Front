import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { AppService } from 'src/app/services/app.service';
import { EntidadesFormComponent } from './entidades-form/entidades-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class EntidadesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'entidad', 'nit', 'correo', 'direccion', 'telefonos', 'sector', 'naturaleza', 'tipo',
    'departamento', 'ciudad', 'estado'];
  public dataSource: any;
  public itemSelected: any;

  constructor(
    public dialog: MatDialog,
    private appService: AppService) { }

  ngOnInit() {
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

  public nuevo() { this.itemSelected = null; this.openForm(0) }

  public editar(item: any) { this.itemSelected = item; this.openForm(1) }

  public openForm(tipoForm: number) {
    const dialogRef = this.dialog.open(EntidadesFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: 'auto', maxWidth: '80%', height: 'auto', maxHeight: '80%',
      disableClose: true, backdropClass: 'dark', panelClass: 'box'
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) { this.getEntidadess() } });
  }

  public setEstado(data: any) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Estas seguro de que quiere cambiar el estado?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Crear',
      confirmButtonClass: 'btn btn-info',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.appService.openSpinner();
        this.appService.put('entidades/estado', data).subscribe(
          (r: any) => {
            console.log(r),
              this.appService.closeSpinner();
            Swal.fire({
              type: 'success',
              text: 'el estado de ' + String(data.entidad).toUpperCase() + ' Ha sido Cambiado!',
              timer: 3000, showConfirmButton: false
            });
            this.getEntidadess();
          }, error => {
            this.appService.closeSpinner();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

}
