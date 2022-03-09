import { setupWorker, rest } from 'msw';
import { Course } from '../common/types';
import Catalogue from './catalogue';

const worker = setupWorker(
    rest.get<Course[]>('/course', (req, res, ctx) => res(ctx.json(Catalogue))),
);

export default worker;