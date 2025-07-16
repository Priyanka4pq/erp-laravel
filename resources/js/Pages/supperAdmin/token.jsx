import SupperAdminLayout from "@/Layouts/SupperAdminLayout";
import TokenLayout from "@/token/tokenLayout";
import React from "react";

function Token({ tokens, subAdmins }) {
    return (
        <SupperAdminLayout>
            <TokenLayout initialTokens={tokens} subAdmins={subAdmins} />
        </SupperAdminLayout>
    );
}

export default Token;
