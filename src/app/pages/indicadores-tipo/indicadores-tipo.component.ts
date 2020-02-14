import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { IndicadoresTipoFormComponent } from './indicadores-tipo-form/indicadores-tipo-form.component';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indicadores-tipo',
  templateUrl: './indicadores-tipo.component.html',
  styleUrls: ['./indicadores-tipo.component.scss']
})

export class IndicadoresTipoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'nombreTipo', 'estado'];
  public dataSource: any;
  public itemSelected: any;

  constructor(
    public dialog: MatDialog,
    private appService: AppService) { }

  ngOnInit() {
    this.getEmpresas();
  }

  public getEmpresas() {
    this.appService.get('indicadorTipo').subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.appService.closeSpinner();
      },
      error => {
        this.appService.closeSpinner();
      }
    );
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage() }
  }

  public nuevo() { this.itemSelected = null; this.openForm(0) }

  public editar(item: any) { this.itemSelected = item; this.openForm(1) }

  public openForm(tipoForm: number) {
    const dialogRef = this.dialog.open(IndicadoresTipoFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: 'auto', height: 'auto', minWidth: '30%', disableClose: true, backdropClass: 'dark', panelClass: 'box'
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) { this.getEmpresas() } });
  }


  public setEstado(data: any) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Estas seguro de que quiere Cambiar el estado?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Cambiar',
      confirmButtonClass: 'btn btn-info',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.appService.openSpinner();
        this.appService.put('indicadorTipo/estado', data).subscribe(
          (data: any) => {
            console.log(data),
              this.appService.closeSpinner();
            Swal.fire({
              type: 'success', timer: 3000,
              text: 'El estado del Tipo Indicador ' + String(data.nombreTipo).toUpperCase() + ' ha sido Cambiado', showConfirmButton: false
            });
            this.getEmpresas();
          }, error => {
            this.appService.closeSpinner();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

}
