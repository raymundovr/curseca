import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../state/store';

const Wrapper = ({children}: {children: JSX.Element}) => <Provider store={store}>{children}</Provider>;

const renderWithWrapper = (component: JSX.Element) => render(component, { wrapper: Wrapper });

export default renderWithWrapper;
