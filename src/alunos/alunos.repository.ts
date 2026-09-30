import { Injectable } from '@nestjs/common';

import {
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2';

import { DatabaseService } from '../database/database.service';

// Representa uma linha devolvida pelo MySQL.
export interface AlunoRow extends RowDataPacket {
  id: number;
  nome: string;
  email: string;
  curso: string;
}

@Injectable()
export class AlunosRepository {
  constructor(
    private readonly databaseService:
      DatabaseService,
  ) {}

  // Busca todos os alunos.
  async findAll() {
    const [rows] =
      await this.databaseService.execute<
        AlunoRow[]
      >(
        `
          SELECT id, nome, email, curso
          FROM alunos
          ORDER BY id
        `,
      );

    return rows;
  }

  // Busca apenas um aluno pelo ID.
  async findById(id: number) {
    const [rows] =
      await this.databaseService.execute<
        AlunoRow[]
      >(
        `
          SELECT id, nome, email, curso
          FROM alunos
          WHERE id = ?
        `,
        [id],
      );

    return rows[0] ?? null;
  }

  // Insere um aluno no MySQL.
  async create(
    nome: string,
    email: string,
    curso: string,
  ) {
    const [result] =
      await this.databaseService.execute<
        ResultSetHeader
      >(
        `
          INSERT INTO alunos (
            nome,
            email,
            curso
          )
          VALUES (?, ?, ?)
        `,
        [
          nome,
          email,
          curso,
        ],
      );

    return {
      id: result.insertId,
      nome,
      email,
      curso,
    };
  }

  // Atualiza todos os dados do aluno.
  async update(
    id: number,
    nome: string,
    email: string,
    curso: string,
  ) {
    const [result] =
      await this.databaseService.execute<
        ResultSetHeader
      >(
        `
          UPDATE alunos
          SET
            nome = ?,
            email = ?,
            curso = ?
          WHERE id = ?
        `,
        [
          nome,
          email,
          curso,
          id,
        ],
      );

    return result.affectedRows;
  }

  // Exclui o aluno.
  async delete(id: number) {
    const [result] =
      await this.databaseService.execute<
        ResultSetHeader
      >(
        `
          DELETE FROM alunos
          WHERE id = ?
        `,
        [id],
      );

    return result.affectedRows;
  }
}