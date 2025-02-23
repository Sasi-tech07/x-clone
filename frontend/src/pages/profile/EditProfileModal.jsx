import { useState, useEffect } from "react";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

const EditProfileModal = ({authUser}) => {
	const [formData, setFormData] = useState({
		fullName: "",
		username: "",
		email: "",
		bio: "",
		link: "",
		newPassword: "",
		currentPassword: "",
	});

	const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();
	
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (authUser) {
			setFormData({
				fullName: authUser.fullName,
				username: authUser.username,
				email: authUser.email,
				bio: authUser.bio,
				link: authUser.link,
				newPassword: "",
				currentPassword: "",
			});
		}
	}, [authUser]);
	
	return (
		<>
			<button
				className="rounded-full border-1 border-blue-500 text-blue-500 bg-transparent  py-1 px-2 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
				onClick={() => document.getElementById("edit_profile_modal").showModal()}
			>
				Edit profile
			</button>
			<dialog id="edit_profile_modal" className="modal">
				<div className="modal-box border rounded-md border-gray-700 shadow-md p-6 bg-white">
					<h3 className="font-bold text-lg my-3">Update Profile</h3>
					<form
						className="flex flex-col gap-4"
						onSubmit={(e) => {
							e.preventDefault();
							updateProfile(formData);
						}}
					>
						<div className="flex flex-wrap gap-4">
							<input
								type="text"
								placeholder="Full Name"
								className="flex-1 border border-gray-700 rounded p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								value={formData.fullName}
								name="fullName"
								onChange={handleInputChange}
							/>
							<input
								type="text"
								placeholder="Username"
								className="flex-1 border border-gray-700 rounded p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								value={formData.username}
								name="username"
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-wrap gap-4">
							<input
								type="email"
								placeholder="Email"
								className="flex-1 border border-gray-700 rounded p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								value={formData.email}
								name="email"
								onChange={handleInputChange}
							/>
							<textarea
								placeholder="Bio"
								className="flex-1 border border-gray-700 rounded p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								value={formData.bio}
								name="bio"
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-wrap gap-4">
							<input
								type="password"
								placeholder="Current Password"
								className="flex-1 border border-gray-700 rounded p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								value={formData.currentPassword}
								name="currentPassword"
								onChange={handleInputChange}
							/>
							<input
								type="password"
								placeholder="New Password"
								className="flex-1 border border-gray-700 rounded p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								value={formData.newPassword}
								name="newPassword"
								onChange={handleInputChange}
							/>
						</div>
						<input
							type="text"
							placeholder="Link"
							className="flex-1 border border-gray-700 rounded p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							value={formData.link}
							name="link"
							onChange={handleInputChange}
						/>
						<button className="w-full py-2 mt-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
						{isUpdatingProfile ? "Updating..." : "Update"}
						</button>
					</form>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button className="outline-none text-gray-500">Close</button>
				</form>
			</dialog>

		</>
	);
};
export default EditProfileModal;