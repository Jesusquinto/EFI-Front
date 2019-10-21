import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns: string[] = ['acciones', 'username', 'nombre', 'apellido', 'documento', 'email', 'enabled'];
  public dataSource: any;
  public itemSelected: any;

  constructor(
    public dialog: MatDialog,
    private appService: AppService) { }

  ngOnInit() {
    this.getUsuarios();
    //this.exportExcel();
  }

  public exportExcel() {
    this.appService.get('export').subscribe(
      (data: any) => {
        console.log(data);
      }
    )
  }

  public getUsuarios() {
    this.appService.get('usuarios').subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {  }
    );
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage()}
  }

  public nuevo() { this.itemSelected = null; this.openForm(0)}

  public editar(item: any) { this.itemSelected = item;this.openForm(1)}

  public openForm(tipoForm: number) {
    const dialogRef = this.dialog.open(UsuariosFormComponent, {
      data: { tipoForm: tipoForm, data: this.itemSelected },
      width: 'auto', maxWidth: '60%', height: 'auto', disableClose: true, backdropClass: 'dark', panelClass: 'box'
    });
    dialogRef.afterClosed().subscribe(result => { if (result === 1) {this.getUsuarios()}});
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
        this.appService.put('usuarios/estado', data).subscribe(
          (data: any) => {
            this.appService.closeSpinner();
            Swal.fire({
              type: 'success', text: 'El estado del Usuario ' + String(data.username).toUpperCase() + ' Ha sido Editado!',
              timer: 3000, showConfirmButton: false
            });
            this.getUsuarios()
          },error => {
            console.log(error);
            this.appService.closeSpinner();
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

}
