'use client'

import { router } from '@inertiajs/react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function AddUser({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dob: '',
    ip: '',
    address: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = { ...formData };

  // Validate required fields
  if (!data.name || !data.email || !data.password || !data.confirmPassword) {
    toast.error('Please fill all required fields!');
    return;
  }

  if (data.password !== data.confirmPassword) {
    toast.error('Passwords do not match!');
    return;
  }

  // Send to Laravel
  router.post(route('supper.adduser.store'), data, {
    onSuccess: () => {
      toast.success('Sub-Admin Added!');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dob: '',
        ip: '',
        address: '',
      });
    },
    onError: (errors) => {
      Object.values(errors).forEach((msg) => toast.error(msg));
    },
  });
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const data = { ...formData }

  //   if (!data.name || !data.email || !data.password || !data.confirmPassword) {
  //     toast.error('Please fill all required fields!')
  //     return
  //   }

  //   if (data.password !== data.confirmPassword) {
  //     toast.error('Passwords do not match!')
  //     return
  //   }

  //   console.log('Form Data:', data)
  //   onSubmit?.(data)
  //    router.post(route('supper.adduser.store'), formData, {
  //   onSuccess: () => {
  //     toast.success('Sub-Admin Added!')
  //     setFormData({
  //       name: '',
  //       email: '',
  //       password: '',
  //       confirmPassword: '',
  //       phone: '',
  //       dob: '',
  //       ip: '',
  //       address: '',
  //     })
  //   }
  //   onError: (errors) => {
  //     Object.values(errors).forEach((msg) => toast.error(msg))
  //   }
  // })
  //   toast.success('Sub-Admin Added!')

  //   setFormData({
  //     name: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //     phone: '',
  //     dob: '',
  //     ip: '',
  //     address: '',
  //   })
  // }

//   const handleSubmit = (e) => {
//   e.preventDefault()

//   if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
//     toast.error('Please fill all required fields!')
//     return
//   }

//   if (formData.password !== formData.confirmPassword) {
//     toast.error('Passwords do not match!')
//     return
//   }

//   router.post(route('supper.adduser.store'), formData, {
//     onSuccess: () => {
//       toast.success('Sub-Admin Added!')
//       setFormData({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         phone: '',
//         dob: '',
//         ip: '',
//         address: '',
//       })
//     },
//     onError: (errors) => {
//       Object.values(errors).forEach((msg) => toast.error(msg))
//     }
//   })
// }

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
      {/* Input Fields */}
      {[
        { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter full name' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter email address' },
        { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: 'Enter phone number' },
        { label: 'Date of Birth', name: 'dob', type: 'date' },
        { label: 'IP Address', name: 'ip', type: 'text', placeholder: 'Enter IP address' },
      ].map(({ label, name, type, placeholder }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
      ))}

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <div className="relative mt-1">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
        <div className="relative mt-1">
          <input
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Residential Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter residential address"
          rows="3"
          className="mt-1 w-full px-3 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow"
      >
        Submit
      </button>
    </form>
  )
}
