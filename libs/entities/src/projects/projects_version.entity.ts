import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {Expose} from "class-transformer";
import {ProjectsEntity} from "@mmh/entities/projects/projects.entity";

@Entity({
  tableName: 'projects_versions'
})
export class ProjectsVersionEntity {

  @PrimaryKey()
  @Expose()
  id!: number;

  @Property()
  @Expose()
  name: string;

  @Property()
  @Expose()
  version: string;

  @Property()
  @Expose()
  description: string;

  @Property()
  @Expose()
  storage: string;

  @ManyToOne('ProjectsEntity', {
    joinColumn: 'project_id',
  })
  project: ProjectsEntity

}
