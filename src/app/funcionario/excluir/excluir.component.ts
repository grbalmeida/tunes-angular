import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { FuncionarioService } from '../services/funcionario.service';
import { Funcionario } from '../models/funcionario';
import { NgxSpinnerService } from 'ngx-spinner';
import { FUNCIONARIOS_LISTAR_TODOS } from 'src/app/shared/routes';
import { FUNCIONARIO_EXCLUIDO_SUCESSO, GOOD_BYE, HOUVE_ERRO_PROCESSAMENTO, OPA } from 'src/app/shared/messages';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  funcionario: Funcionario;

  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {

    this.funcionario = this.route.snapshot.data.funcionario;
  }

  public excluirFuncionario() {
    this.loader.show();

    this.funcionarioService.excluirFuncionario(this.funcionario.funcionarioId).subscribe(
      evento => { this.sucessoExclusao(evento); },
      error    => { this.falha(error); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success(FUNCIONARIO_EXCLUIDO_SUCESSO, GOOD_BYE);

    this.loader.hide();

    if (toast) {
      this.router.navigate([FUNCIONARIOS_LISTAR_TODOS]);
    }
  }

  public falha(e) {
    this.loader.hide();
    this.toastr.error(e?.error?.errors[0] || HOUVE_ERRO_PROCESSAMENTO, OPA);
  }
}
