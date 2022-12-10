import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

import SideNavbar from "@components/general/SideNavbar";
import { Container, MovieSearchbar, Navbar } from "@components/index";
import { TrendingMovies } from "@customTypes/TrendingMovies";
import { baseImageUrl } from "@constants/baseImageUrl";
import { shuffleArray } from "@utils/index";

interface IMovies {
	data: TrendingMovies;
}

function Movies({ data }: IMovies) {
	console.log(data);

	return (
		<Container className="mt-5 mb-8 px-4">
			<div className="flex gap-10">
				<aside className="hidden select-none md:block">
					<SideNavbar />
				</aside>
				<div className="flex-grow">
					{/* header */}
					<Navbar />
					{/* main */}
					<div className="mt-6 flex gap-8 md:mt-10">
						<main className="flex-grow">
							<MovieSearchbar />
							<div className="mt-8 flex flex-col gap-6">
								{/* trending */}
								<div>
									<h1 className="text-lg font-semibold md:text-xl">
										Currently Trending
									</h1>
									<div className="my-4 mt-4 grid grid-cols-2 gap-4 xxs:grid-cols-3 md:mt-8 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
										{data.results.map(({ poster, title, id, release }) => (
											<Link key={id} href={`/movies/${id}`}>
												<div className="space-y-3">
													<Image
														src={`${baseImageUrl}/w342/${poster}`}
														alt={title}
														className="rounded-xl"
														height={100}
														width={200}
													/>
													<div className="space-y-4">
														<p
															title={title}
															className="space-x-2 overflow-hidden text-ellipsis whitespace-nowrap"
														>
															<span className="text-sm font-bold">{title}</span>
															<span className="text-muted">{`${
																release.split("-")[0]
															}`}</span>
														</p>
													</div>
												</div>
											</Link>
										))}
									</div>
								</div>
								{/* suggested */}
								<div>
									<h1 className="text-lg font-semibold md:text-xl">
										Suggested
									</h1>
									<div className="my-4 mt-4 grid grid-cols-2 gap-4 xxs:grid-cols-3 md:mt-8 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
										{shuffleArray(data.results.slice(0, 10)).map(
											({ poster, title, id, release }) => (
												<Link key={id} href={`/movies/${id}`}>
													<div className="space-y-3">
														<Image
															src={`${baseImageUrl}/w342/${poster}`}
															alt={title}
															className="rounded-xl"
															height={100}
															width={200}
														/>
														<div className="space-y-4">
															<p
																title={title}
																className="space-x-2 overflow-hidden text-ellipsis whitespace-nowrap"
															>
																<span className="text-sm font-bold">
																	{title}
																</span>
																<span className="text-muted">{`${
																	release.split("-")[0]
																}`}</span>
															</p>
														</div>
													</div>
												</Link>
											)
										)}
									</div>
								</div>

								{/* Top Rated */}
								<div>
									<h1 className="text-lg font-semibold md:text-xl">
										Top Rated
									</h1>
									<div className="my-4 mt-4 grid grid-cols-2 gap-4 xxs:grid-cols-3 md:mt-8 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
										{shuffleArray(data.results.slice(0, 10)).map(
											({ poster, title, id, release }) => (
												<Link key={id} href={`/movies/${id}`}>
													<div className="space-y-3">
														<Image
															src={`${baseImageUrl}/w342/${poster}`}
															alt={title}
															className="rounded-xl"
															height={100}
															width={200}
														/>
														<div className="space-y-4">
															<p
																title={title}
																className="space-x-2 overflow-hidden text-ellipsis whitespace-nowrap"
															>
																<span className="text-sm font-bold">
																	{title}
																</span>
																<span className="text-muted">{`${
																	release.split("-")[0]
																}`}</span>
															</p>
														</div>
													</div>
												</Link>
											)
										)}
									</div>
								</div>
							</div>
						</main>
					</div>
				</div>
			</div>
		</Container>
	);
}

export default Movies;

export const getServerSideProps: GetServerSideProps = async () => {
	const movies = await axios.get<TrendingMovies>(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search/trending`
	);
	if (!movies.data.success || !movies.data.results.length) {
		return {
			notFound: true,
			redirect: "/",
		};
	}

	return {
		props: {
			data: movies.data,
		},
	};
};
