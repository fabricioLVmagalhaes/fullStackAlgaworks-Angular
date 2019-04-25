import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {
  

  pessoaUrl = 'http://localhost:8080/pessoas';

  constructor(
    private http: Http
  ) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new Headers();
    const params = new URLSearchParams();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoaUrl}`, {headers, search: params})
      .toPromise()
      .then(
        response => {
          const responseJson = response.json();
          const pessoas = responseJson.content;

          const resultado = {
            pessoas: pessoas,
            total: responseJson.totalElements
          };
          return resultado;
        }
      )
  }

  pesquisarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.pessoaUrl}`, {headers})
      .toPromise()
      .then(
        response => {
          const resultado =  response.json();
          return resultado.content;
        }
      )
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoaUrl}/${codigo}`, {headers})
      .toPromise()
      .then(() => null);
  }

}
