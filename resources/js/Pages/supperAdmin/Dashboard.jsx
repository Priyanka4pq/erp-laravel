import React from 'react';
import SupperAdminLayout from '@/Layouts/SupperAdminLayout';

export default function Dashboard() {

  return(
  <SupperAdminLayout>
    <div className="text-2xl font-bold text-gray-800">
      Hello Supper Admin Dashboard
    </div>
  </SupperAdminLayout> 
)}


// import React from 'react';
// import SupperAdminLayout from '@/Layouts/SupperAdminLayout';

// export default function Dashboard() {
//   return <div>Welcome, Supper Admin!</div>;
// }

// Dashboard.layout = (page) => <SupperAdminLayout>{page}</SupperAdminLayout>;
