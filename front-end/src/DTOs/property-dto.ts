export type ListPropertyDto = {
  id: string;
  name: string;
  description: string;
  price: number;
  address: string;
  rating: number;
  images: ImageDTO[];
};

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

export type ReviewDTO = {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: UserDTO;
};

export type UserDTO = {
  id: string;
  name: string;
};

export type ImageDTO = {
  id: string;
  url: string;
};
