import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { IndicadoresVariablesFormComponent } from './indicadores-variables-form/indicadores-variables-form.component';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indicadores-variables',
  templateUrl: './indicadores-variables.component.html',
  styleUrls: ['./indicadores-variables.component.scss']
})

export class IndicadoresVariablesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'nombreVariable', 'nombreGrupo', 'nombreTipo', 'estado'];
  public dataSource: any;
  public itemSelected: any;

  constructor(
    public dialog: MatDialog,
    private appService: AppService) { }

  ngOnInit() {
    this.getIndicadoresVariabless();
  }

  public getIndicadoresVariabless() {
    this.appService.get('indicadorVariables').subscribe(
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
    const dialogRef = this.dialog.open(IndicadoresVariablesFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: '50%', height: 'auto', disableClose: true, backdropClass: 'dark', panelClass: 'box'
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) {this.getIndicadoresVariabless()}});
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
        this.appService.put('indicadorVariables/estado', data).subscribe(
          (data: any) => {
            console.log(data),
              this.appService.closeSpinner();
            Swal.fire({
              type: 'success', timer: 3000,
              text: 'El estado de la Variable ' + String(data.nombreVariable).toUpperCase() + ' ha sido Cambiado', showConfirmButton: false
            });
            this.getIndicadoresVariabless();
          }, error => {
            this.appService.closeSpinner();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

}
