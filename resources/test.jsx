import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './ErrorBoundary.jsx';

function TestApp() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Test App</h1>
      <p className="text-slate-600">If you see this, React is working!</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(
    <ErrorBoundary>
        <TestApp />
    </ErrorBoundary>
);
);
