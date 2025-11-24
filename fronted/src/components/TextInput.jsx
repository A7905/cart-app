import React from 'react'


export default function TextInput({ label, error, ...props }){
return (
<label className="block">
<span className="text-sm font-medium text-gray-700">{label}</span>
<input
className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1 ${error ? 'border-red-500 ring-red-100' : 'border-gray-300 ring-blue-50'}`}
{...props}
/>
{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
</label>
)
}