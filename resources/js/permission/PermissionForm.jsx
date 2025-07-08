"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";


export default function PermissionForm({ onClose, onSave, editData = null }) {
  const [feature, setFeature] = useState(editData?.feature || "");
  const [permissions, setPermissions] = useState(editData?.permissions || [""]);
  const [error, setError] = useState("");

  const handlePermissionChange = (index, value) => {
    const updated = [...permissions];
    updated[index] = value;
    setPermissions(updated);
    if (error) setError("");
  };

  const handleAddField = () => {
    setPermissions([...permissions, ""]);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const validPermissions = permissions.filter((val) => val.trim() !== '');
  //   if (feature.trim() === '' || validPermissions.length === 0) {
  //     setError('Feature and at least one permission are required.');
  //     return;
  //   }

  //   const newEntry = {
  //     feature: feature.trim(),
  //     permissions: validPermissions,
  //   };

  //   onSave(newEntry, editData?.index ?? null); // Pass index if editing
  //   onClose();
  // };

  // Send to parent component
  // onSave({
  //   feature: feature.trim(),
  //   permissions: validPermissions,
  // });

  // Reset
  //   onClose();
  //   setFeature("");
  //   setPermissions([""]);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const validPermissions = permissions.filter((val) => val.trim() !== "");
  //   if (feature.trim() === "" || validPermissions.length === 0) {
  //     setError("Feature and at least one permission are required.");
  //     return;
  //   }

  //   const newEntry = {
  //     feature: feature.trim(),
  //     permissions: validPermissions,
  //   };

  //   onSave(newEntry, editData?.index ?? null); // ✅ Pass index if editing
  //   onClose();

  //   console.log('New Entry:', newEntry);
    
  // };
  
const handleSubmit = async (e) => {
  e.preventDefault(); // ✅ prevent reload

  const validPermissions = permissions.filter(p => p.trim() !== '');
  if (!feature.trim() || validPermissions.length === 0) {
    setError("Feature and at least one permission are required.");
    return;
  }

  try {
    const response = await axios.post("http://127.0.0.1:8000/supper/permission", {
      feature: feature.trim(),
      permissions: validPermissions,
    }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("Saved:", response.data);
    onSave?.(response.data.data, editData?.index ?? null); // ✅ update parent
    onClose?.(); // ✅ close form
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  }
};


  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-lg z-50"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Add Permissions
          </h2>
          <button onClick={onClose}>
            <X className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Feature Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Feature / Module Name
            </label>
            <input
              type="text"
              placeholder="e.g., User Management"
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            />
          </div>

          {/* Permission Inputs */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Permissions
            </label>
            {permissions.map((value, index) => (
              <input
                key={index}
                type="text"
                placeholder="Write your permission here"
                value={value}
                onChange={(e) => handlePermissionChange(index, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              />
            ))}
            <button
              type="button"
              onClick={handleAddField}
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <Plus size={18} />
              Add another permission
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
