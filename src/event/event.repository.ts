// event.repository.ts

import { EntityRepository, Repository } from 'typeorm';
import { Event } from './event.entity'; // Importe a entidade Event que você criou

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {}
