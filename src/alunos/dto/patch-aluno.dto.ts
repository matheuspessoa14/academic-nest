import { PartialType } from '@nestjs/mapped-types';

import { CreateAlunoDto } from './create-aluno.dto';

// PartialType transforma os campos em opcionais,
// mantendo as mesmas regras de validação.
export class PatchAlunoDto extends PartialType(
  CreateAlunoDto,
) {}