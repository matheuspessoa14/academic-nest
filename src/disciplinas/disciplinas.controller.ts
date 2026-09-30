import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { DisciplinasService } from './disciplinas.service';

import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';

@Controller('disciplinas')
export class DisciplinasController {
  constructor(
    private readonly disciplinasService:
      DisciplinasService,
  ) {}

  // GET /disciplinas
  @Get()
  findAll() {
    return this.disciplinasService.findAll();
  }

  // GET /disciplinas/1
  @Get(':id')
  findById(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.disciplinasService.findById(id);
  }

  // POST /disciplinas
  @Post()
  create(
    @Body()
    data: CreateDisciplinaDto,
  ) {
    return this.disciplinasService.create(data);
  }

  // PUT /disciplinas/1
  @Put(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    data: UpdateDisciplinaDto,
  ) {
    return this.disciplinasService.update(
      id,
      data,
    );
  }

  // DELETE /disciplinas/1
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    await this.disciplinasService.delete(id);
  }
}