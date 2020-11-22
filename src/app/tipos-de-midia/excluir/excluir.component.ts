import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { TipoMidiaService } from '../services/tipo-midia.service';
import { TipoMidia } from '../models/tipo-midia';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  tipoMidia: TipoMidia;

  constructor(
    private tipoMidiaService: TipoMidiaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.tipoMidia = this.route.snapshot.data.tipoMidia;
  }

  public excluirTipoMidia() {
    this.tipoMidiaService.excluirTipoMidia(this.tipoMidia.tipoMidiaId).subscribe(
      evento => { this.sucessoExclusao(evento); },
      ()     => { this.falha(); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Tipo de Mídia excluído com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/tipos-de-midia/listar-todos']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
