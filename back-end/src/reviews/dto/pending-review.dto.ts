export class PendingReviewDto {
  id: string;
  comment: string;
  rating: number;
  createdAt: Date
  user: {
    id: string;
    name: string;
  };
}