/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { Disclosure, Popover } from "@headlessui/react";

import {
	HiOutlineChevronUp,
	HiOutlineViewList,
	HiOutlineX,
	HiArrowRight,
	HiLogout,
	HiLogin,
} from "react-icons/hi/index";

import logo from "/public/adrianaslogo2.png";
// import { useGlobalContext } from "../utils/stateContext";

function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}

export default function AuthHeader() {
	return (
		<Disclosure as="nav" className="bg-sky-900">
			{({ open }) => (
				<>
					{/* Nabvar */}
					<div className="sm:px-6 lg:px-8">
						<div className="relative flex items-center h-20">
							{/* Mobile menu button*/}
							<div className="absolute left-0 flex sm:hidden px-8">
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">
										Open main menu
									</span>
									{open ? (
										<HiOutlineX
											className="h-6 w-6"
											aria-hidden="true"
										/>
									) : (
										<HiOutlineViewList
											className="h-6 w-6"
											aria-hidden="true"
										/>
									)}
								</Disclosure.Button>
							</div>
							{/*  Navbar */}
							<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
								{/* Logo image */}
								<div className="flex-shrink-0 flex items-center">
									<Link href="/">
										<Image
											src={logo}
											alt="Logo"
											height={100}
											width={150}
										/>
									</Link>
								</div>
								{/* Log out */}
								<div className="flex-shrink-0 items-center hidden md:flex">
									{/* Profile */}
									<button
										className="m-3 p-3 flex rounded-lg text-white"
										onClick={() => signIn()}
									>
										<div className="mr-4">
											<p className="text-base font-medium">
												Sign In
											</p>
										</div>
										<HiLogin
											className="flex-shrink-0 h-6 w-6"
											aria-hidden="true"
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* Mobile autohidden menu */}
					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							<div className="flex justify-center w-full px-4 py-2 font-medium text-left rounded-lg bg-white text-sky-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
								<button
									className="px-3 flex items-start rounded-lg"
									onClick={() => signIn()}
								>
									<div className="mr-4">
										<p className="text-base font-medium">
											Login
										</p>
									</div>
									<HiLogin
										className="flex-shrink-0 h-6 w-6"
										aria-hidden="true"
									/>
								</button>
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
