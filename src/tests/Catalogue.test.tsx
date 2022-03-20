import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Catalogue from '../screens/Catalogue';
import { Course } from '../common/types';
import renderWithWrapper from './Wrapper';

const server = setupServer(
    rest.get('/courses', (req, res, ctx) => res(ctx.json([]))),
    rest.get('/curriculum', (req, res, ctx) => res(ctx.json([]))),
);

describe("Comportamiento de Catalogue", () => {
    beforeAll(() => {
        server.listen()
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => {
        server.close();
    })

    it("Debe mostrar un mensaje cuando no hay cursos disponibles", async () => {
        renderWithWrapper(<Catalogue />);
        await (waitFor(() => { screen.getByRole('main'); }))
        expect(screen.getByText('No hay cursos disponibles')).toBeInTheDocument();
    });

    it("Debe mostrar un mensaje de error cuando el catálogo no puede ser descargado", async () => {
        server.use(
            rest.get('/courses', (req, res, ctx) => res(ctx.status(500)))
        );
        renderWithWrapper(<Catalogue />);
        await waitFor(() => { screen.getByRole('alert'); });
        expect(screen.getByRole('alert')).toHaveTextContent('Ha habido un error al cargar el catálogo');
    });

    it("Debe listar los cursos dentro de un catálogo", async () => {
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
            {
                id: 'test-3',
                name: 'Test Course Three',
                description: 'Test description'
            }
        ];
        server.use(
            rest.get('/courses', (req, res, ctx) => res(ctx.json(courses))) 
        );

        renderWithWrapper(<Catalogue />);
        await waitFor(() => { screen.getByRole('main'); });
        const courseItems = screen.queryAllByTestId(/^course-test-\d$/);
        expect(courseItems).toHaveLength(3);
        expect(
            courseItems.map(i => i.getAttribute('data-testid'))
        ).toEqual(expect.arrayContaining(['course-test-1', 'course-test-2', 'course-test-3']))
    });

    it("Debe añadir un curso al currículum al hacer click en el botón apropiado y deshabilitarlo", async () => {
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

        renderWithWrapper(<Catalogue />);
        await waitFor(() => { screen.getByRole('main'); });
        fireEvent.click(screen.getByTestId('add-course-test-1'));
        await waitFor(() => { screen.getByTestId('added-course-test-1'); });
        const addCourseOne = screen.queryByTestId('add-course-test-1');
        expect(addCourseOne).not.toBeInTheDocument();
    });
});