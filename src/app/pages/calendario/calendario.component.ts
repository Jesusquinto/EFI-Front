import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { CalendarioFormComponent } from './calendario-form/calendario-form.component';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})

export class CalendarioComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'codigoChip', 'descripcionChip', 'fechaInicio',
  'fechaFinal', 'oportuno', 'extemporaneo', 'periodo', 'activo'];
  public dataSource: any;
  public itemSelected: any;

  constructor(
    public dialog: MatDialog,
    private appService: AppService) { }

  ngOnInit() {
    this.getCalendarios();
  }

  public getCalendarios() {
    this.appService.get('calendario').subscribe(
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
    const dialogRef = this.dialog.open(CalendarioFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: 'auto', height: 'auto', maxWidth: '70%', minWidth: '35%', disableClose: true, backdropClass: 'dark', panelClass: 'box'
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) {this.getCalendarios()}});
  }

  public setEstado(data: any) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Estas seguro de que quiere CambiaR el estado?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Cambiar',
      confirmButtonClass: 'btn btn-info',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.appService.openSpinner();
        this.appService.put('calendario/estado/', data).subscribe(
          (data: any) => {
            console.log(data),
            this.appService.closeSpinner();
            Swal.fire({
              type: 'success', text: 'El estado del Calendario ' + String(data.descripcionChip).toUpperCase() + ' Ha sido Cambiado!',
              timer: 3000, showConfirmButton: false
            });
            this.getCalendarios();
          }, error => {
            this.appService.closeSpinner();
            Swal.fire({
              type: 'error', text: 'Error al Cambiar el estado!',
              timer: 3000, showConfirmButton: false
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

}
