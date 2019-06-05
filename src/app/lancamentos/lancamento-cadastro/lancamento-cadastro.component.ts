import { FormControl } from '@angular/forms';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'app/core/model';
import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';

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

  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriasService,
    private errorHanler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
    
    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return (Boolean)(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento=>{
        this.lancamento=lancamento;
      })
      .catch(erro=>this.errorHanler.handle(erro));
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

  salvar(form: FormControl) {
    	if (this.editando) {
        this.atualizarLancamento(form);
      } else {
        this.adcionarLancamento(form);
      }
  }

  adcionarLancamento(form: FormControl) {
    this.lancamentoService.adcionar(this.lancamento) 
      .then(()=> {
        this.toastyService.success('Lançamento Adicionado com sucesso!');
        form.reset();
        this.lancamento =  new Lancamento();
      })
      .catch(erro => this.errorHanler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento =  lancamento;
        this.toastyService.success('Lançamento alterado com sucesso!')
      })
      .catch(erro => this.errorHanler.handle(erro));
  }

}
