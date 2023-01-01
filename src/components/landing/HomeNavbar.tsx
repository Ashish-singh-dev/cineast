import { useRef } from "react";
import Link from "next/link";

import { UserMenu } from "@components/index";
import { SearchIcon } from "@assets/icons";

import Menu from "../Menu";

const links = [
	{
		title: "Movie",
		href: "/movies",
	},
	{
		title: "Tv series",
		href: "/tv-shows",
	},
	{
		title: "Communities",
		href: "/communities",
	},
	{
		title: "Features",
		href: "#features",
	},
];

function HomeNavbar() {
	const searchInputRef = useRef<HTMLInputElement | null>(null);
	return (
		<nav className="navbar flex h-16 items-center justify-between bg-[#4e5b68] bg-opacity-70 px-8 text-white">
			<Menu className="mr-2 md:hidden" />
			<div className="flex items-center justify-center gap-4">
				<Link href="/" className="brand text-lg font-semibold">
					Cineast
				</Link>
				<div className="flex items-center justify-center gap-4 text-white">
					{links.map(({ href, title }) => (
						<Link
							href={href}
							key={title}
							className="hidden items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus:outline-none md:inline-flex"
						>
							{title}
						</Link>
					))}
				</div>
			</div>
			<div className="flex items-center justify-center gap-4">
				<div className="hidden h-8 w-52 items-center justify-center rounded px-2 py-1 xxs:flex lg:w-64">
					<button
						onClick={() => searchInputRef.current?.focus()}
						className="inline-flex h-10 w-1/5 items-center justify-center border-none focus:outline-none"
					>
						<SearchIcon width={15} height={15} />
					</button>
					<input
						type="text"
						ref={searchInputRef}
						name="search-movies"
						className="w-4/5 rounded bg-transparent text-sm font-medium outline-none placeholder:text-xs placeholder:text-muted focus:outline-none"
						placeholder="Search"
					/>
				</div>
				<UserMenu />
				<Link
					href="/home"
					className="hidden rounded bg-[#1775E1] px-4 py-2 text-xs font-semibold sm:text-sm lg:block"
				>
					Try for free
				</Link>
			</div>
		</nav>
	);
}

export default HomeNavbar;
