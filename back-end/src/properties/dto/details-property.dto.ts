export type DetailsPropertyDto = {
  id: string;
  name: string;
  description: string;
  price: number;
  address: string;
  rating: number;
  reviews: ReviewDTO[];
  images: ImageDTO[];
};

export class ImageDTO {
  id: string;
  url: string;
}

export class ReviewDTO {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: UserDTO;
}

export class UserDTO {
  id: string;
  name: string;
}
