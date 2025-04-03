export type ListPropertyDto = {
  id: string;
  name: string;
  description: string;
  price: number;
  address: string;
  rating: number;
  images: ImageDTO[];
};

export class ImageDTO {
  id: string;
  url: string;
}
