exports.up = async function (knex) {
    await knex.raw(`
        create table properties(
            id bigserial primary key,
            ns varchar(255),
            key varchar(255),
            value jsonb,
            created_at timestamp default now(),
            updated_at timestamp
        )
    `)
};

exports.down =async function (knex) {
    await knex.raw(`
        drop table properties
    `)
};
