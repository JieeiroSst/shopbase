
exports.up =async function(knex) {
  await knex.raw(`
      create table products(
        id bigserial primary key,
        shopbase_data jsonb,
        created_at timestamp,
        updated_at timestamp,
        shop varchar(255),
        imported_at timestamp,
        imported_via varchar(255),
        shopbase_id bigint,
        sales_count int,
        recent_sales_count int,
        rating int,
        view_count int,
        published_at timestamp,
        handle varchar(255)
      )
  `)
};

exports.down =async function(knex) {
  await knex.raw(`
      drop table products;
  `)
};
