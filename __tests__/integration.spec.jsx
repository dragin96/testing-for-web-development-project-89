import {render, screen} from "@testing-library/react";
import App from "../src/App.jsx";
import {startButtonText} from "./utils/constants.js";
import React from "react";
import '@testing-library/jest-dom';
import {faker} from "@faker-js/faker";
import {Form} from "./page/Form.js";
import {ChatPageObject} from "./page/Chat.js";

describe('Integration App', () => {
    beforeEach(() => {
       render(<App />);
       window.HTMLElement.prototype.scrollIntoView = jest.fn();
    });
    test('Render App(widget + form)', () => {
        const buttonWidget = screen.getByText(startButtonText);
        const form = screen.getByTestId('myForm');

        expect(buttonWidget).toBeVisible();
        expect(form).toBeVisible();
    });

    test('Submits the form and displays results', () => {
        const form = new Form(screen);

        // Генерируем тестовые данные и формируем объект данных формы
        const formData = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            country: 'Россия',
            rulesAccepted: true
        };

        form.fillForm(formData);
        form.submitForm();

        // Проверяем, что данные отправлены корректно
        form.verifyFormSubmission({
            'Email': formData.email,
            'Пароль': formData.password,
            'Адрес': formData.address,
            'Город': formData.city,
            'Страна': formData.country,
            'Принять правила': String(formData.rulesAccepted)
        });
    });
    test('Submits the form and displays results', () => {
        const form = new Form(screen);
        const widget = new ChatPageObject(screen)

        const formData = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            rulesAccepted: true
        };

        form.fillForm(formData);

        widget.openChat();
        widget.clickAnswer('Узнать о продукте');
        widget.expectNextMessages('Наш продукт - это передовое решение для управления задачами.')
        widget.clickAnswer('Получить демо');
        widget.expectNextMessages('Спасибо за интерес к нашему продукту! Мы свяжемся с вами для демонстрации.');
        widget.closeChat();

        form.submitForm();
        form.verifyFormSubmission({
            'Email': formData.email,
            'Пароль': formData.password,
            'Принять правила': String(formData.rulesAccepted)
        });
    });
})
