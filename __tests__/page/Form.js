import { fireEvent } from '@testing-library/react';

export default class Form {
  constructor(screen) {
    this.screen = screen;
  }

  // Метод для заполнения всех полей формы сразу
  fillForm({
    email, password, address, city, country, rulesAccepted,
  }) {
    this.fillField('Email', email);
    this.fillField('Пароль', password);
    this.fillField('Адрес', address);
    this.fillField('Город', city);
    this.fillField('Страна', country);
    if (rulesAccepted) {
      this.toggleCheckbox('Принять правила');
    }
  }

  fillField(label, value) {
    fireEvent.change(this.screen.getByLabelText(label), { target: { value } });
  }

  toggleCheckbox(label) {
    fireEvent.click(this.screen.getByLabelText(label));
  }

  submitForm() {
    fireEvent.click(this.screen.getByText('Зарегистрироваться'));
  }

  // Метод для проверки значений формы одновременно
  verifyFormSubmission(formData) {
    for (let i = 0; i < Object.entries(formData).length; i += 1) {
      const [field, value] = Object.entries(formData)[i];
      expect(this.screen.getByText(field).nextSibling).toHaveTextContent(value);
    }
    expect(this.screen.getByRole('table')).toBeInTheDocument();
  }
}
