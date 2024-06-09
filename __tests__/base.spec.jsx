import {render, screen, fireEvent} from '@testing-library/react';
import getWidget from '@hexlet/chatbot-v2';
import steps from "../__fixtures__/1.json";
import '@testing-library/jest-dom';


const startButtonText = 'Открыть Чат';
describe('Chat Widget Tests', () => {
    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
        render(getWidget(steps));
    });

    const initializeChatUI = () => {
        const openChat = screen.getByText(startButtonText);
        fireEvent.click(openChat);

        return {
            header: screen.getByText('Виртуальный помощник'),
            firstMessages: screen.getByText(steps[0].messages[0]),
            buttons: steps[0].buttons.map(button => screen.getByText(button.text))
        };
    };

    test('Init component', () => {
        const openChat = screen.getByText(startButtonText);
        expect(openChat).toBeVisible();
    });

    test('should open chat', () => {
        const { header, firstMessages, buttons } = initializeChatUI();

        expect(header).toBeVisible();
        expect(firstMessages).toBeVisible();
        expect(buttons[0]).toBeVisible();
        expect(buttons[1]).toBeVisible();
    });

    test('scroll to new messages', () => {
        initializeChatUI();

        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
    });

    test('open and close modal', () => {
        const { header } = initializeChatUI();
        expect(header).toBeVisible();

        const closeButton = screen.getByLabelText('Close');
        fireEvent.click(closeButton);
        expect(header).not.toBeVisible();
    });
});
