import { render, screen } from '@testing-library/react';
import getWidget from '@hexlet/chatbot-v2';
import steps from '../__fixtures__/2.json';
import '@testing-library/jest-dom';
import ChatPageObject from './page/Chat.js';

describe('Chat Widget Tests', () => {
  let chatPage;
  const buttonStart = steps[0].buttons[0].text;

  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(getWidget(steps));
    chatPage = new ChatPageObject(screen, steps);
  });

  test('Handle loops and repeat messages', async () => {
    await allure.description(
        "This test attempts to log into the website using a login and a password. Fails if any error happens.\n\nNote that this test does not test 2-Factor Authentication.",
    );

    const buttonToLoops = steps[1].buttons[2].text;
    const messagesLoopsStep = steps[1].messages[0];
    await allure.step('Открыть чат', async () => {
      chatPage.openChat();
    });
    await allure.step('Проверяем, что чат открылся', async () => {
      chatPage.verifyChatOpened();
    });
    chatPage.clickAnswer(buttonStart);
    chatPage.expectNextMessages(messagesLoopsStep, 1);
    chatPage.clickAnswer(buttonToLoops);
    chatPage.expectNextMessages(messagesLoopsStep, 2);
    chatPage.clickAnswer(buttonToLoops);
    chatPage.expectNextMessages(messagesLoopsStep, 4);
  });

  test('Navigate through steps', () => {
    const chatSteps = [
      {
        button: buttonStart,
        expectMessages: steps[0].messages[0],
      },
      {
        button: steps[1].buttons[0].text,
        expectMessages: steps[1].messages[0],
      },
      {
        button: steps[2].buttons[0].text,
        expectMessages: steps[2].messages[0],
      },
      {
        expectMessages: steps[3].messages[0],
      },
    ];

    chatPage.openChat();
    chatPage.verifyChatOpened();

    for (const { expectMessages, button } of chatSteps) {
      if (button) {
        chatPage.clickAnswer(button);
      }
      chatPage.expectNextMessages(expectMessages);
    }
  });
});
