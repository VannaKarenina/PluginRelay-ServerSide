import {Controller, Get, Param} from "@nestjs/common";
import {CategoryService} from "@mmh/gateway/apps/category/category.service";
import {CategoryByIdDto} from "@mmh/gateway/dto";

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

}
