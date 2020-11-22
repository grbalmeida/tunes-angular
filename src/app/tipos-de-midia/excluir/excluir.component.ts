import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { TipoMidiaService } from '../services/tipo-midia.service';
import { TipoMidia } from '../models/tipo-midia';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {

    this.tipoMidia = this.route.snapshot.data.tipoMidia;
  }

  public excluirTipoMidia() {
    this.loader.show();

    this.tipoMidiaService.excluirTipoMidia(this.tipoMidia.tipoMidiaId).subscribe(
      evento => { this.sucessoExclusao(evento); },
      ()     => { this.falha(); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Tipo de Mídia excluído com Sucesso!', 'Good bye :D');

    this.loader.hide();

    if (toast) {
      this.router.navigate(['/tipos-de-midia/listar-todos']);
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
