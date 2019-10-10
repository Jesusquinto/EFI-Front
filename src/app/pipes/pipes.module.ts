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


@NgModule({
    imports: [ 
        CommonModule 
    ],
    declarations: [
      MenuSearch,
      EncuestaSearchPipe,
      TruncatePipe,
      DepartamentoSearchPipe,
      MunicipioSearchPipe,
      ContratanteSearchPipe,
      TruncateFilePipe,
      searchPipe
    ],
    exports: [
        TruncateFilePipe,
        MenuSearch,
        EncuestaSearchPipe,
        TruncatePipe,
        DepartamentoSearchPipe,
        MunicipioSearchPipe,
        ContratanteSearchPipe,
        searchPipe
    ]
})
export class PipesModule { }
