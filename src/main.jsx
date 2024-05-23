import ReactDOM from 'react-dom/client';
import Widget from '@hexlet/chatbot-v2';
import steps from '../__fixtures__/1.json';
import '@hexlet/chatbot-v2/styles';

const container = document.getElementById('root');
ReactDOM.createRoot(container)
    .render(Widget(steps));
