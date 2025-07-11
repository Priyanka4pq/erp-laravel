// // 'use client'

// // import Sidebar from '@/layout/Sidebar';

// // export default function PermissionPage() {
// //   const permissions = {
// //     dashboard: true,
// //     performance: true,
// //     manageUsers: true,
// //     api: true,            // ✅ Show API
// //     apiAccess: true,      // ✅ Show API Management
// //     permission: true,
// //   };

// //   return (
// //     <div className="flex">
// //       {/* <Sidebar permissions={permissions} /> */}
// //       <main className="flex-1 p-6">
// //         <h1 className="text-2xl font-bold">Permission Page</h1>

// //       </main>
// //     </div>
// //   );
// // }

// // 'use client'

// // pages/permissions.js
// // import { useState } from 'react';
// // import PermissionForm from '@/components/permission/PermissionForm';
// // export default function PermissionsPage() {
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// // Sample data for permissions (replace with API call or state management)
// // const permissions = [
// //   { module: 'About Page', role: 'Admin', permissions: ['View', 'Edit'] },
// //   { module: 'Dashboard', role: 'Editor', permissions: ['View'] },
// // ];

// // return (
// //   <div className="container mx-auto p-4">
// //     <h1 className="text-2xl font-bold mb-4">Permissions</h1>
// //     <div className="flex flex-col md:flex-row gap-4">
// // {
// /* Left Side: Permissions List */
// // }
// // <div className="w-full md:w-1/2">
// //   <h2 className="text-xl font-semibold mb-2">Existing Permissions</h2>
// //   <ul className="space-y-2">
// //     {permissions.map((perm, index) => (
// //       <li key={index} className="p-4 bg-gray-100 rounded-lg">
// //         <p><strong>Module:</strong> {perm.module}</p>
// //         <p><strong>Role:</strong> {perm.role}</p>
// //         <p><strong>Permissions:</strong> {perm.permissions.join(', ')}</p>
// //       </li>
// //     ))}
// //   </ul>
// // </div>

// // {
// /* Right Side: Create Permission Button */
// // }
// //   <div className="w-full md:w-1/2 flex justify-end">
// //     <button
// //       onClick={() => setIsModalOpen(true)}
// //       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //     >
// //       Create Permission
// //     </button>
// //   </div>
// // </div>

// // {
// /* Modal for Creating Permission */
// // }
// //       {isModalOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white p-6 rounded-lg w-full max-w-md">
// //             <h2 className="text-xl font-semibold mb-4">Create New Permission</h2>
// //             <PermissionForm onClose={() => setIsModalOpen(false)} />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // "use client";

// // import { useState } from "react";
// // import PermissionForm from "@/components/permissionform";
// // import PermissionForm from "@/components/permission/PermissionForm";
// // import { TicketCheck } from "lucide-react";

// // export default function PermissionPage() {
// //   const [showForm, setShowForm] = useState(false);
// //   const [permissions, setPermissions] = useState([]);

// //   const handleSave = (newPermissions) => {
// //     setPermissions([...permissions, ...newPermissions]);
// //   };

// //   return (
// //     <div className="p-6 relative">
// //       <div className="flex justify-between items-center mb-4">
// //         <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
// //           Permissions
// //         </h1>
// //         <button
// //           onClick={() => setShowForm(true)}
// //           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
// //         >
// //           Add Permission
// //         </button>
// //       </div>

// // {/* Permission List */}
// // <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
// //   {permissions.length === 0 && <p>No permissions added yet.</p>}
// //   {permissions.map((perm, index) => (
// //     <li key={index}>{perm}</li>
// //   ))}
// // </ul>

// // {/* Drawer Form */}
// // {showForm && (
// //   <>
// //     <PermissionForm
// //             onClose={() => setShowForm(false)}
// //             onSave={handleSave}
// //           />
// //           <div
// //             className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
// //             onClick={() => setShowForm(false)}
// //           />
// //         </>
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";

// import { Eye, Edit, Trash2 } from "lucide-react";
// import PermissionModal from "./PermissionModal";
// import PermissionForm from "./PermissionForm";

// export default function PermissionPage() {
//   const [showForm, setShowForm] = useState(false);
//   const [permissionGroups, setPermissionGroups] = useState([]);
//   const [viewGroup, setViewGroup] = useState(null);
//   const [editData, setEditData] = useState(null); // holds data + index

//   // Load data from localStorage on mount
//   useEffect(() => {
//     const stored = localStorage.getItem("permissionGroups");
//     if (stored) {
//       setPermissionGroups(JSON.parse(stored));
//     }
//   }, []);

//   // Save to localStorage on change
//   useEffect(() => {
//     localStorage.setItem("permissionGroups", JSON.stringify(permissionGroups));
//   }, [permissionGroups]);

//   // Save new entry
//   const handleSave = (data, index) => {
//     if (index !== null) {
//       // Edit existing
//       const updated = [...permissionGroups];
//       updated[index] = data;
//       setPermissionGroups(updated);
//     } else {
//       // Add new
//       setPermissionGroups((prev) => [...prev, data]);
//     }
//     setEditData(null); // clear edit state
//   };

//   // Delete entry by index
//   const handleDelete = (index) => {
//     const confirm = window.confirm(
//       "Are you sure you want to delete this permission group?"
//     );
//     if (confirm) {
//       const updated = [...permissionGroups];
//       updated.splice(index, 1);
//       setPermissionGroups(updated);
//     }
//   };

//   return (
//     <div className="p-6 relative">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
//           Permissions
//         </h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
//         >
//           Add Permission
//         </button>
//       </div>

//       {/* Permissions Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full table-auto border border-gray-200 dark:border-gray-700 text-sm">
//           <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
//             <tr>
//               <th className="px-4 py-3 border-b dark:border-gray-700 text-left">
//                 Module
//               </th>
//               <th className="px-4 py-3 border-b dark:border-gray-700 text-left">
//                 Permissions
//               </th>
//               <th className="px-4 py-3 border-b dark:border-gray-700 text-left">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {permissionGroups.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="3"
//                   className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
//                 >
//                   No permissions added yet.
//                 </td>
//               </tr>
//             ) : (
//               permissionGroups.map((group, index) => (
//                 <tr
//                   key={index}
//                   className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
//                 >
//                   <td className="px-4 py-3 text-gray-800 dark:text-white font-medium">
//                     {group.feature}
//                   </td>
//                   <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
//                     {group.permissions.join(", ")}
//                   </td>
//                   <td className="px-4 py-3 flex gap-3 text-indigo-600 dark:text-indigo-400">
//                     <button onClick={() => setViewGroup(group)} title="View">
//                       <Eye className="w-5 h-5 hover:text-blue-600" />
//                     </button>

//                     <button
//                       onClick={() =>
//                         setEditData({ ...group, index }) || setShowForm(true)
//                       }
//                       title="Edit"
//                     >
//                       <Edit className="w-5 h-5 hover:text-yellow-600" />
//                     </button>

//                     <button onClick={() => handleDelete(index)} title="Delete">
//                       <Trash2 className="w-5 h-5 hover:text-red-600" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Drawer */}

//       {viewGroup && (
//         <PermissionModal group={viewGroup} onClose={() => setViewGroup(null)} />
//       )}

//       {/* {showForm && (
//         <>
//           <PermissionForm
//             onClose={() => setShowForm(false)}
//             onSave={handleSave}
//           />
//           <div
//             className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
//             onClick={() => setShowForm(false)}
//           />
//         </>
//       )} */}

//       {showForm && (
//         <>
//           <PermissionForm
//             onClose={() => {
//               setShowForm(false);
//               setEditData(null);
//             }}
//             onSave={handleSave}
//             editData={editData}
//           />
//           <div
//             className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
//             onClick={() => {
//               setShowForm(false);
//               setEditData(null);
//             }}
//           />
//         </>
//       )}
//     </div>
//   );
// }

// pages/PermissionPage.jsx
"use client";

import { useEffect, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import PermissionModal from "./PermissionModal";
import PermissionForm from "./PermissionForm";
import Loader from "@/components/Loader";
export default function PermissionPage() {
    const [permissions, setPermissions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [viewGroup, setViewGroup] = useState(null);
    const [editData, setEditData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch permissions
    const fetchPermissions = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/supper/permission-list");
            setPermissions(response.data);
            setError("");
        } catch (err) {
            setError(
                err.response?.data?.error ||
                    "Failed to fetch permissions. Please try again."
            );
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPermissions();
    }, []);

    // Handle save (create or update)
    const handleSave = async (data, id) => {
        setLoading(true);
        try {
            if (id) {
                await axiosInstance.put(`/supper/permission/${id}`, data);
            } else {
                await axiosInstance.post("/supper/permission", data);
            }
            fetchPermissions();
            setShowForm(false);
            setEditData(null);
            setError("");
        } catch (err) {
            setError(
                err.response?.data?.error ||
                    "Failed to save permission. Please try again."
            );
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (
            window.confirm("Are you sure you want to delete this permission?")
        ) {
            setLoading(true);
            try {
                await axiosInstance.delete(`/supper/permission/${id}`);
                fetchPermissions();
                setError("");
            } catch (err) {
                setError(
                    err.response?.data?.error ||
                        "Failed to delete permission. Please try again."
                );
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Permissions
                </h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
                    disabled={loading}
                >
                    Add Permission
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    {error}
                </p>
            )}

            {/* Loader */}
            {loading && <Loader message="Processing..." />}

            {/* Permissions Table */}
            {!loading && (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-200 dark:border-gray-700 text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                            <tr>
                                <th className="px-4 py-3 border-b dark:border-gray-700 text-left">
                                    Module
                                </th>
                                <th className="px-4 py-3 border-b dark:border-gray-700 text-left">
                                    Permissions
                                </th>
                                <th className="px-4 py-3 border-b dark:border-gray-700 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        No permissions added yet.
                                    </td>
                                </tr>
                            ) : (
                                permissions.map((group) => (
                                    <tr
                                        key={group.id}
                                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                    >
                                        <td className="px-4 py-3 text-gray-800 dark:text-white font-medium">
                                            {group.feature}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                            {group.permissions.join(", ")}
                                        </td>
                                        <td className="px-4 py-3 flex gap-3 text-indigo-600 dark:text-indigo-400">
                                            <button
                                                onClick={() =>
                                                    setViewGroup(group)
                                                }
                                                title="View"
                                                disabled={loading}
                                            >
                                                <Eye className="w-5 h-5 hover:text-blue-600" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditData(group);
                                                    setShowForm(true);
                                                }}
                                                title="Edit"
                                                disabled={loading}
                                            >
                                                <Edit className="w-5 h-5 hover:text-yellow-600" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(group.id)
                                                }
                                                title="Delete"
                                                disabled={loading}
                                            >
                                                <Trash2 className="w-5 h-5 hover:text-red-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* View Modal */}
            {viewGroup && (
                <PermissionModal
                    group={viewGroup}
                    onClose={() => setViewGroup(null)}
                />
            )}

            {/* Form Drawer */}
            {showForm && (
                <>
                    <PermissionForm
                        onClose={() => {
                            setShowForm(false);
                            setEditData(null);
                        }}
                        onSave={handleSave}
                        editData={editData}
                        loading={loading}
                    />
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
                        onClick={() => {
                            setShowForm(false);
                            setEditData(null);
                        }}
                    />
                </>
            )}
        </div>
    );
}
