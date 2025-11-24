// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import TextInput from "../components/TextInput";
// import { useNavigate } from "react-router-dom";

// const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/; // min 6, letters and numbers

// const schema = yup
//   .object({
//     name: yup.string().required("Name is required").min(2, "Too short"),
//     email: yup
//       .string()
//       .email("Enter a valid email")
//       .required("Email is required"),
//     password: yup
//       .string()
//       .required("Password is required")
//       .matches(
//         passwordRules,
//         "Min 6 characters and must contain letters and numbers"
//       ),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref("password"), null], "Passwords must match")
//       .required("Confirm your password"),
//   })
//   .required();

// export default function Signup() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     const { name, email } = data;
//     // replace with your register API
//     console.log("Signup data", data);
//     await new Promise((r) => setTimeout(r, 800));
//     alert(`Account created for ${name} (demo)`);
//     navigate("/login");
//   };

//   return (
//     <div className="app-bg flex items-center justify-center mt-70">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold mb-4">Create account</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <TextInput
//             label="Full name"
//             type="text"
//             {...register("name")}
//             error={errors.name?.message}
//           />
//           <TextInput
//             label="Email"
//             type="email"
//             {...register("email")}
//             error={errors.email?.message}
//           />
//           <TextInput
//             label="Password"
//             type="password"
//             {...register("password")}
//             error={errors.password?.message}
//           />
//           <TextInput
//             label="Confirm password"
//             type="password"
//             {...register("confirmPassword")}
//             error={errors.confirmPassword?.message}
//           />

//           <div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
//             >
//               {isSubmitting ? "Creating..." : "Create account"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to register");
      }
      console.log("Account created successfully!");
    } catch (error) {
      console.log(error.message);
    } finally {
      setFormData({ name: "", email: "", password: "" });
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center w-full h-full mt-70">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 flex flex-col justify-center align-center">
          <h2 className="text-2xl font-bold mb-4 underline flex text-center justify-center mr-10">Create account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full name:</label>
              <input className="w-10/12 border-2 rounded-md"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email:</label>
              <input className="w-10/12 border-2 rounded-md"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email id"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password:</label>
              <input className="w-10/12 border-2 rounded-md"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 rounded-md cursor-pointer"
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
