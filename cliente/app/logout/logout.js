// 'use client'

// import React from 'react';

// function RegisterPage() {
//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-md">
//                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                     Create a new account
//                 </h2>
//             </div>

//             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//                 <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//                     <form className="space-y-6" action="#" method="POST">
//                         <div>
//                             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                                 Name
//                             </label>
//                             <div className="mt-1">
//                                 <input
//                                     id="name"
//                                     name="name"
//                                     type="text"
//                                     autoComplete="name"
//                                     required
//                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                 Email address
//                             </label>
//                             <div className="mt-1">
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     autoComplete="email"
//                                     required
//                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                 Password
//                             </label>
//                             <div className="mt-1">
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     autoComplete="current-password"
//                                     required
//                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <button
//                                 type="submit"
//                                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Create account
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default RegisterPage;

// 'use client'

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';

// function RegisterPage() {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const [submitting, setSubmitting] = useState(false);
//     const [success, setSuccess] = useState(false);
//     const [error, setError] = useState(null);

//     const onSubmit = async (data) => {
//         setSubmitting(true);
//         setError(null);

//         try {
//             const response = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             if (response.ok) {
//                 setSuccess(true);
//             } else {
//                 const errorData = await response.json();
//                 setError(errorData.message);
//             }
//         } catch (error) {
//             setError(error.message);
//         }

//         setSubmitting(false);
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-md">
//                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                     Register
//                 </h2>
//             </div>

//             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//                 <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//                     {success && (
//                         <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
//                             <span className="block sm:inline">Registration successful!</span>
//                         </div>
//                     )}

//                     {error && (
//                         <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//                             <span className="block sm:inline">{error}</span>
//                         </div>
//                     )}

//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div>
//                             <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
//                                 First name
//                             </label>
//                             <div className="mt-1">
//                                 <input
//                                     type="text"
//                                     name="first_name"
//                                     id="first_name"
//                                     autoComplete="given-name"
//                                     className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.first_name ? 'border-red-500' : ''}`}
//                                     {...register('first_name', { required: true })}
//                                 />
//                                 {errors.first_name && (
//                                     <div className="mt-2 text-sm text-red-600" role="alert">
//                                         First name is required
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="mt-6">
//                             <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
//                                 Last name
//                             </label>
//                             <div className="mt-1">
//                                 <input
//                                     type="text"
//                                     name="last_name"
//                                     id="last_name"
//                                     autoComplete="family-name"
//                                     className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.last_name ? 'border-red-500' : ''}`}
//                                     {...register('last_name', { required: true })}
//                                 />
//                                 {errors.last_name && (
//                                     <div className="mt-2 text-sm text-red-600" role="alert">
//                                         Last name is required
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="mt-6">
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                 Email address
//                             </label>
//                             <div className="mt-1">
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     id="email"
//                                     autoComplete="email"
//                                     className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
//                                     {...register('email', { required: true })}
//                                 />
//                                 {errors.email && (
//                                     <div className="mt-2 text-sm text-red-600" role="alert">
//                                         Email is required
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="mt-6">
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                 Password
//                             </label>
//                             <div className="mt-1">
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     id="password"
//                                     autoComplete="new-password"
//                                     className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.password ? 'border-red-500' : ''}`}
//                                     {...register('password', { required: true })}
//                                 />
//                                 {errors.password && (
//                                     <div className="mt-2 text-sm text-red-600" role="alert">
//                                         Password is required
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="mt-6">
//                             <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
//                                 Confirm password
//                             </label>
//                             <div className="mt-1">
//                                 <input
//                                     type="password"
//                                     name="confirm_password"
//                                     id="confirm_password"
//                                     autoComplete="new-password"
//                                     className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${errors.confirm_password ? 'border-red-500' : ''}`}
//                                     {...register('confirm_password', { required: true })}
//                                 />
//                                 {errors.confirm_password && (
//                                     <div className="mt-2 text-sm text-red-600" role="alert">
//                                         Confirm password is required
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="mt-6">
//                             <button
//                                 type="submit"
//                                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                 disabled={submitting}
//                             >
//                                 {submitting ? 'Submitting...' : 'Register'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default RegisterPage;