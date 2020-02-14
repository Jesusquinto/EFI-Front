import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { AppService } from 'src/app/services/app.service';
import { CategoriasPreguntasFormComponent } from './categorias-preguntas-form/categorias-preguntas-form.component';

@Component({
  selector: 'app-categorias-preguntas',
  templateUrl: './categorias-preguntas.component.html',
  styleUrls: ['./categorias-preguntas.component.scss']
})

export class CategoriasPreguntasComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'nombre'];
  public dataSource: any;
  public itemSelected: any;

  constructor(
    public dialog: MatDialog,
    private appService: AppService) { }

  ngOnInit() {
    this.getCategoriasPreguntass();
  }

  public getCategoriasPreguntass() {
    this.appService.openSpinner();
    this.appService.get('categoriasPregunta').subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.appService.closeSpinner();
      },
      error => {this.appService.closeSpinner(); }
    );
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage()}
  }

  public nuevo() { this.itemSelected = null; this.openForm(0)}

  public editar(item: any) { this.itemSelected = item;this.openForm(1)}

  public openForm(tipoForm: number) {
    const dialogRef = this.dialog.open(CategoriasPreguntasFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: 'auto', height: 'auto', minWidth: '35%', disableClose: true, backdropClass: 'dark', panelClass: 'box'
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) {this.getCategoriasPreguntass()}});
  }

}
