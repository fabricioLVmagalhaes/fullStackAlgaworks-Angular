import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'util';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ]

  categorias = [
    { label: 'Alimentação', value: 1},
    { label: 'Transporte', value: 2}
  ]

  pessoas = [
    { label: 'João da Silva', value: 1 },
    { label: 'Sebastião Souza', value: 2 },
    { label: 'Maria Abadia', value: 3 }
  ]

  constructor(
    private categoriaService: CategoriasService,
    private errorHanler: ErrorHandlerService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(categorias=>{
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }))
      })
      .catch(erro => this.errorHanler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.pesquisarTodas()
      .then(pessoas=>{
        this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo}))
      })
      .catch(erro => this.errorHanler.handle(erro));
  }

}
