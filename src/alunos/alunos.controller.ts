import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { AlunosService } from './alunos.service';

import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PatchAlunoDto } from './dto/patch-aluno.dto';

@Controller('alunos')
export class AlunosController {
  constructor(
    private readonly alunosService:
      AlunosService,
  ) {}

  // GET /alunos
  @Get()
  findAll() {
    return this.alunosService.findAll();
  }

  // GET /alunos/1
  @Get(':id')
  findById(
    // Converte o ID da URL para number.
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.alunosService.findById(id);
  }

  // POST /alunos
  @Post()
  create(
    // O DTO valida o corpo automaticamente.
    @Body()
    data: CreateAlunoDto,
  ) {
    return this.alunosService.create(data);
  }

  // PUT /alunos/1
  @Put(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    data: UpdateAlunoDto,
  ) {
    return this.alunosService.update(
      id,
      data,
    );
  }

  // PATCH /alunos/1
  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    data: PatchAlunoDto,
  ) {
    return this.alunosService.patch(
      id,
      data,
    );
  }

  // DELETE /alunos/1
  @Delete(':id')

  // Retorna 204 sem corpo.
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    await this.alunosService.delete(id);
  }
}