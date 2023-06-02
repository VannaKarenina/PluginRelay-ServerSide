import {Cascade, Collection, Entity, LoadStrategy, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import {Exclude, Expose, Transform} from "class-transformer";
import {ProjectsEntity} from "@mmh/entities/projects/projects.entity";

@Entity({
  tableName: 'projects_category'
})
@Exclude()
export class ProjectCategoryEntity {

  @PrimaryKey()
  @Expose()
  id!: number;

  @Property()
  @Expose()
  name: string;

  @Property()
  @Expose()
  description: string;

  @Property()
  @Expose()
  image: string;

  @OneToMany('ProjectsEntity', 'category', {
    orphanRemoval: true,
    strategy: LoadStrategy.JOINED,
    mappedBy: 'category',
    cascade: [Cascade.ALL]
  })
  @Expose({groups: ['list']})
  @Transform(
    ({value}) => (value?.isInitialized() && value?.getItems()) || [],
    {
      toPlainOnly: true,
    }
  )
  projects = new Collection<ProjectsEntity>(this);

}
