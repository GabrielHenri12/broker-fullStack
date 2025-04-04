import { ApiProperty } from '@nestjs/swagger';

export class ApproveReviewDto {
  @ApiProperty({
    example: 'APPROVED',
    description: 'Status da avaliação',
    required: true,
  })
  status: 'APPROVED' | 'REJECTED';
}
