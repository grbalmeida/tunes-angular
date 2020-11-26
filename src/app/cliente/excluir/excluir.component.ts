import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import { NgxSpinnerService } from 'ngx-spinner';
import { CLIENTES_LISTAR_TODOS } from 'src/app/shared/routes';
import { CLIENTE_EXCLUIDO_SUCESSO, GOOD_BYE, HOUVE_ERRO_PROCESSAMENTO, OPA } from 'src/app/shared/messages';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html'
})
export class ExcluirComponent  {

  cliente: Cliente;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private loader: NgxSpinnerService
  ) {

    this.cliente = this.route.snapshot.data.cliente;
  }

  public excluirCliente() {
    this.loader.show();

    this.clienteService.excluirCliente(this.cliente.clienteId).subscribe(
      evento => { this.sucessoExclusao(evento); },
      error    => { this.falha(error); }
    );
  }

  public sucessoExclusao(evento: any) {

    const toast = this.toastr.success(CLIENTE_EXCLUIDO_SUCESSO, GOOD_BYE);

    this.loader.hide();

    if (toast) {
      this.router.navigate([CLIENTES_LISTAR_TODOS]);
    }
  }

  public falha(e) {
    this.loader.hide();
    this.toastr.error(e?.error?.errors[0] || HOUVE_ERRO_PROCESSAMENTO, OPA);
  }
}
