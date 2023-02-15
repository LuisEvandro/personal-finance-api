import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryDTO } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(category: CategoryDTO) {
    const categoryExists = await this.prisma.category.findFirst({
      where: {
        name: category.name,
      },
    });

    if (categoryExists) {
      throw new Error('Category already exists');
    }

    category.status = true;

    const newCategory = await this.prisma.category.create({
      data: {
        ...category,
      },
    });

    return newCategory;
  }

  async update(id: string, category: CategoryDTO) {
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!categoryExists) {
      throw new Error('Category does not exists');
    }

    const updatedCategory = await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        ...category,
      },
    });

    return updatedCategory;
  }

  async delete(id: string) {
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!categoryExists) {
      throw new Error('Category does not exists!');
    }

    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async getAllPaginated(page: number, size: number) {
    return await this.prisma.category.findMany({
      skip: page * size,
      take: size,
      orderBy: {
        name: 'asc',
      },
    });
  }
}
