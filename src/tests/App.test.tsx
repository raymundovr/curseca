import React from 'react';
import { screen, waitFor, fireEvent, within } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Course } from '../common/types';
import App from '../App';
import renderWithWrapper from './Wrapper';

const server = setupServer(
    rest.get('/courses', (req, res, ctx) => res(ctx.json([]))),
    rest.get('/curriculum', (req, res, ctx) => res(ctx.json([]))),
);

describe("Comportamiento de la Aplicación", () => {
    beforeAll(() => {
        server.listen()
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => {
        server.close();
    });

    it("Debe añadir un curso al currículum al hacer click en el botón +, deshabilitarlo y aumentar el conteo de mis cursos", async () => {
        const courses: Course[] = [
            {
                id: 'test-1',
                name: 'Test Course One',
                description: 'Test description'
            },
            {
                id: 'test-2',
                name: 'Test Course Two',
                description: 'Test description'
            },
        ];
        server.use(
            rest.get('/courses', (req, res, ctx) => res(ctx.json(courses))),
            rest.post('/curriculum/:courseId', (req, res, ctx) => {
                return res(ctx.json([
                    {
                        id: 'test-1',
                        name: 'Test Course One',
                        description: 'Test description'
                    }
                ]))
            }),
        );

        renderWithWrapper(<App />);
        await waitFor(() => { screen.getByRole('main'); });
        fireEvent.click(screen.getByTestId('add-course-test-1'));
        await waitFor(() => { screen.getByTestId('added-course-test-1'); });
        const addCourseOne = screen.queryByTestId('add-course-test-1');
        expect(addCourseOne).not.toBeInTheDocument();
        const badge = screen.getByTestId('mycourses-badge');
        const count = within(badge).getByText("1");
        expect(count).toBeDefined();
    });
});