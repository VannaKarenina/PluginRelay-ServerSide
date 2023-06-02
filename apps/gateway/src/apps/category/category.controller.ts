import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {CategoryService} from "@mmh/gateway/apps/category/category.service";
import {CategoryByIdDto, CategoryImageDto, CreateCategoryDto} from "@mmh/gateway/dto";
import {JwtAuthGuard} from "@mmh/gateway/guards/JwtAuth.guard";

@Controller({
  path: 'category'
})
export class CategoryController {

  constructor(private service: CategoryService) {}

  @Get('all')
  async getAllCategories() {
    return this.service.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(
    @Param('id') id: string
  ) {
    return this.service.getById({id: parseInt(id)})
  }

  @UseGuards(JwtAuthGuard)
  @Post('/new')
  async createCategory(
    @Body() payload: CreateCategoryDto
  ) {
    return this.service.createCategory(payload)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/newimg')
  async changeImage(
      @Body() payload: CategoryImageDto
  ) {
    return this.service.changeImage(payload)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async delete(
      @Param('id') id: string
  ) {
    return this.service.delete({id: parseInt(id)})
  }

}
