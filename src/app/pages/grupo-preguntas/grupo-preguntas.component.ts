import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { AppService } from 'src/app/services/app.service';
import { GrupoPreguntasFormComponent } from './grupo-preguntas-form/grupo-preguntas-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupo-preguntas',
  templateUrl: './grupo-preguntas.component.html',
  styleUrls: ['./grupo-preguntas.component.scss']
})

export class GrupoPreguntasComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'nombre'];
  public dataSource: any;
  public itemSelected: any;

  constructor(
    public dialog: MatDialog,
    private appService: AppService) { }

  ngOnInit() {
    this.getGrupoPreguntass();
  }

  public getGrupoPreguntass() {
    this.appService.openSpinner();
    this.appService.get('gruposPregunta').subscribe(
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
    const dialogRef = this.dialog.open(GrupoPreguntasFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: 'auto', height: 'auto', minWidth: '40%', disableClose: true, backdropClass: 'dark',
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) { this.getGrupoPreguntass() } });
  }

  

  public update(data: any) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Estas seguro de que quiere editar la Grupo Pregunta?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Editar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.appService.openSpinner();
        this.appService.put('gruposPregunta', data).subscribe(
          (data: any) => {
            console.log(data),
            this.appService.closeSpinner();
            Swal.fire({
              type: 'success', text: 'El Grupo ' + String(data.nombre).toUpperCase() + ' Ha sido Editado!',
              timer: 3000, showConfirmButton: false
            });
            this.getGrupoPreguntass();
          }, error => {
            this.appService.closeSpinner();
            Swal.fire({
              type: 'error', text: 'Error al Realizar la Peticion!',
              timer: 3000, showConfirmButton: false
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

}