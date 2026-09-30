import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DisciplinasRepository } from './disciplinas.repository';

import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';

@Injectable()
export class DisciplinasService {
  constructor(
    private readonly disciplinasRepository:
      DisciplinasRepository,
  ) {}

  // Lista todas.
  findAll() {
    return this.disciplinasRepository.findAll();
  }

  // Busca e lança 404 se não existir.
  async findById(id: number) {
    const disciplina =
      await this.disciplinasRepository.findById(
        id,
      );

    if (!disciplina) {
      throw new NotFoundException(
        'Disciplina não encontrada',
      );
    }

    return disciplina;
  }

  // Cria uma disciplina.
  create(data: CreateDisciplinaDto) {
    return this.disciplinasRepository.create(
      data.nome,
      data.carga_horaria,
    );
  }

  // Atualiza somente se existir.
  async update(
    id: number,
    data: UpdateDisciplinaDto,
  ) {
    await this.findById(id);

    await this.disciplinasRepository.update(
      id,
      data.nome,
      data.carga_horaria,
    );

    return this.findById(id);
  }

  // Exclui somente se existir.
  async delete(id: number) {
    await this.findById(id);

    await this.disciplinasRepository.delete(id);
  }
}