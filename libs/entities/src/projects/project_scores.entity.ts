import {Exclude, Expose} from "class-transformer";
import {Entity, ManyToOne, OneToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {ProjectsEntity} from "./projects.entity";
import {AccountEntity} from "../user/account.entitiy";

@Entity({
  tableName: 'projects_scores'
})
@Exclude()
export class ProjectsScoresEntity {

  @PrimaryKey()
  @Expose()
  id!: number;

  @Property()
  @Expose()
  project_id: number;

  @Property()
  @Expose()
  score: number;

  @ManyToOne('ProjectsEntity', {
    joinColumn: 'project_id',
  })
  project: ProjectsEntity

  @OneToOne(() => AccountEntity)
  account!: AccountEntity;


}
