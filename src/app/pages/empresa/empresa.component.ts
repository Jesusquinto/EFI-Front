import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { AppService } from 'src/app/services/app.service';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})

export class EmpresaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'entidad', 'nombre', 'nit', 'telefono', 'direccion',
  'orden', 'contactoNombre', 'contactoTelefono', 'contactoEmail', 'contactoCargo', 'estado'];
  public dataSource: any;
  public itemSelected: any;

  constructor(
    public dialog: MatDialog,
    private appService: AppService) { }

  ngOnInit() {
    this.getEmpresas();
  }

  public getEmpresas() {
    this.appService.openSpinner();
    this.appService.get('empresa').subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.appService.closeSpinner();
      },
      error => { this.appService.closeSpinner();}
    );
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage()}
  }

  public nuevo() { this.itemSelected = null; this.openForm(0)}

  public editar(item: any) { this.itemSelected = item;this.openForm(1)}

  public openForm(tipoForm: number) {
    const dialogRef = this.dialog.open(EmpresaFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: '80%', height: 'auto', disableClose: true, backdropClass: 'dark', panelClass: 'box'
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) {this.getEmpresas()}});
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
        this.appService.put('empresa/estado', data).subscribe(
          (r: any) => {
            console.log(r),
            this.appService.closeSpinner();
            this.getEmpresas();
          }, error => {
            this.appService.closeSpinner();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

}
