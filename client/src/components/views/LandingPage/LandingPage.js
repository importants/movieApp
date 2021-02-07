import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImg from "./section/MainImg";
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainImage, setMainImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`; // page = 1이니까 page 2인 것을 붙여넣기 하면 됨
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint) //가져오기
      .then((response) => response.json())
      .then((response) => {
        setMovies([...Movies, ...response.results]);
        setMainImage(response.results[0]);
        setCurrentPage(response.page);
      }); // 모든게 movies state에 들어가 있다
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`; // 1 일 때는 2가 되고 2일 때는 3이 되고
    fetchMovies(endpoint);
  };

  return (
    <>
      <div style={{ width: "100%", margin: "0" }}>
        {/*MAIN IMAGE*/}
        {MainImage /*렌더링 되면 */ && (
          <MainImg
            img={`${IMAGE_BASE_URL}w1280${MainImage.backdrop_path}`} /*먼저 렌더링 방지를 위해서 http://image.tmdb.org/t/p(동일한 URL부분)/original(이미지 사이즈)/wwdsdasfa.svg(유니크한 이미지 이름)*/
            title={MainImage.original_title}
            text={MainImage.overview}
          />
        )}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <h2>Movies by latest</h2>
          <hr />
          {/*Movie grid cards*/}
          <Row gutter={[16, 16]}>
            {Movies &&
              Movies.map((movie, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    LandingPage
                    img={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                        : null
                    }
                    movieId={
                      movie.id
                    } /*무비 아이디가 있어야지 검색 탐색이 가능 */
                    movieName={movie.original_title}
                  />
                </React.Fragment>
              ))}
          </Row>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreItems}> load More</button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
