import {render, screen} from '@testing-library/react';
import getWidget from '@hexlet/chatbot-v2';
import steps from "../__fixtures__/1.json";
import '@testing-library/jest-dom';
import {ChatPageObject} from "./page/Chat.js";

describe('Chat Widget Tests', () => {
    let chatPage;

    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
        render(getWidget(steps));
        chatPage = new ChatPageObject(screen, steps);
    });

    test('Chat components should be visible on open', () => {
        chatPage.openChat();
        chatPage.verifyChatOpened();
    });

    test('Chat should auto-scroll to new messages', () => {
        chatPage.openChat();
        chatPage.verifyAutoScroll();
    });

    test('Chat can be opened and then closed', () => {
        chatPage.openChat();
        chatPage.verifyChatOpened();

        chatPage.closeChat();
        chatPage.verifyChatClosed();
    });
});
