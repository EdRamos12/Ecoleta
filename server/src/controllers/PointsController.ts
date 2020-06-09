import knex from '../db/connection';
import {Request, Response, response} from 'express';

export default class PointsController {
    async index (req: Request, resp: Response) {
        const {city, state, items} = req.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('state', String(state))
        .distinct()
        .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.0.6:3333/uploads/${point.image}`
            }
        });
        
        return resp.json(serializedPoints);
    }

    async show (req: Request, resp: Response) {
        const { id } = req.params;
        const point = await knex('points').where('id', id).first();

        if (!point) {
            return resp.status(400).json({ message: 'Point not found'});
        }

        const serializedPoint =  {
            ...point,
            image_url: `http://192.168.0.6:3333/uploads/${point.image}`
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');
        return resp.json({ serializedPoint, items });
    }

    async create(req: Request, resp: Response)  {
        const { name, email, whatsapp, latitude, longitude, city, state, items } = req.body;
    
        const trx = await knex.transaction();
        
        const point = { 
            image: req.file.filename, 
            name, email, whatsapp, latitude, longitude, city, state }
    
        const inserted_ids = await trx('points').insert(point);
    
        const point_id = inserted_ids[0];
    
        const pointItems = items.split(',').map((item: string) => Number(item.trim())).map((item_id: number) => {
            return { item_id, point_id }
        });
        
        await trx('point_items').insert(pointItems);

        await trx.commit();
        
        return resp.json({ id: point_id, ... point });
    }
}