import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import Catalogue from '../screens/Catalogue';
import store from '../state/store';
import { Course } from '../common/types';

const server = setupServer(
    rest.get('/course', (req, res, ctx) => res(ctx.json([]))),
);

const Wrapper = ({children}: {children: JSX.Element}) => <Provider store={store}>{children}</Provider>;

const renderWithWrapper = (component: JSX.Element) => render(component, { wrapper: Wrapper });

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
            rest.get('/course', (req, res, ctx) => res(ctx.status(500)))
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
            rest.get('/course', (req, res, ctx) => res(ctx.json(courses))) 
        );

        renderWithWrapper(<Catalogue />);
        await waitFor(() => { screen.getByRole('main'); });
        const courseItems = screen.queryAllByTestId(/course-test-\d/);
        expect(courseItems).toHaveLength(3);
        expect(
            courseItems.map(i => i.getAttribute('data-testid'))
        ).toEqual(expect.arrayContaining(['course-test-1', 'course-test-2', 'course-test-3']))
    });
});