/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Disclosure, Popover } from "@headlessui/react";

import {
	HiOutlineChevronDown,
	HiOutlineChevronUp,
	HiUser,
	HiOutlineViewList,
	HiOutlineX,
	HiArrowRight,
	HiLogout,
} from "react-icons/hi/index";

import logo from "/public/adrianaslogo2.png";
// import { useGlobalContext } from "../utils/stateContext";

function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}

export default function Header() {
	// const { dispatch } = useGlobalContext();
	const user = {
		permits: "true",
		initials: "TPS",
	};

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
								{/* Dropdowns */}
								<div className="flex items-center">
									{user?.permits && (
										<Popover.Group
											as="nav"
											className="hidden md:flex lg:space-x-10"
										>
											{/* Web Quote */}
											<Popover className="relative">
												{({ open }) => (
													<>
														<Popover.Button
															className={classNames(
																open
																	? "text-sky-900 bg-white"
																	: "text-white",
																"rounded-md inline-flex items-center font-medium p-2 pl-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
															)}
														>
															<span>
																Web Quotes
															</span>
															<HiOutlineChevronDown
																className={classNames(
																	open
																		? "text-sky-900 bg-white"
																		: "text-white",
																	"ml-2 h-5 w-5 group-hover:text-sky-900"
																)}
																aria-hidden="true"
															/>
														</Popover.Button>
														<Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-xs sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
															<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
																{user?.permits !=
																	"Online Sales" && (
																	<>
																		<div className="relative grid bg-white px-5 pt-6 pb-6">
																			<Link
																				key={
																					"web"
																				}
																				href={
																					"/webquotes"
																				}
																				className="flex items-start rounded-lg hover:bg-gray-50"
																			>
																				<HiArrowRight
																					className="flex-shrink-0 h-6 w-6 text-indigo-600"
																					aria-hidden="true"
																				/>
																				<div className="ml-4">
																					<p className="text-base font-medium text-gray-900">
																						Dashboard
																					</p>
																				</div>
																			</Link>
																		</div>
																	</>
																)}
															</div>
														</Popover.Panel>
													</>
												)}
											</Popover>
										</Popover.Group>
									)}
								</div>
								{/* Log out */}
								<div className="flex-shrink-0 items-center hidden md:flex">
									{/* Profile */}
									<Link legacyBehavior href="/profile">
										<a className="m-3 flex items-start rounded-lg">
											<p className="text-base font-medium text-white pr-2">
												{user.initials}
											</p>
											<HiUser
												className="flex-shrink-0 h-6 w-6 text-white"
												aria-hidden="true"
											/>
										</a>
									</Link>
									<button
										className="m-3 p-3 flex rounded-lg text-white"
										onClick={() =>
											signOut({ callbackUrl: "/" })
										}
									>
										<div className="mr-4">
											<p className="text-base font-medium">
												Sign out
											</p>
										</div>
										<HiLogout
											className="flex-shrink-0 h-6 w-6"
											aria-hidden="true"
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* Mobile autohidden menu */}
					<Disclosure.Panel className="sm:hidden text-sky-900">
						<div className="px-2 pt-2 pb-3 space-y-1 ">
							{/* Web Quotes*/}
							<Disclosure>
								{({ open }) => (
									<>
										<Disclosure.Button className="flex justify-between gap-4 w-full px-4 py-2 bg-white font-medium text-left rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
											<span>Web Quotes</span>
											<HiOutlineChevronUp
												className={`${
													open
														? "transform rotate-180"
														: ""
												} w-5 h-5`}
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="mx-8  rounded-lg">
											<Link
												key={"web"}
												href={"/"}
												className="p-2 flex items-start rounded-lg bg-white  hover:bg-sky-800"
											>
												<HiArrowRight
													className="flex-shrink-0 h-6 w-6 "
													aria-hidden="true"
												/>
												<div className="ml-4">
													<p className="text-base font-medium">
														Home
													</p>
												</div>
											</Link>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
							{/* Log out */}
							<div className="flex justify-between w-full font-medium text-left rounded-lg bg-white  focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
								<Link
									href="/profile"
									className="px-4 py-2 w-full flex  rounded-lg"
								>
									<div className="mr-4">
										<p className="text-base font-medium">
											{user.initials} - Profile
										</p>
									</div>
								</Link>
							</div>
							<div className="flex justify-between w-full  font-medium text-left rounded-lg bg-white  focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
								<button
									className="px-4 py-2 w-full flex rounded-lg"
									onClick={() =>
										signOut({ callbackUrl: "/" })
									}
								>
									<div className="mr-4">
										<p className="text-base font-medium">
											Sign out
										</p>
									</div>
									{/* <HiLogout
										className="flex-shrink-0 h-6 w-6"
										aria-hidden="true"
									/> */}
								</button>
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
