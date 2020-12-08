exports.up = async function (knex) {
  await knex.raw(`
        create table shopbase_stores(
            id bigserial primary key,
            shop varchar(255) not null,
            created_at timestamp default now(),
            installed_at timestamp default now(),
            info jsonb,
            values jsonb,
            google_sync jsonb
        )
    `);
};

exports.down = async function (knex) {
  await knex.raw(`
        drop table shopbase_stores,
    `);
};
