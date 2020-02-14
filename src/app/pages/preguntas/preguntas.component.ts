import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { AppService } from 'src/app/services/app.service';
import { PreguntasFormComponent } from './preguntas-form/preguntas-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})

export class PreguntasComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns: string[] = [ 'acciones','responsable', 'descripcion', 'referencia', 'periodo', 'grupo', 'categoria', 'estado'];
  public dataSource: any;
  public itemSelected: any;
  public desc1: number;
  public desc2: number;
  public desc3: number;

  constructor(
    public dialog: MatDialog,
    private appService: AppService) { }

  ngOnInit() {
    this.getPreguntass();
  }

  public getPreguntass() {
    this.appService.openSpinner();
    this.appService.get('preguntas').subscribe(
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

  mouseEnter(e) {
    this.desc1 = e.id;
  }

  mouseLeave(e){
    this.desc1 = 0;
  }

  mouseEnter2(e) {
    this.desc2 = e.id;
  }

  mouseLeave2(e){
    this.desc2 = 0;
  }

  mouseEnter3(e) {
    this.desc3 = e.id;
  }

  mouseLeave3(e){
    this.desc3 = 0;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage()}
  }

  public nuevo() { this.itemSelected = null; this.openForm(0)}

  public editar(item: any) { this.itemSelected = item;this.openForm(1)}

  public openForm(tipoForm: number) {
    const dialogRef = this.dialog.open(PreguntasFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: '90%', height: '80%', disableClose: true, backdropClass: 'dark', panelClass: 'box'
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) {this.getPreguntass()}});
  }

  public setEstado(data: any) {
    Swal.fire({
      title: 'Advertencia',
      text: 'Estas seguro de que quiere cambiar el estado?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Editar',
      confirmButtonClass: 'btn btn-info',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.appService.openSpinner();
        this.appService.put('preguntas/estado', data).subscribe(
          (data: any) => {
            this.appService.closeSpinner();
            Swal.fire({
              type: 'success', text: 'El estado de la Pregunta #: ' + data.id + 'sido Editado!',
              timer: 3000, showConfirmButton: false
            });
            this.getPreguntass();
          },error => {
            this.appService.closeSpinner();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
}
