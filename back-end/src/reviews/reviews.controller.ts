import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApproveReviewDto } from './dto/approve-review.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('properties/:propertyId/reviews')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar nova avaliação',
  })
  @ApiParam({
    name: 'propertyId',
    required: true,
    description: 'ID da propriedade que está sendo avaliada',
    type: String,
    example: '6af52303-bb8e-45c6-bc1e-931e593a4ced',
  })
  async create(@Body() createReviewDto: CreateReviewDto, @Request() req) {
    const userId = req.user.id;
    const propertyId = req.params.propertyId;

    return await this.reviewsService.create(
      userId,
      propertyId,
      createReviewDto,
    );
  }

  @Patch('properties/:propertyId/reviews/:reviewId/status')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Aprovar avaliação' })
  @ApiParam({
    name: 'propertyId',
    required: true,
    description: 'ID da propriedade que está sendo avaliada',
    type: String,
    example: '6af52303-bb8e-45c6-bc1e-931e593a4ced',
  })
  @ApiParam({
    name: 'reviewId',
    required: true,
    description: 'ID da propriedade que está sendo avaliada',
    type: String,
    example: 'e7d19c29-0c12-453b-b31c-e6b7058c2955',
  })
  async approveReview(
    @Body() approveReviewDto: ApproveReviewDto,
    @Request() req,
  ) {
    const { role } = req.user;
    if (role !== 'ADMIN') {
      throw new Error('Apenas administradores podem aprovar avaliações');
    }
    const { propertyId, reviewId } = req.params;

    return await this.reviewsService.approveReview(
      reviewId,
      propertyId,
      approveReviewDto.status,
    );
  }

  @Get('properties/:propertyId/reviews/for/approval')
  @UseGuards(AuthGuard)
  async reviewForApproval(@Request() req) {
    const { role } = req.user;
    if (role !== 'ADMIN') {
      throw new Error('Apenas administradores podem aprovar avaliações');
    }
    const { propertyId } = req.params;

    return await this.reviewsService.findAllPending(propertyId);
  }
}
