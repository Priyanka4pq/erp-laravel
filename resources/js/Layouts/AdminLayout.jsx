"use client";

import { AdminHeader } from "@/components/adminHeaderSideBar/header";
import AdminSidebar from "@/components/adminHeaderSideBar/sidebar";
import React, { useState } from "react";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AdminHeader toggleSidebar={toggleSidebar} />
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="pt-16 md:ml-64 transition-all duration-300 p-6">
                {children}
            </main>
        </div>
    );
}
