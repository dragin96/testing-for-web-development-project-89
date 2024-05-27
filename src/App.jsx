import Widget from "@hexlet/chatbot-v2";
import steps from "../__fixtures__/1.json";
import React from 'react'

export default function App() {
    return (
        <div>
        <h1>App</h1>
            {Widget(steps)}
        </div>
    );
}
