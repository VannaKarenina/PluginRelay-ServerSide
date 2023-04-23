import {Exclude, Expose, Transform} from "class-transformer";
import {Collection, Entity, LoadStrategy, ManyToOne, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import {AccountEntity} from "../user/account.entitiy";
import {ProjectsScoresEntity} from "./project_scores.entity";

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
  description: string;

  @Property({default: 0})
  @Expose()
  downloads: string;

  @OneToMany('ProjectsScoresEntity', 'project', {
    orphanRemoval: true,
    strategy: LoadStrategy.JOINED,
    mappedBy: 'project',
  })
  @Expose({groups: ['list']})
  @Transform(
    ({value}) => (value?.isInitialized() && value?.getItems()) || [],
    {
      toPlainOnly: true,
    }
  )
  scores = new Collection<ProjectsScoresEntity>(this);

  @ManyToOne('AccountEntity', {
    joinColumn: 'account_id',
  })
  account: AccountEntity


}
