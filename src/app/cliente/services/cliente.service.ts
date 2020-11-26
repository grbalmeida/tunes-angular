import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Cliente } from '../models/cliente';

@Injectable()
export class ClienteService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(this.UrlServiceV1 + 'clientes', super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
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
