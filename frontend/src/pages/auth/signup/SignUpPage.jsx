import { Link } from "react-router-dom";
import { useState } from "react";

import XSvg from "../../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
    });

    const queryClient = useQueryClient();

	const { mutate, isError, isPending, error } = useMutation({
		mutationFn: async ({ email, username, fullName, password }) => {
			try {
				const res = await fetch("/api/auth/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, username, fullName, password }),
				});

				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Failed to create account");
				console.log(data);
				return data;
			} catch (error) {
				console.log(error.message);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Account created successfully");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});


    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
            <div className='flex-1 hidden lg:flex items-center  justify-center'>
                <XSvg className=' lg:w-2/3 fill-white' />
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
                    <XSvg className='w-24 lg:hidden fill-white' />
                    <h1 className='text-4xl font-extrabold text-white'>Join today.</h1>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MdOutlineMail className="fill-white" />
                        </div>
                        <input
                            type="email"
                            className="placeholder-gray-700 text-white w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
                            placeholder="Email"
                            value={formData.email}
                            name="email"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="fill-white" />
                        </div>
                        <input
                            type="text"
                            className="placeholder-gray-700 text-white w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
                            placeholder="Username"
                            value={formData.username}
                            name="username"
                            onChange={handleInputChange}
                        />
                    </div>


                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MdDriveFileRenameOutline className="fill-white" />
                        </div>
                        <input
                            type="text"
                            className="placeholder-gray-700 text-white w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
                            placeholder="Full Name"
                            value={formData.fullName}
                            name="fullName"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MdPassword className="fill-white" />
                        </div>
                        <input
                            type="password"
                            className="placeholder-gray-700 text-white w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
                            placeholder="password"
                            value={formData.password}
                            name="password"
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit" className="rounded-full bg-blue-500 text-white py-2 px-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                    {isPending ? "Loading..." : "Sign up"}
                    </button>

                    {isError && <p className='text-red-500'>{error.message}</p>}
                </form>
                <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
                    <p className='text-white text-lg'>Already have an account?</p>
                    <Link to='/login'>
                        <button className="rounded-full border-2 border-blue-500 text-blue-500 bg-transparent w-full py-2 px-6 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                            Sign in
                        </button>

                    </Link>
                </div>
            </div>
        </div>
    );
};
export default SignUpPage;
