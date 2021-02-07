import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  let variables = {
    // 상위 컴포넌트에서 props로 가져온다
    userFrom, // 누가 좋아요를 눌렀는지
    movieId, // 어떤 영화인지
    movieTitle,
    moviePost,
    movieRunTime,
  };
  useEffect(() => {
    Axios.post(
      "/api/favorite/favoriteNumber",
      variables /*이 곳에다가 요청하기 -> 누가 favorite 했는지 무슨 영화인지 전해줘야한다 -> variables*/
    ).then(
      /*그 요청에 대한 응답*/ (response) => {
        if (response.data.success) {
          setFavoriteNumber(response.data.favoriteNumber);
        } else {
          alert("숫자 정보를 가져오는데 실패 했습니다");
        }
      }
    );

    Axios.post(
      "/api/favorite/favorited",
      variables /*이 곳에다가 요청하기 -> 누가 favorite 했는지 무슨 영화인지 전해줘야한다 -> variables*/
    ).then(
      /*그 요청에 대한 응답*/ (response) => {
        if (response.data.success) {
          setFavorited(response.data.favorited);
        } else {
          alert("정보를 가져오는데 실패 했습니다");
        }
      }
    );
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variables).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Favorite 리스트에서 지우는 걸 실패했습니다");
          }
        }
      );
    } else {
      Axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert("Favorite 리스트에 추가하는 걸 실패했습니다");
        }
      });
    }
  };
  return (
    <>
      <div>
        <Button onClick={onClickFavorite}>
          {Favorited ? "Not Favorite " : "Add to Favorite "}
          {FavoriteNumber}
        </Button>
      </div>
    </>
  );
}

export default Favorite;
