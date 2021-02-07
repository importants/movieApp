import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./favorite.css";
import { Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [Favorite, setFavorite] = useState([]);
  useEffect(() => {
    fetchFavoritedMovie();
  }, []);

  const fetchFavoritedMovie = () => {
    Axios.post("/api/favorite/GetFavoriteMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        setFavorite(response.data.favorite);
      } else {
        alert("영화 정보를 가져오는데 실패했습니다");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    console.log("아니 왜 안됨?");
    const variables = {
      movieId,
      userFrom,
    };
    Axios.post("/api/favorite/removeFromFavorite", variables).then((res) => {
      if (res.data.success) {
        fetchFavoritedMovie();
      } else {
        alert("지울 수 없다고요");
      }
    });
  };

  const renderCards = Favorite.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          "no img"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover
          content={content}
          /*이미지 여기에다*/ title={`${favorite.movieTitle}`}
        >
          <td>{favorite.movieTitle}</td>
        </Popover>

        <td>{favorite.movieRunTime}</td>
        <td>
          <button
            onClick={
              () => {
                onClickDelete(favorite.movieId, favorite.userFrom);
              }
              /*정보를 가져가서 사용해야 해서 id값 그리고 온 클릭이 계속 되니까 함수 안에다가 가두자*/
            }
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
