import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { IndicadoresGrupoFormComponent } from './indicadores-grupo-form/indicadores-grupo-form.component';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indicadores-grupo',
  templateUrl: './indicadores-grupo.component.html',
  styleUrls: ['./indicadores-grupo.component.scss']
})

export class IndicadoresGrupoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'nombreGrupo', 'nombreTipo', 'estado'];
  public dataSource: any;
  public itemSelected: any;

  constructor(
    public dialog: MatDialog,
    private appService: AppService) { }

  ngOnInit() {
    this.getIndicadoresGrupos();
  }

  public getIndicadoresGrupos() {
    this.appService.get('indicadorGrupo').subscribe(
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
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage()}
  }

  public nuevo() { this.itemSelected = null; this.openForm(0)}

  public editar(item: any) { this.itemSelected = item;this.openForm(1)}

  public openForm(tipoForm: number) {
    const dialogRef = this.dialog.open(IndicadoresGrupoFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: 'auto', height: 'auto', minWidth: '35%', disableClose: true, backdropClass: 'dark', panelClass: 'box'
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) {this.getIndicadoresGrupos()}});
  }

  public setEstado(data: any) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Estas seguro de que quiere Cambiar El Grupo?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Cambiar',
      confirmButtonClass: 'btn btn-info',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.appService.openSpinner();
        this.appService.put('indicadorGrupo/estado/', data).subscribe(
          (data: any) => {
            console.log(data),
            this.appService.closeSpinner();
            Swal.fire({
              type: 'success', text: 'El estado del Grupo ' + String(data.nombreGrupo).toUpperCase() + ' Ha sido Cambiado!',
              timer: 3000, showConfirmButton: false
            });
            this.getIndicadoresGrupos();
          }, error => {
            this.appService.closeSpinner();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

}
