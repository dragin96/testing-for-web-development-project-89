import React from 'react';
import { render } from '@testing-library/react';
import App from "../src/App.jsx";
import '@testing-library/jest-dom';

describe('Main', () => {
    it('renders main component', () => {
        const screen1 = render(<App />);

        const widgetElement = screen1.getByText('Открыть Чат');
        expect(widgetElement).toBeInTheDocument();

    });
});
