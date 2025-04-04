import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    propertyId: string,
    createReviewDto: CreateReviewDto,
  ) {
    return await this.prisma.review.create({
      data: {
        comment: createReviewDto.comment,
        rating: createReviewDto.rating,
        propertyId: propertyId,
        userId: userId,
      },
    });
  }

  async findAll(propertyId: string) {
    return await this.prisma.review.findMany({
      where: { propertyId, status: 'APPROVED', deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, name: true } } },
    });
  }

  async approveReview(
    id: string,
    propertyId: string,
    status: 'APPROVED' | 'REJECTED',
  ) {
    return await this.prisma.review.update({
      where: { id, propertyId },
      data: { status },
    });
  }
}
