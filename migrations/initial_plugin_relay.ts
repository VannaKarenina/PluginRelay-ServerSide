import { Migration } from '@mikro-orm/migrations';

export class initial_plugin_relay extends Migration {

  async up(): Promise<void> {

    const knex = this.ctx ?? this.driver.getConnection("write").getKnex();

    await knex.schema.createTable('accounts', table => {
      table.increments('id').primary();
      table.string('login');
      table.string('email');
      table.string('password');
      table.integer('status').defaultTo(0);
      table.string('avatar').defaultTo('event2_img.png');
      table.integer('moderation_level').defaultTo(0)
    })

    await knex.schema.createTable('projects_category', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.string('image');
    })

    await knex.schema.createTable('projects', table => {
      table.increments('id').primary();
      table.integer('account_id')
        .references('id')
        .inTable('accounts')
        .index();
      table.string('name');
      table.integer('category_id')
        .references('id')
        .inTable('projects_category')
        .index();
      table.string('favicon_path').nullable();
      table.string('description');
      table.integer('downloads').defaultTo(0);
      table.timestamps(true,true);
    })

    await knex.schema.createTable('projects_scores', table => {
      table.increments('id').primary();
      table.integer('project_id')
        .references('id')
        .inTable('projects')
        .index();
      table.integer('account_id')
        .references('id')
        .inTable('accounts')
        .index();
      table.integer('score');
    })

    await knex.schema.createTable('projects_versions', table => {
      table.increments('id').primary();
      table.integer('project_id')
        .references('id')
        .inTable('projects')
        .index();
      table.string('name');
      table.string('version');
      table.string('description');
      table.string('storage');
      table.timestamps(true, true);
    })

    await knex.schema.createTable('projects_tags', table => {
      table.increments('id').primary();
      table.integer('project_id')
        .references('id')
        .inTable('projects')
        .index();
      table.string('tag');
    })

  }

  async down(): Promise<void> {
    const knex = this.ctx ?? this.driver.getConnection("write").getKnex();
    await knex.schema.dropTableIfExists('projects_tags').options({force: true});
    await knex.schema.dropTableIfExists('projects_versions').options({force: true});
    await knex.schema.dropTableIfExists('projects_scores').options({force: true});
    await knex.schema.dropTableIfExists('projects').options({force: true});
    await knex.schema.dropTableIfExists('projects_category').options({force: true});
    await knex.schema.dropTableIfExists('accounts').options({force: true});
  }

}
