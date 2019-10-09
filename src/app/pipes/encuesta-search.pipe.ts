import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'EncuestaSearch'
})

export class EncuestaSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(encuesta => {
        if(encuesta.nombre){
          if( encuesta.nombre.search(searchText) !== -1){
            return true;
          }
        }
      });
    }
  }
}
