import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('items').insert([
        { title: 'Lamps', image: 'lamps.svg'},
        { title: 'Batteries', image: 'batteries.svg'},
        { title: 'Paper and cardboard', image: 'paper-cardboard.svg'},
        { title: 'Electronic waste', image: 'electronics.svg'},
        { title: 'Organic waste', image: 'organic.svg'},
        { title: 'Kitchen oil', image: 'oil.svg'},
    ]);
}