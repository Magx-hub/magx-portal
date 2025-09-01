// Navigation.js
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teacher Module</h1>
        <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
          Menu
        </button>
      </header>

      {/* Main Functional Section */}
      <main className="flex-1 overflow-y-auto p-4">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/teachers" component={Teachers} />
            {/* Add more routes as needed */}
          </Switch>
        </BrowserRouter>
      </main>

      {/* Analytics Section */}
      <section className="bg-white p-4 border-t border-gray-200">
        <h2 className="text-xl font-bold">Analytics</h2>
        {/* Add analytics components here */}
      </section>
    </div>
  );
};

export default Navigation;