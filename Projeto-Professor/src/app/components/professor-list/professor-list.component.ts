import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Importe o CommonModule
import { Professor } from '../../models/professor';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-professor-list',
  standalone: true, // <-- Adicione esta linha
  imports: [CommonModule, RouterModule], // <-- Adicione esta linha
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {

  professores: Professor[] = [];
  loading = false;
  erro = '';
  mensagemSucesso = '';
  confirmarExclusaoId: number | null = null;

  constructor(
    private professorService: ProfessorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProfessores();
  }

  carregarProfessores(): void {
    this.loading = true;
    this.erro = '';
    this.professorService.getAll().subscribe({
      next: (data) => {
        this.professores = data;
        this.loading = false;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar professores. Verifique se o JSON-Server está rodando na porta 3000.';
        this.loading = false;
      }
    });
  }

  editarProfessor(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/professores/editar', id]);
    }
  }

  confirmarExclusao(id: number | undefined): void {
    if (id !== undefined) {
      this.confirmarExclusaoId = id;
    }
  }

  cancelarExclusao(): void {
    this.confirmarExclusaoId = null;
  }

  excluirProfessor(): void {
    if (this.confirmarExclusaoId === null) return;
    const id = this.confirmarExclusaoId;
    this.professorService.delete(id).subscribe({
      next: () => {
        this.professores = this.professores.filter(p => p.id !== id);
        this.confirmarExclusaoId = null;
        this.mensagemSucesso = 'Professor removido com sucesso!';
        setTimeout(() => this.mensagemSucesso = '', 3000);
      },
      error: () => {
        this.erro = 'Erro ao remover professor.';
        this.confirmarExclusaoId = null;
      }
    });
  }
}