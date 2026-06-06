import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './ErrorBoundary.jsx';
import App from './app-component.jsx';

// Ensure React is available globally
window.React = React;

ReactDOM.createRoot(document.getElementById('app')).render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);
