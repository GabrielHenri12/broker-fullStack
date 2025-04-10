import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'src/prisma.service';
import { PendingReviewDto } from './dto/pending-review.dto';

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

  async findAllPending(propertyId: string): Promise<PendingReviewDto[]> {
    const reviews = await this.prisma.review.findMany({
      where: { propertyId, status: 'PENDING', deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, name: true } } },
    });

    return reviews.map((x) => ({
      id: x.id,
      comment: x.comment,
      rating: x.rating,
      createdAt: x.createdAt,
      user: {
        id: x.user.id,
        name: x.user.name,
      },
    }));
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
