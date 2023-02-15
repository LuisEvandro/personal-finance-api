import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
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

  @Get()
  async getAllPaginated(
    @Param('page') page: string,
    @Param('size') size: string,
  ) {
    return this.categoryService.getAllPaginated(Number(page), Number(size));
  }
}
