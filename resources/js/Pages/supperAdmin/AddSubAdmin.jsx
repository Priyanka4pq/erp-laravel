// 'use client'

// import { useState } from 'react'
// import { Plus } from 'lucide-react'
// import { motion } from 'framer-motion'
// import SupperAdminLayout from '@/Layouts/SupperAdminLayout'
// import AddUser from '@/form/addUser'
// // import AddUser from '@/components/sub-admin/addUser'
// // import img from 'next/img';
// export default function AddSubAdmin() {
//   const [isDrawerOpen, setDrawerOpen] = useState(false)
//   const [subAdmins, setSubAdmins] = useState([])
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortKey, setSortKey] = useState('name')
//   const [sortOrder, setSortOrder] = useState('asc')

//   const toggleDrawer = () => setDrawerOpen(!isDrawerOpen)

//   const handleAddSubAdmin = (newAdmin) => {
//     setSubAdmins(prev => [...prev, newAdmin])
//     toggleDrawer()
//   }

//   const handleSort = (key) => {
//     if (sortKey === key) {
//       setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
//     } else {
//       setSortKey(key)
//       setSortOrder('asc')
//     }
//   }

//   const filteredAndSortedAdmins = [...subAdmins]
//     .filter(admin =>
//       [admin.name, admin.email, admin.phone]
//         .some(field => field?.toLowerCase().includes(searchQuery.toLowerCase()))
//     )
//     .sort((a, b) => {
//       const valA = a[sortKey]?.toLowerCase?.() || ''
//       const valB = b[sortKey]?.toLowerCase?.() || ''
//       if (valA < valB) return sortOrder === 'asc' ? -1 : 1
//       if (valA > valB) return sortOrder === 'asc' ? 1 : -1
//       return 0
//     })

//   return (
//     <SupperAdminLayout>
//        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sub-Admins</h1>
//         <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
//           <input
//             type="text"
//             placeholder="Search by name, email, or phone..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="px-4 py-2 rounded border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
//           />
//           <button
//             onClick={toggleDrawer}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
//           >
//             <Plus className="w-4 h-4" />
//             Add User
//           </button>
//         </div>
//       </div>

//       {/* Show Sub-Admins Table */}
//       {filteredAndSortedAdmins.length > 0 ? (
//         <div className="overflow-auto rounded-lg shadow border dark:border-gray-700">
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead className="bg-gray-100 dark:bg-gray-800">
//               <tr>
//                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300">#</th>
//                 <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Avatar</th>
//                 {['name', 'email', 'phone', 'dob', 'ip', 'address'].map((key) => (
//                   <th
//                     key={key}
//                     onClick={() => handleSort(key)}
//                     className="px-4 py-2 text-left text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
//                   >
//                     {key.charAt(0).toUpperCase() + key.slice(1)}{' '}
//                     {sortKey === key && (sortOrder === 'asc' ? '▲' : '▼')}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
//               {filteredAndSortedAdmins.map((admin, index) => (
//                 <tr key={index}>
//                   <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{index + 1}</td>
//                   <td className="px-4 py-2">
//                     {admin.avatar ? (
//                       <img src={admin.avatar} alt="avatar" className="w-10 h-10 rounded-full border" />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm text-white">
//                         {admin.name?.[0]?.toUpperCase() || '?'}
//                       </div>
//                     )}
//                   </td>
//                   <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{admin.name}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{admin.email}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{admin.phone || 'N/A'}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{admin.dob || 'N/A'}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{admin.ip || 'N/A'}</td>
//                   <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{admin.address || 'N/A'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-sm text-gray-600 dark:text-gray-400">No sub-admins found.</p>
//       )}

//       {/* Drawer */}
//       {isDrawerOpen && (
//         <>
//           <div
//             onClick={toggleDrawer}
//             className="fixed inset-0 bg-black/40 z-40"
//           ></div>

//           <motion.div
//             initial={{ x: '100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '100%' }}
//             transition={{ duration: 0.3 }}
//             className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-white dark:bg-gray-900 shadow-lg z-50 overflow-y-auto"
//           >
//             <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Add Sub-Admin</h2>
//               <button
//                 onClick={toggleDrawer}
//                 className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
//               >
//                 ✕
//               </button>
//             </div>

//             <AddUser onSubmit={handleAddSubAdmin} />
//           </motion.div>
//         </>
//       )}
//     </div>
//     </SupperAdminLayout>
   
//   )
// }




'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import SupperAdminLayout from '@/Layouts/SupperAdminLayout'
import AddUser from '@/form/addUser'

export default function AddSubAdmin() {
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [subAdmins, setSubAdmins] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortKey, setSortKey] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    fetchSubAdmins()
  }, [])

  const fetchSubAdmins = () => {
    axios.get('/supper/fetch-subadmin')
      .then(res => {
        setSubAdmins(res.data.data)
      })
      .catch(() => toast.error('Failed to load Sub-Admins'))
  }

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen)

  const handleAddSubAdmin = (newAdmin) => {
    axios.post('/supper/add-subadmin', newAdmin)
      .then(() => {
        toast.success('Sub-Admin added!')
        fetchSubAdmins()
        toggleDrawer()
      })
      .catch(err => {
        if (err.response?.data?.errors) {
          Object.values(err.response.data.errors).forEach(msg => toast.error(msg[0]))
        } else {
          toast.error('Error adding sub-admin')
        }
      })
  }

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const filteredAndSortedAdmins = [...subAdmins]
    .filter(admin =>
      [admin.name, admin.email, admin.phone]
        .some(field => field?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const valA = a[sortKey]?.toLowerCase?.() || ''
      const valB = b[sortKey]?.toLowerCase?.() || ''
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

  return (
    <SupperAdminLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sub-Admins</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            <button
              onClick={toggleDrawer}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        {filteredAndSortedAdmins.length > 0 ? (
          <div className="overflow-auto rounded-lg shadow border dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Avatar</th>
                  {['name', 'email', 'phone', 'dob', 'ip', 'address'].map((key) => (
                    <th key={key} onClick={() => handleSort(key)} className="px-4 py-2 cursor-pointer">
                      {key.charAt(0).toUpperCase() + key.slice(1)} {sortKey === key && (sortOrder === 'asc' ? '▲' : '▼')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900">
                {filteredAndSortedAdmins.map((admin, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {admin.avatar ? (
                        <img src={admin.avatar} className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                          {admin.name?.[0]?.toUpperCase() || '?'}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">{admin.name}</td>
                    <td className="px-4 py-2">{admin.email}</td>
                    <td className="px-4 py-2">{admin.phone || 'N/A'}</td>
                    <td className="px-4 py-2">{admin.dob || 'N/A'}</td>
                    <td className="px-4 py-2">{admin.ip || 'N/A'}</td>
                    <td className="px-4 py-2">{admin.address || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">No sub-admins found.</p>
        )}

        {isDrawerOpen && (
          <>
            <div onClick={toggleDrawer} className="fixed inset-0 bg-black/40 z-40"></div>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-white dark:bg-gray-900 shadow-lg z-50 overflow-y-auto"
            >
              <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Add Sub-Admin</h2>
                <button onClick={toggleDrawer} className="text-gray-600 dark:text-gray-300 hover:text-red-500">
                  ✕
                </button>
              </div>
              <AddUser onSubmit={handleAddSubAdmin} />
            </motion.div>
          </>
        )}
      </div>
    </SupperAdminLayout>
  )
}
