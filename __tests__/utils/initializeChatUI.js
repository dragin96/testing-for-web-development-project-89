import {fireEvent, screen} from "@testing-library/react";
import {startButtonText} from "./constants.js";
import steps from "../../__fixtures__/1.json";

export const initializeChatUI = () => {
    const openChat = screen.getByText(startButtonText);
    fireEvent.click(openChat);

    return {
        header: screen.getByText('Виртуальный помощник'),
        firstMessages: screen.getByText(steps[0].messages[0]),
        buttons: steps[0].buttons.map(button => screen.getByText(button.text))
    };
};
