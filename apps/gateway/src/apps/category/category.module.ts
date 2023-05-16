import {Module} from "@nestjs/common";
import {AuthModule, SharedMoleculerModule} from "@mmh/gateway/shared";
import {CategoryController} from "@mmh/gateway/apps/category/category.controller";
import {CategoryService} from "@mmh/gateway/apps/category/category.service";

@Module({
  controllers: [CategoryController],
  exports: [CategoryService],
  providers: [CategoryService],
  imports: [SharedMoleculerModule, AuthModule]
})
export class CategoryModule{}
