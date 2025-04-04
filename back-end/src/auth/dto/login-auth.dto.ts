import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthDto {
  @ApiProperty({
    example: 'maria@email.com',
    description: 'Email do usuário',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: '654321',
    description: 'Senha do usuário',
    required: true,
    minLength: 6,
  })
  password: string;
}
