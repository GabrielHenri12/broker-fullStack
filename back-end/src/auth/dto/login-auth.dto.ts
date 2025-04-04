import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthDto {
  @ApiProperty({
    example: 'usuario@example.com',
    description: 'Email do usuário',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha do usuário',
    required: true,
    minLength: 6,
  })
  password: string;
}
