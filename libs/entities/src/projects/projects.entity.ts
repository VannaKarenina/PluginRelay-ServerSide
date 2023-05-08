import {Exclude, Expose, Transform} from "class-transformer";
import {Cascade, Collection, Entity, LoadStrategy, ManyToOne, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import {AccountEntity} from "../user/account.entitiy";
import {ProjectsScoresEntity} from "./project_scores.entity";
import {ProjectTagsEntity} from "@mmh/entities/projects/project_tags.entity";
import {ProjectCategoryEntity} from "@mmh/entities/projects/project_category.entity";
import {ProjectsVersionEntity} from "@mmh/entities/projects/projects_version.entity";

@Entity({
  tableName: 'projects'
})
@Exclude()
export class ProjectsEntity {

  @PrimaryKey()
  @Expose()
  id!: number;

  @Property()
  @Expose()
  account_id: number;

  @Property()
  @Expose()
  name: string;

  @Property()
  @Expose()
  favicon_path: string;

  @Property()
  @Expose()
  category_id: number;

  @Property()
  @Expose()
  description: string;

  @Property({default: 0})
  @Expose()
  downloads: string;

  @OneToMany('ProjectsScoresEntity', 'project', {
    orphanRemoval: true,
    strategy: LoadStrategy.JOINED,
    mappedBy: 'project',
    cascade: [Cascade.ALL]
  })
  @Expose({groups: ['list']})
  @Transform(
    ({value}) => (value?.isInitialized() && value?.getItems()) || [],
    {
      toPlainOnly: true,
    }
  )
  scores = new Collection<ProjectsScoresEntity>(this);

  @OneToMany('ProjectsVersionEntity', 'project', {
    orphanRemoval: true,
    strategy: LoadStrategy.JOINED,
    mappedBy: 'project',
    cascade: [Cascade.ALL]
  })
  @Expose({groups: ['list']})
  @Transform(
    ({value}) => (value?.isInitialized() && value?.getItems()) || [],
    {
      toPlainOnly: true,
    }
  )
  versions = new Collection<ProjectsVersionEntity>(this);

  @OneToMany('ProjectTagsEntity', 'project', {
    orphanRemoval: true,
    strategy: LoadStrategy.JOINED,
    mappedBy: 'project',
    cascade: [Cascade.ALL]
  })
  @Expose({groups: ['list']})
  @Transform(
    ({value}) => (value?.isInitialized() && value?.getItems()) || [],
    {
      toPlainOnly: true,
    }
  )
  tags = new Collection<ProjectTagsEntity>(this);

  @ManyToOne('AccountEntity', {
    joinColumn: 'account_id',
  })
  account: AccountEntity

  @ManyToOne('ProjectCategoryEntity', {
    joinColumn: 'category_id',
  })
  category: ProjectCategoryEntity


}
