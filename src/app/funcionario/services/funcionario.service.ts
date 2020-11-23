import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Funcionario } from '../models/funcionario';

@Injectable()
export class FuncionarioService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Funcionario[]> {
    return this.http
      .get<Funcionario[]>(this.UrlServiceV1 + 'funcionarios', super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: number): Observable<Funcionario> {
    return this.http
      .get<Funcionario>(this.UrlServiceV1 + 'funcionarios/' + id, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  novoFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http
      .post(this.UrlServiceV1 + 'funcionarios', funcionario, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  atualizarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http
      .put(this.UrlServiceV1 + 'funcionarios/' + funcionario.funcionarioId, funcionario, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }

  excluirFuncionario(id: number): Observable<Funcionario> {
    return this.http
      .delete(this.UrlServiceV1 + 'funcionarios/' + id, super.ObterAuthHeaderJson())
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      );
  }
}
