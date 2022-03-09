import React from 'react';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Catalogue from '../screens/Catalogue';
import catalogueReducer from '../state/features/catalogue/reducers';

const server = setupServer(
    rest.get('/catalogue', (req, res, ctx) => res(ctx.json([]))),
);

const store = configureStore({ reducer: { catalogue: catalogueReducer } });

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
});