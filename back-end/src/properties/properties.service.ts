import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ListPropertyDto } from './dto/list-property.dto';
import { DetailsPropertyDto } from './dto/details-property.dto';

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ListPropertyDto[]> {
    const properties = await this.prisma.property.findMany({
      include: { images: true },
    });
    return properties.map((x) => ({
      id: x.id,
      name: x.name,
      description: x.description,
      address: x.address,
      price: x.value,
      rating: 5,
      images: x.images.map((y) => ({
        id: y.id,
        url: y.image,
      })),
    }));
  }

  async findOne(id: string): Promise<DetailsPropertyDto | null> {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        images: true,
        owner: true,
        reviews: {
          where: { status: 'APPROVED', deletedAt: null },
          orderBy: { createdAt: 'desc' },
          include: {
            user: true,
          },
        },
      },
    });
    if (!property) {
      return null;
    }
    // Cálculo das estatísticas das reviews
    const reviews = property.reviews;
    const totalReviews = reviews.length;

    // Calcula a média das avaliações
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

    // Arredonda para 1 casa decimal
    const roundedAverage = Math.round(averageRating * 10) / 10;

    return {
      id: property.id,
      name: property.name,
      address: property.address,
      description: property.description,
      price: property.value,
      rating: roundedAverage,
      reviews: property.reviews.map((x) => ({
        id: x.id,
        rating: x.rating,
        comment: x.comment,
        createdAt: x.createdAt,
        user: {
          id: x.user.id,
          name: x.user.name,
        },
      })),
      images: property.images.map((x) => MapImage(x)),
    };
  }
}

const MapImage = (x: any) => ({
  id: x.id,
  url: x.image,
});
