import { Controller, HttpException } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common/decorators';
import { CategoryDTO } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() data: CategoryDTO) {
    return this.categoryService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CategoryDTO) {
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }

  @Get(':page/:size')
  async getCategoriesPaginated(
    @Param('page') page: string,
    @Param('size') size: string,
    @Query('name') name: string,
    @Query('status') status: string,
  ) {
    try {
      const filters = {
        name: name || undefined,
        status: status ? JSON.parse(status) : undefined,
      };

      return this.categoryService.getCategoriesPaginated(
        Number(page),
        Number(size),
        filters,
      );
    } catch (error) {
      throw new HttpException('Filters not exits', 400);
    }
  }

  @Get('all')
  async getAll() {
    return this.categoryService.getAll();
  }
}
