import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AlunosRepository } from './alunos.repository';

import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PatchAlunoDto } from './dto/patch-aluno.dto';

@Injectable()
export class AlunosService {
  constructor(
    private readonly alunosRepository:
      AlunosRepository,
  ) {}

  // Lista todos.
  findAll() {
    return this.alunosRepository.findAll();
  }

  // Busca pelo ID e gera 404 se não existir.
  async findById(id: number) {
    const aluno =
      await this.alunosRepository.findById(id);

    if (!aluno) {
      throw new NotFoundException(
        'Aluno não encontrado',
      );
    }

    return aluno;
  }

  // Cria utilizando os dados validados pelo DTO.
  create(data: CreateAlunoDto) {
    return this.alunosRepository.create(
      data.nome,
      data.email,
      data.curso,
    );
  }

  // PUT: atualiza o recurso completo.
  async update(
    id: number,
    data: UpdateAlunoDto,
  ) {
    // Confirma primeiro se o aluno existe.
    await this.findById(id);

    await this.alunosRepository.update(
      id,
      data.nome,
      data.email,
      data.curso,
    );

    return this.findById(id);
  }

  // PATCH: atualiza apenas os campos enviados.
  async patch(
    id: number,
    data: PatchAlunoDto,
  ) {
    const aluno =
      await this.findById(id);

    await this.alunosRepository.update(
      id,

      // Mantém o valor antigo se não foi enviado.
      data.nome ?? aluno.nome,
      data.email ?? aluno.email,
      data.curso ?? aluno.curso,
    );

    return this.findById(id);
  }

  // Exclui somente se o aluno existir.
  async delete(id: number) {
    await this.findById(id);

    await this.alunosRepository.delete(id);
  }
}