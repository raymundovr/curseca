import React from 'react';
import { render, screen } from '@testing-library/react';
import Catalogue from '../screens/Catalogue';

describe("Comportamiento de Catalogue", () => {
    it("Debe mostrar un mensaje cuando no hay catálogos disponibles", () => {
        render(<Catalogue />);
        expect(screen.getByText('No hay cursos disponibles')).toBeDefined();
    });
});