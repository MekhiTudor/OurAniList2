/** @format */
import NavBar from "../components/NavBar";
import { CardComponent } from "../components/CardComponent";
import { useContext, useEffect, useState } from "react";
import AnimeContext from "../context/AnimeContext";
import { useNavigate, useParams } from "react-router-dom";
import { handleFetch } from "../utils";
import { Link } from "react-router-dom";

const TrendingPage = () => {
	const { trendingAnimeList, lastPageNum, setFetchError, setActive } =
		useContext(AnimeContext);
	const { pageNum } = useParams();
	const [currPageList, setCurrPageList] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (pageNum == 1) setCurrPageList(null);
		if (pageNum > 1 && pageNum <= lastPageNum) {
			const doFetch = async () => {
				const [page, error] = await handleFetch(
					`https://api.jikan.moe/v4/top/anime?sfw&page=${pageNum}`
				);

				if (page) setCurrPageList(page.data);
				if (error) setFetchError(error);
			};
			doFetch();
		}

		if (pageNum < 1 || isNaN(pageNum)) navigate("/trending/1");
		if (lastPageNum > 1 && pageNum > lastPageNum)
			navigate(`/trending/${lastPageNum}`);

		setActive("trending");
	}, [pageNum, lastPageNum]);

	return (
		<>
			<NavBar />
			<h1>TRENDING</h1>
			<ul
				style={{
					display: "flex",
					justifyContent: "space-around",
					margin: "2rem",
				}}>
				{pageNum == 1 ? (
					//disables the link when its on the first page
					<button disabled>{"<<"} Prev</button>
				) : (
					// Prev button makes the path head to the prev page
					<Link to={`/trending/${Number(pageNum) - 1}`}>
						<button>{"<<"} Prev</button>
					</Link>
				)}
				<h2>
					Page {pageNum ?? 1} of {lastPageNum}
				</h2>
				{!pageNum || pageNum < lastPageNum ? (
					// Next button makes the path head to the next page
					<Link to={`/trending/${Number(pageNum) + 1}`}>
						<button>Next {">>"}</button>
					</Link>
				) : (
					//disables the link when its on the last page
					<button disabled>Next {">>"}</button>
				)}
			</ul>
			<ul
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr 1fr",
					gap: "8px",
				}}>
				{(currPageList ?? trendingAnimeList)?.map(anime => (
					<li key={anime.mal_id}>
						<CardComponent anime={anime} />
					</li>
				))}
			</ul>
		</>
	);
};
export default TrendingPage;
