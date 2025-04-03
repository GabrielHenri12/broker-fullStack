import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ListPropertyDto } from './dto/list-property.dto';

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

  async findOne(id: number) {}
}
