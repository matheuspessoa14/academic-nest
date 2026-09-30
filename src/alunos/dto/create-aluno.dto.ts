import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAlunoDto {
  // Nome deve ser texto e obrigatório.
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  // Valida o formato do e-mail.
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // Curso deve ser texto e obrigatório.
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  curso: string;
}