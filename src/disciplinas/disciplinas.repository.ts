import { Injectable } from '@nestjs/common';

import {
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2';

import { DatabaseService } from '../database/database.service';

// Representa uma disciplina retornada pelo MySQL.
export interface DisciplinaRow extends RowDataPacket {
  id: number;
  nome: string;
  carga_horaria: number;
}

@Injectable()
export class DisciplinasRepository {
  constructor(
    private readonly databaseService:
      DatabaseService,
  ) {}

  // Lista todas.
  async findAll() {
    const [rows] =
      await this.databaseService.execute<
        DisciplinaRow[]
      >(
        `
          SELECT id, nome, carga_horaria
          FROM disciplinas
          ORDER BY id
        `,
      );

    return rows;
  }

  // Busca uma disciplina pelo ID.
  async findById(id: number) {
    const [rows] =
      await this.databaseService.execute<
        DisciplinaRow[]
      >(
        `
          SELECT id, nome, carga_horaria
          FROM disciplinas
          WHERE id = ?
        `,
        [id],
      );

    return rows[0] ?? null;
  }

  // Cria uma disciplina.
  async create(
    nome: string,
    cargaHoraria: number,
  ) {
    const [result] =
      await this.databaseService.execute<
        ResultSetHeader
      >(
        `
          INSERT INTO disciplinas (
            nome,
            carga_horaria
          )
          VALUES (?, ?)
        `,
        [
          nome,
          cargaHoraria,
        ],
      );

    return {
      id: result.insertId,
      nome,
      carga_horaria: cargaHoraria,
    };
  }

  // Atualiza uma disciplina.
  async update(
    id: number,
    nome: string,
    cargaHoraria: number,
  ) {
    const [result] =
      await this.databaseService.execute<
        ResultSetHeader
      >(
        `
          UPDATE disciplinas
          SET
            nome = ?,
            carga_horaria = ?
          WHERE id = ?
        `,
        [
          nome,
          cargaHoraria,
          id,
        ],
      );

    return result.affectedRows;
  }

  // Remove uma disciplina.
  async delete(id: number) {
    const [result] =
      await this.databaseService.execute<
        ResultSetHeader
      >(
        `
          DELETE FROM disciplinas
          WHERE id = ?
        `,
        [id],
      );

    return result.affectedRows;
  }
}