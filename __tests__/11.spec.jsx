import { render } from '@testing-library/react';
import Widget from "@hexlet/chatbot-v2";
import steps from "@hexlet/chatbot-v2/example-steps";
import '@hexlet/chatbot-v2/styles';

describe('Main', () => {
    it('renders main component', () => {
        render(Widget(steps));
    });
});
