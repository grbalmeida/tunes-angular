import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Cliente } from '../models/cliente';
import { ClienteFiltro } from '../models/cliente-filtro';

@Injectable()
export class ClienteService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Cliente[]> {
    return this.filtro({
      cep: '',
      cidade: '',
      email: '',
      endereco: '',
      estado: '',
      fax: '',
      fone: '',
      pais: '',
      primeiroNome: '',
      sobrenome: '',
      empresa: ''
    });
  }

  filtro(filtro: ClienteFiltro): Observable<Cliente[]> {
    const params = new HttpParams({
      fromObject: {
        primeiroNome: filtro.primeiroNome ?? '',
        sobrenome: filtro.sobrenome ?? '',
        empresa: filtro.empresa ?? '',
        endereco: filtro.endereco ?? '',
        cidade: filtro.cidade ?? '',
        estado: filtro.estado ?? '',
        pais: filtro.pais ?? '',
        cep: filtro.cep ?? '',
        fone: filtro.fone ?? '',
        fax: filtro.fax ?? '',
        email: filtro.email ?? '',
      }
    });

    return this.http
      .get<Cliente[]>(this.UrlServiceV2 + 'clientes',
      {
        ...super.ObterAuthHeaderJson(),
        params
      })
      .pipe(catchError(super.serviceError)) as Observable<Cliente[]>;
  }

  obterPorId(id: number): Observable<Cliente> {
    return this.http
      .get<Cliente>(this.UrlServiceV1 + 'clientes/' + id, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novoCliente(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.UrlServiceV1 + 'clientes', cliente, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put(this.UrlServiceV1 + 'clientes/' + cliente.clienteId, cliente, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  excluirCliente(id: number): Observable<Cliente> {
    return this.http
      .delete(this.UrlServiceV1 + 'clientes/' + id, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }
}
