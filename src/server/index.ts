import { setupWorker, rest } from 'msw';
import { Course } from '../common/types';
import Catalogue from './catalogue';
import { curriculum, addCourse } from './curriculum';

const worker = setupWorker(
    rest.get<Course[]>('/courses', (req, res, ctx) => res(ctx.json(Catalogue))),
    rest.get<Course[]>('/curriculum', (req, res, ctx) => res(ctx.json(curriculum))),
    rest.post('/curriculum/:courseId', (req, res, ctx) => {
        const { courseId } = req.params;
        const course = Catalogue.find(c => c.id === courseId);
        
        if (!course) {
            return res(ctx.status(404));
        }
        if (curriculum.find(c => c.id === courseId)) {
            return res(ctx.status(409));
        }
        const result = addCourse(course);
        return res(ctx.json(result));
    }),
);

export default worker;