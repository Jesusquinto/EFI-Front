import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encuestasr'
})

export class EncuestasRSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(encuesta => {
        if(encuesta.idEncuesta.nombre || encuesta.periodo ){
          if(encuesta.idEncuesta.nombre.search(searchText) !== -1  || encuesta.periodo.search(searchText) !== -1 ){
            return true;
          }
        }
      });
    }
  }
}
