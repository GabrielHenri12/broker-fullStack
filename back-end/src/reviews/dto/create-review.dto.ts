import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: 'Bem localizado e confortável',
    description: 'Comentário do usuário',
    required: true,
  })
  comment: string;
  @ApiProperty({
    example: 5,
    description: 'Avaliação do usuário',
    required: true,
  })
  rating: number;
}
