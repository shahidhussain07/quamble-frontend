import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const data = new FormData()
		data.append("email", formData.email)
		data.append("password", formData.password)

		console.log(data)

		try {
			const response = await axios.post(
				"http://3.109.121.195:5000/login",
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			)
			console.log("Login success:", response.data)
		} catch (err) {
			console.error("Login error:", err)
		}
	}

	return (
		<>
			<div class="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col justify-center py-12 -mt-10 sm:px-6 lg:px-8">
				<div class="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Login to your account
					</h2>
					<p class="mt-2 text-center text-sm text-gray-600 max-w">
						<span>Or </span>
						<a
							href="#"
							class="font-medium text-[#661fff] hover:text-[#7738ff]">
							<Link to="/signup">create an account</Link>
						</a>
					</p>
				</div>

				<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form
							class="space-y-6"
							action="#"
							method="POST"
							onSubmit={handleSubmit}>
							<div>
								<label
									for="email"
									class="block text-sm font-medium text-gray-700">
									Email address
								</label>
								<div class="mt-1">
									<input
										id="email"
										name="email"
										type="email"
										autocomplete="email"
										required
										value={formData.email}
										onChange={handleChange}
										class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Enter your email address"
									/>
								</div>
							</div>

							<div>
								<label
									for="password"
									class="block text-sm font-medium text-gray-700">
									Password
								</label>
								<div class="mt-1">
									<input
										id="password"
										name="password"
										type="password"
										autocomplete="current-password"
										required
										value={formData.password}
										onChange={handleChange}
										class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Enter your password"
									/>
								</div>
							</div>

							<div class="flex items-center justify-between">
								<div class="flex items-center">
									<input
										id="remember_me"
										name="remember_me"
										type="checkbox"
										class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
									/>
									<label
										for="remember_me"
										class="ml-2 block text-sm text-gray-900">
										Remember me
									</label>
								</div>

								<div class="text-sm">
									<a
										href="#"
										class="font-medium text-[#661fff] hover:text-[#7738ff]">
										Forgot your password?
									</a>
								</div>
							</div>

							<div>
								<button
									type="submit"
									class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#661fff] hover:bg-[#7738ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
									Login
								</button>
							</div>
						</form>
						<div class="mt-6">
							<div class="relative">
								<div class="absolute inset-0 flex items-center">
									<div class="w-full border-t border-gray-300"></div>
								</div>
								<div class="relative flex justify-center text-sm">
									<span class="px-2 bg-gray-100 text-gray-500">
										Or continue with
									</span>
								</div>
							</div>

							<div class="mt-6 grid grid-cols-3 gap-3">
								<div>
									<a
										href="#"
										class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
										<img
											class="h-5 w-5"
											src="https://www.svgrepo.com/show/512120/facebook-176.svg"
											alt=""
										/>
									</a>
								</div>
								<div>
									<a
										href="#"
										class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
										<img
											class="h-5 w-5"
											src="https://www.svgrepo.com/show/513008/twitter-154.svg"
											alt=""
										/>
									</a>
								</div>
								<div>
									<a
										href="#"
										class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
										<img
											class="h-6 w-6"
											src="https://www.svgrepo.com/show/506498/google.svg"
											alt=""
										/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
