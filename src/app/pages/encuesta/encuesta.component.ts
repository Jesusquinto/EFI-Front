import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { AppService } from 'src/app/services/app.service';
import { EncuestaFormComponent } from './encuesta-form/encuesta-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})

export class EncuestaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'nombre', 'fecha', 'empresa', 'estado'];
  public dataSource: any;
  public itemSelected: any;

  constructor(
    public dialog: MatDialog,
    private appService: AppService) { }

  ngOnInit() {
    this.getEncuestas();
  }

  public getEncuestas() {
    this.appService.openSpinner();
    this.appService.get('encuestas').subscribe(
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
    const dialogRef = this.dialog.open(EncuestaFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: '80%', height: 'auto', minWidth: '90%', maxWidth: '50%',
      maxHeight: '90%', disableClose: true, backdropClass: 'dark', panelClass: 'box'
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) { this.getEncuestas() } });
  }

  public setEstado(data: any) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Estas seguro de que quiere Cambiar el Estado?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Cambiar',
      confirmButtonClass: 'btn btn-info',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.appService.openSpinner();
        this.appService.put('encuestas/estado', data).subscribe(
          (data: any) => {
            console.log(data),
            this.appService.closeSpinner();
            Swal.fire({
              type: 'success', text: 'el estado de La Encuesta' + String(data.nombre).toUpperCase() + ' Ha sido Cambiado!',
              timer: 3000, showConfirmButton: false
            });
            this.getEncuestas();
          }, error => {
            this.appService.closeSpinner();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

}
