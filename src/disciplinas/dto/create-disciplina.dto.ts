import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateDisciplinaDto {
  // Nome obrigatório.
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  // Carga horária precisa ser número inteiro positivo.
  @IsInt()
  @Min(1)
  carga_horaria: number;
}