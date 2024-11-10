'use client';
import { useState } from 'react';

export default function ProjectWorkspace() {
  const [activeTab, setActiveTab] = useState('images');

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('images')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'images'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Images
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'images' ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">
              Drag and drop images here or click to upload
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Upload Images
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Video Duration (seconds)
              </label>
              <input
                type="number"
                min="1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                         shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter duration"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Transition Effect
              </label>
              <select className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                               shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>Fade</option>
                <option>Slide</option>
                <option>Zoom</option>
              </select>
            </div>
            <div className="pt-4">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg 
                               hover:bg-blue-600 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}