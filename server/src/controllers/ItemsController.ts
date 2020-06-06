import knex from '../db/connection';
import {Request, Response} from 'express';

export default class ItemsController {
    async index(req: Request, resp: Response) {
        const items = await knex('items').select('*');
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.0.6:3333/uploads/${item.image}`
            };
        });
        return resp.json(serializedItems);
    }
}