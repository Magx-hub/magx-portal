// # src/components/Header.jsx
import React from "react";
import { Box } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-400 shadow py-4 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex items-center gap-3">
        <Box className="w-8 h-8 text-indigo-100" />
        <div>
          <h1 className="text-lg font-bold">M <span className="text-indigo-200">E</span> C</h1>
          <p className="text-sm text-slate-900 mt-1">Friday Allowance calculator — for teacher welfare</p>
        </div>
      </div>
    </header>
  );
}