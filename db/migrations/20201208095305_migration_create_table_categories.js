
exports.up =async function(knex) {
  await knex.raw(`
    create table google_categories(
        id bigserial primary key,
        type varchar(255),
        category varchar(255),
        shop varchar(255),
        created_at timestamp DEFAULT now(),
        updated_at timestamp DEFAULT now()
    );
  `)
};

exports.down =async function(knex) {
  await knex.raw(`
    drop table google_categories;
  `)
};
