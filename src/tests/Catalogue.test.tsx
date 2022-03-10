import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import Catalogue from '../screens/Catalogue';
import store from '../state/store';

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

    it("Debe mostrar un mensaje cuando no hay cursos disponibles", () => {
        renderWithWrapper(<Catalogue />);
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
});