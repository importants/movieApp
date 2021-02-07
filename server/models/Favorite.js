const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId, //ObjectId 값이 있으면 그 사용자{user}의 정보를 다 가지고 올 수 있다.
      ref: "User",
    },
    movieId: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    moviePost: {
      type: String,
    },
    movieRunTime: {
      type: String,
    },
  },
  { timestamps: true } // 생성된 시간 자동 처리
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };
