import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
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
      throw new HttpException('Category already exists', 409);
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
      throw new HttpException('Category does not exists', 400);
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
      throw new HttpException('Category does not exists', 400);
    }

    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }

  // TODO: Melhorar getCategoriesPaginated e getAll
  async getCategoriesPaginated(
    page: number,
    size: number,
    filters?: { name?: string | undefined; status?: boolean | undefined },
  ) {
    return await this.prisma.category.findMany({
      skip: page === 1 ? 0 : page * size,
      take: size,
      where: {
        name: {
          contains: filters?.name,
        },
        status: filters?.status,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getAll() {
    return await this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
