"use client";

import { X } from "lucide-react";

export default function PermissionModal({ group, onClose }) {
  if (!group) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          {group.feature}
        </h2>

        {/* Permissions List */}
        <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
          {group.permissions.map((perm, index) => (
            <li key={index}>{perm}</li>
          ))}
        </ul>

        {/* Close Button (optional) */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
