import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import PropTypes from "prop-types";

function TokenLayout({ initialTokens = [], subAdmins = [] }) {
    const [tokens, setTokens] = useState(initialTokens || []);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        token: "",
        status: "Active",
        sub_admin_id: "",
        token_limit: 0,
    });
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        console.log(initialTokens); // Check if createdAt exists now
    }, []);

    useEffect(() => {
        console.log("Initial Tokens:", initialTokens);
        console.log("Current Tokens State:", tokens);
    }, [initialTokens, tokens]);

    useEffect(() => {
        console.log("subAdmins:", subAdmins);
    }, [subAdmins]);

    const handleOpenAdd = () => {
        setFormData({
            id: null,
            token: "",
            status: "Active",
            sub_admin_id: "",
        });
        setIsEdit(false);
        setIsFormOpen(true);
    };

    const handleEdit = (token) => {
        if (!token) return;

        setFormData({
            id: token?.id || null,
            token: token?.token || "",
            status: token?.status || "Active",
            sub_admin_id: token?.sub_admin_id || "",
            token_limit: token?.token_limit || 0,
        });
        setIsEdit(true);
        setIsFormOpen(true);
    };
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this token?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(`/supper/tokens/${id}`);
            setTokens((prev) => prev.filter((t) => t.id !== id));
            toast.success("Token deleted successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete token.");
        }
    };

    // Update the handleFormSubmit function
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...formData,
                token_limit: parseInt(formData.token_limit) || 0,
                token_used: 0, // Initialize token_used for new tokens
            };

            if (isEdit) {
                const { data } = await axios.put(
                    `/supper/tokens/${formData.id}`,
                    payload
                );
                setTokens((prev) =>
                    prev.map((t) => (t.id === formData.id ? data.token : t))
                );
                toast.success("Token updated successfully!");
            } else {
                const { data } = await axios.post("/supper/tokens", payload);
                setTokens((prev) => [...prev, data.token]);
                toast.success("Token created successfully!");
            }

            setIsFormOpen(false);
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const REGEN_LIMIT = 3;
    const COOLDOWN_MS = 30000; // 30 seconds

    const generateRandomToken = () => {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    const regenerateToken = async (tokenId) => {
        try {
            const { data } = await axios.post(
                `/supper/tokens/${tokenId}/regenerate`
            );
            setTokens((prevTokens) =>
                prevTokens.map((t) => (t.id === tokenId ? data.token : t))
            );
            toast.success("Token regenerated!");
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to regenerate"
            );
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Token Management</h2>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                    <Plus size={16} />
                    Add Token
                </button>
            </div>
            {/* Token Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 border-b">#</th>
                            <th className="p-3 border-b">SubAdmin</th>
                            <th className="p-3 border-b">Token</th>
                            <th className="p-3 border-b">Status</th>
                            <th className="p-3 border-b">Created At</th>
                            <th className="p-3 border-b">Actions</th>
                            <th className="p-3 border-b">Token Limit</th>
                            <th className="p-3 border-b">Regen Left</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {tokens?.map((t, index) => (
                            <tr
                                key={t?.id || index}
                                className="hover:bg-gray-50"
                            >
                                <td className="p-3 border-b">{index + 1}</td>
                                <td className="p-3 border-b">
                                    {t?.sub_admin?.name || "N/A"}
                                </td>
                                <td className="p-3 border-b font-mono">
                                    {t?.token || "N/A"}
                                </td>
                                <td className="p-3 border-b">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${
                                            t?.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {t?.status}
                                    </span>
                                </td>
                                <td className="p-3 border-b">
                                    {t.createdAt || "N/A"}
                                </td>
                                <td className="p-3 border-b">
                                    <div className="flex gap-3 items-center">
                                        <Pencil
                                            size={16}
                                            className="text-blue-600 cursor-pointer"
                                            onClick={() => handleEdit(t)}
                                        />
                                        <Trash2
                                            size={16}
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => handleDelete(t.id)}
                                        />
                                        <button
                                            onClick={() =>
                                                regenerateToken(t.id)
                                            }
                                            className="text-xs px-2 py-1 rounded bg-yellow-200 text-yellow-800 hover:bg-yellow-300 disabled:opacity-50"
                                            disabled={
                                                t.regenCount >= REGEN_LIMIT
                                            }
                                        >
                                            Regenerate
                                        </button>
                                    </div>
                                </td>

                                <td className="p-3 border-b">
                                    {t.token_limit ? (
                                        <div>
                                            <span className="font-medium">
                                                {t.token_limit -
                                                    (t.token_used || 0)}
                                            </span>
                                            <span className="text-gray-500 text-xs ml-1">
                                                / {t.token_limit}
                                            </span>
                                        </div>
                                    ) : (
                                        "Unlimited"
                                    )}
                                </td>
                                <td className="p-3 border-b text-sm">
                                    <div className="space-y-1">
                                        <div>
                                            Regen:{" "}
                                            {REGEN_LIMIT - t.regenCount ?? 0}{" "}
                                            left
                                        </div>
                                        <div>
                                            Usage:{" "}
                                            {t.token_limit
                                                ? `${
                                                      t.token_limit -
                                                      (t.token_used || 0)
                                                  } left`
                                                : "Unlimited"}
                                        </div>
                                        {t.lastRegenAt &&
                                            Date.now() - t.lastRegenAt <
                                                COOLDOWN_MS && (
                                                <div className="text-xs text-gray-500">
                                                    {Math.ceil(
                                                        (COOLDOWN_MS -
                                                            (Date.now() -
                                                                t.lastRegenAt)) /
                                                            1000
                                                    )}
                                                    s cooldown
                                                </div>
                                            )}
                                    </div>
                                </td>
                            </tr>
                        ))} */}

                        {/* // Update the tokens mapping section in the table: */}
                        {tokens?.map((t, index) => (
                            <tr
                                key={t?.id || index}
                                className="hover:bg-gray-50"
                            >
                                <td className="p-3 border-b">{index + 1}</td>
                                <td className="p-3 border-b">
                                    {t?.sub_admin?.name || "N/A"}
                                </td>
                                <td className="p-3 border-b font-mono">
                                    {t?.token || "N/A"}
                                </td>
                                <td className="p-3 border-b">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${
                                            t?.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {t?.status || "N/A"}
                                    </span>
                                </td>
                                <td className="p-3 border-b">
                                    {t?.createdAt || "N/A"}
                                </td>
                                <td className="p-3 border-b">
                                    <div className="flex gap-3 items-center">
                                        <Pencil
                                            size={16}
                                            className="text-blue-600 cursor-pointer"
                                            onClick={() => handleEdit(t)}
                                        />
                                        <Trash2
                                            size={16}
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => handleDelete(t?.id)}
                                        />
                                        <button
                                            onClick={() =>
                                                regenerateToken(t?.id)
                                            }
                                            className="text-xs px-2 py-1 rounded bg-yellow-200 text-yellow-800 hover:bg-yellow-300 disabled:opacity-50"
                                            disabled={
                                                t?.regenCount >= REGEN_LIMIT
                                            }
                                        >
                                            Regenerate
                                        </button>
                                    </div>
                                </td>
                                <td className="p-3 border-b">
                                    {Number(t?.token_limit) > 0 ? (
                                        <div>
                                            <span className="font-medium">
                                                {Number(t?.token_limit || 0) -
                                                    Number(t?.token_used || 0)}
                                            </span>
                                            <span className="text-gray-500 text-xs ml-1">
                                                / {Number(t?.token_limit || 0)}
                                            </span>
                                        </div>
                                    ) : (
                                        "Unlimited"
                                    )}
                                </td>
                                <td className="p-3 border-b text-sm">
                                    <div className="space-y-1">
                                        <div>
                                            Regen:{" "}
                                            {REGEN_LIMIT -
                                                Number(t?.regenCount || 0)}{" "}
                                            left
                                        </div>
                                        <div>
                                            Usage:{" "}
                                            {Number(t?.token_limit) > 0
                                                ? `${
                                                      Number(
                                                          t?.token_limit || 0
                                                      ) -
                                                      Number(t?.token_used || 0)
                                                  } left`
                                                : "Unlimited"}
                                        </div>
                                        {t?.lastRegenAt &&
                                            Date.now() -
                                                new Date(t?.lastRegenAt) <
                                                COOLDOWN_MS && (
                                                <div className="text-xs text-gray-500">
                                                    {Math.ceil(
                                                        (COOLDOWN_MS -
                                                            (Date.now() -
                                                                new Date(
                                                                    t?.lastRegenAt
                                                                ))) /
                                                            1000
                                                    )}
                                                    s cooldown
                                                </div>
                                            )}
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {tokens.length === 0 && (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center text-gray-500 p-4"
                                >
                                    No tokens available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Token Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h3 className="text-xl font-semibold mb-4">
                            {isEdit ? "Edit Token" : "Add Token"}
                        </h3>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-sm">
                                    Token
                                </label>
                                <input
                                    type="text"
                                    name="token"
                                    value={formData.token}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        token: generateRandomToken(),
                                    }))
                                }
                                className="mt-1 text-xs text-blue-600 hover:underline"
                            >
                                Generate random token
                            </button>

                            <div>
                                <label className="block mb-1 text-sm">
                                    SubAdmin
                                </label>
                                <select
                                    name="sub_admin_id"
                                    value={formData.sub_admin_id}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                                >
                                    <option value="">Select SubAdmin</option>
                                    {subAdmins.map((admin) => (
                                        <option key={admin.id} value={admin.id}>
                                            {admin.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Expired">Expired</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 text-sm">
                                    Token Usage Limit
                                </label>
                                <input
                                    type="number"
                                    name="token_limit"
                                    value={formData.token_limit}
                                    onChange={handleInputChange}
                                    min="0"
                                    required
                                    className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                                    placeholder="How many times this token can be used"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Set how many times this token can be used (0
                                    for unlimited)
                                </p>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={
                                        !formData.token ||
                                        !formData.sub_admin_id
                                    }
                                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isEdit ? "Update" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Add this after your TokenLayout component definition and before the export
// Keep only the PropTypes validation:
TokenLayout.propTypes = {
    initialTokens: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            token: PropTypes.string,
            status: PropTypes.string,
            sub_admin: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
            }),
            token_limit: PropTypes.number,
            token_used: PropTypes.number,
            regenCount: PropTypes.number,
            lastRegenAt: PropTypes.string,
            createdAt: PropTypes.string,
        })
    ),
    subAdmins: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        })
    ),
};

// TokenLayout.defaultProps = {
//     initialTokens: [],
//     subAdmins: []
// };

export default TokenLayout;
