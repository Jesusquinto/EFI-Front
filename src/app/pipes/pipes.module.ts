import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuSearch} from './menu-search.pipe';
import { EncuestaSearchPipe } from './encuesta-search.pipe';
import { TruncatePipe } from './truncate.pipe'
import { DepartamentoSearchPipe } from './departamento-search.pipe';
import { MunicipioSearchPipe } from './municipio-search.pipe';
import { ContratanteSearchPipe } from './contratante-search.pipe.';
import { TruncateFilePipe } from './truncate-file.pipe';
import { searchPipe } from './search.pipe';
import { FilterPipe } from '../utils/filter.pipe';
import { UniqueSearchPipe } from './unique-search.pipe';
import { EncuestasRSearchPipe } from './encuestas-realizadas.pipe';


@NgModule({
    imports: [ 
        CommonModule 
    ],
    declarations: [
      MenuSearch,
      UniqueSearchPipe,
      EncuestaSearchPipe,
      TruncatePipe,
      DepartamentoSearchPipe,
      MunicipioSearchPipe,
      ContratanteSearchPipe,
      TruncateFilePipe,
      FilterPipe,
      searchPipe,
      EncuestasRSearchPipe,
    ],
    exports: [
        TruncateFilePipe,
        MenuSearch,
        UniqueSearchPipe,
        EncuestaSearchPipe,
        FilterPipe,
        TruncatePipe,
        DepartamentoSearchPipe,
        MunicipioSearchPipe,
        ContratanteSearchPipe,
        searchPipe,
        EncuestasRSearchPipe,
    ]
})
export class PipesModule { }
