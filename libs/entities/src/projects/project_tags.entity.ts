import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {Exclude, Expose} from "class-transformer";
import {ProjectsEntity} from "@mmh/entities/projects/projects.entity";

@Entity({
  tableName: 'projects_tags'
})
@Exclude()
export class ProjectTagsEntity {
  @PrimaryKey()
  @Expose()
  id!: number;

  @Property()
  @Expose()
  project_id: number;

  @Property()
  @Expose()
  tag: number;

  @ManyToOne('ProjectsEntity', {
    joinColumn: 'project_id',
  })
  project: ProjectsEntity
}
