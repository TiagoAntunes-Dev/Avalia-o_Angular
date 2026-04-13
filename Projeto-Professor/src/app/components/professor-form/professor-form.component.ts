import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professor-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.css']
})

export class ProfessorFormComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  professorId?: number;
  loading = false;
  salvando = false;
  erro = '';

  constructor(
    private fb: FormBuilder,
    private professorService: ProfessorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.criarFormulario();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.professorId = +id;
      this.carregarProfessor(this.professorId);
    }
  }

  criarFormulario(): void {
    this.form = this.fb.group({
      rgf: [
        '',
        [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]
      ],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{5}-?[0-9]{3}$')]],
      disciplina: ['', Validators.required],
      idade: ['', [Validators.required, Validators.min(18), Validators.max(100)]]
    });
  }

  carregarProfessor(id: number): void {
    this.loading = true;
    this.professorService.getById(id).subscribe({
      next: (prof) => {
        this.form.patchValue(prof);
        this.loading = false;
      },
      error: () => {
        this.erro = 'Erro ao carregar dados do professor.';
        this.loading = false;
      }
    });
  }

  formatarCep(): void {
    let val = this.form.get('cep')?.value?.replace(/\D/g, '') || '';
    if (val.length > 5) val = val.slice(0, 5) + '-' + val.slice(5, 8);
    this.form.get('cep')?.setValue(val, { emitEvent: false });
  }

salvar(): void {
    // 1. VERIFICAÇÃO DE VALIDAÇÃO
    console.log('--- TENTATIVA DE SALVAR ---');
    console.log('Formulário é válido?', this.form.valid);
    console.log('Valores preenchidos:', this.form.value);

    if (this.form.invalid) {
      console.warn('Formulário inválido! Campos com erro:', 
        Object.keys(this.form.controls).filter(key => this.form.controls[key].invalid)
      );
      this.form.markAllAsTouched();
      return; // Para tudo aqui
    }

    this.salvando = true;
    this.erro = '';
    const dados: Professor = this.form.value;

    console.log('Enviando dados para o servidor...', dados);

    if (this.isEditMode && this.professorId !== undefined) {
      this.professorService.update(this.professorId, dados).subscribe({
        next: () => {
          console.log('Professor atualizado com sucesso!');
          this.salvando = false;
          this.router.navigate(['/professores']);
        },
        error: (err) => {
          console.error('Erro retornado pela API ao atualizar:', err);
          this.erro = 'Erro ao atualizar professor.';
          this.salvando = false;
        }
      });
    } else {
      // 2. TENTATIVA DE CRIAÇÃO
      this.professorService.create(dados).subscribe({
        next: (resposta) => {
          console.log('Professor CRIADO com sucesso! Resposta da API:', resposta);
          this.salvando = false;
          this.router.navigate(['/professores']);
        },
        error: (err) => {
          console.error('Erro retornado pela API ao criar:', err);
          this.erro = 'Erro ao cadastrar professor.';
          this.salvando = false;
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/professores']);
  }

  get f() { return this.form.controls; }

  isInvalid(campo: string): boolean {
    const c = this.form.get(campo);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }
}