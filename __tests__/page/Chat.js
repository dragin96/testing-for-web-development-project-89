import {fireEvent} from "@testing-library/react";
import steps from "../../__fixtures__/1.json";
import {startButtonText} from "../utils/constants.js";

export class ChatPageObject {
    constructor(screen) {
        this.screen = screen;
    }

    // Открытие чата
    openChat() {
        fireEvent.click(this.screen.getByText(startButtonText));
        this.header = this.screen.getByText('Виртуальный помощник');
        this.firstMessages = this.screen.getByText(steps[0].messages[0]);
        this.buttons = steps[0].buttons.map(button => this.screen.getByText(button.text));
    }

    // Проверка на видимость чата и его элементов
    verifyChatOpened() {
        expect(this.header).toBeVisible();
        expect(this.firstMessages).toBeVisible();
        this.buttons.forEach(button => expect(button).toBeVisible());
    }

    // Закрытие чата
    closeChat() {
        fireEvent.click(this.screen.getByLabelText('Close'));
    }

    // Проверка на скрытие чата
    verifyChatClosed() {
        expect(this.header).not.toBeVisible();
    }

    // Проверка функционала автоматического скролла к новому сообщению
    verifyAutoScroll() {
        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    }


    clickAnswer(answer) {
        const buttonAnswer = this.screen.getByRole('button', { name: answer })
        fireEvent.click(buttonAnswer);
    }

    expectNextMessages(text) {
        const messages = this.screen.getByText(text);
        expect(messages).toBeVisible();
    }
}

