import { Migration } from '@mikro-orm/migrations';

export class initial_plugin_relay extends Migration {

  async up(): Promise<void> {

    const knex = this.ctx ?? this.driver.getConnection("write").getKnex();

    await knex.schema.createTable('accounts', table => {
      table.increments('id').primary();
      table.string('login');
      table.string('email');
      table.string('password');
      table.string('status').defaultTo('pending');
      table.string('avatar').nullable();
      table.integer('moderation_level').defaultTo(0)
    })

    await knex.schema.createTable('projects', table => {
      table.increments('id').primary();
      table.integer('account_id')
        .references('id')
        .inTable('accounts')
        .index();
      table.string('name');
      table.string('favicon_path');
      table.string('description');
      table.integer('downloads').defaultTo(0);
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
      table.string('version');
      table.string('description');
      table.string('storage_path');
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

}
