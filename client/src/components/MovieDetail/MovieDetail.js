import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../Config";
import GridCards from "../views/commons/GridCards";
import MainImg from "../views/LandingPage/section/MainImg";
import MovieInfo from "./Sections/MovieInfo";
import { Row } from "antd";
import Favorite from "../views/LandingPage/section/Favorite";

function MovieDetail(props) {
  let movieId = props.match.params.movieId; // movieId라고 이름을 정했음
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`; // 출연진
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`; // 영화 정보
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response.cast); // 캐스트를 Cast안에다가
      });
  }, []);

  const ToggleActorView = () => {
    setActorToggle(!ActorToggle); // !로 toggle이 되게 할 수 있다 ㄷㄷㄷ
  };
  return (
    <>
      <div>
        {/* Header */}
        <MainImg
          img={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} /*먼저 렌더링 방지를 위해서 http://image.tmdb.org/t/p(동일한 URL부분)/original(이미지 사이즈)/wwdsdasfa.svg(유니크한 이미지 이름)*/
          title={Movie.original_title}
          text={Movie.overview}
        />
        {/* body */}
        <div style={{ width: "85%", margin: "1rem auto" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Favorite
              movieInfo={Movie /*영화의 모든 정보를 집어넣기*/}
              movieId={movieId /*url의 정보를 가져온 것을 집어넣기*/}
              userFrom={localStorage.getItem("userId") /*로컬 스토로지에 저장*/}
            />
          </div>
          {/* Movie Info */}
          <MovieInfo movie={Movie} />
          <br />
          {/* Actors Grid */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <button onClick={ToggleActorView}>Toggle Actor View</button>
          </div>

          {ActorToggle && (
            <Row gutter={[16, 16]}>
              {Casts && // 캐스트가 있을 때만 실행
                Casts.map((cast, index) => (
                  <React.Fragment key={index}>
                    <GridCards
                      img={
                        cast.profile_path
                          ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                          : null
                      }
                      /* movieId={
                      cast.id
                    } 캐스트 아이디 있어도 검색 안됨  */
                      characterName={cast.name}
                    />
                  </React.Fragment>
                ))}
            </Row>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
