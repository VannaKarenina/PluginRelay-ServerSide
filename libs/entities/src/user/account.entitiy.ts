import {Exclude, Expose, Transform} from "class-transformer";
import {Collection, Entity, LoadStrategy, OneToMany, OneToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {ProjectsEntity} from "../projects/projects.entity";
import {ProjectsScoresEntity} from "../projects/project_scores.entity";

@Entity({
  tableName: 'accounts'
})
@Exclude()
export class AccountEntity {

  @PrimaryKey()
  @Expose()
  id!: number;

  @Property()
  @Expose()
  login: string;

  @Property()
  @Expose()
  email: string;

  @Property()
  @Expose()
  password: string;

  @Property({default: 0})
  @Expose()
  status: number;

  @Property({nullable: true})
  @Expose()
  avatar: string;

  @Property({default: 0})
  @Expose()
  moderation_level: number;

  @OneToMany('ProjectsEntity', 'account', {
    orphanRemoval: true,
    strategy: LoadStrategy.JOINED,
    mappedBy: 'account',
  })
  @Expose({groups: ['list']})
  @Transform(
    ({value}) => (value?.isInitialized() && value?.getItems()) || [],
    {
      toPlainOnly: true,
    }
  )
  projects = new Collection<ProjectsEntity>(this);

  @OneToOne(() => ProjectsScoresEntity, score => score.account)
  scores!: ProjectsScoresEntity;


}
