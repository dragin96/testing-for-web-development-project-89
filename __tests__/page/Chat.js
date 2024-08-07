/* eslint-disable jest/no-standalone-expect */
import { fireEvent } from '@testing-library/react';

const startButtonText = 'Открыть Чат';

export default class ChatPageObject {
  constructor(screen, steps) {
    this.screen = screen;
    this.steps = steps;
  }

  // Открытие чата
  openChat() {
    fireEvent.click(this.screen.getByText(startButtonText));
    this.header = this.screen.getByText('Виртуальный помощник');
    this.firstMessages = this.screen.getByText(this.steps[0].messages[0]);
    this.buttons = this.steps[0].buttons.map((button) => this.screen.getByText(button.text));
  }

  // Проверка на видимость чата и его элементов
  verifyChatOpened() {
    expect(this.header).toBeVisible();
    expect(this.firstMessages).toBeVisible();
    this.buttons.forEach((button) => expect(button).toBeVisible());
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
  // eslint-disable-next-line class-methods-use-this
  verifyAutoScroll() {
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  }

  clickAnswer(answer) {
    const buttonAnswer = this.screen.getByRole('button', { name: answer });
    fireEvent.click(buttonAnswer);
  }

  expectNextMessages(text, countMessages = 1) {
    const messages = this.screen.getAllByText(text);

    expect(messages).toHaveLength(countMessages);
    expect(messages[countMessages - 1]).toBeVisible();
  }
}
