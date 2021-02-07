const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post(
  //클라이언트에서 post 형식으로 보냈기 때문에 post 임 express 프레임워크
  "/favoriteNumber",
  (req /*request를 통해서 받을 수 있다*/, res) =>
    /*.req.body. MovieId  body parser을 통해서 정보를 받을 수 있으므로 body를 통해서 받아온다*/

    //mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
      if (err) return res.status(400).send(err);
      /*만약 좋아하는 사람이 있으면 [1,2,3]으로 나타난다*/
      res.status(202).json({ success: true, favoriteNumber: info.length });
    })
  // 그 다음에 프론트에 다시 숫자 정보를 보내주기
);

router.post(
  "/favorited",
  (req, res) =>
    // 내가 이 영화를 Favorite 리스트에 넣었는 지 정보를 DB에서 가져오기

    //mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    }).exec((err, info) => {
      if (err) return res.status(400).send(err);
      // 그 다음에 프론트에 다시 숫자 정보를 보내주기

      let result = false;
      if (info.length !== 0) {
        result = true;
      }

      res.status(200).json({ success: true, favorited: result });
    })
  // 그 다음에 프론트에 다시 숫자 정보를 보내주기
);

// 버튼 눌렀을 때 지우기
router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }) // 찾고 지우고
    .exec(
      // 쿼리 실행
      (err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, doc });
      }
    );
});

// 버튼 눌렀을 때 추가하기
router.post("/addToFavorite", (req, res) => {
  const favorite = new Favorite(req.body); //모델 Favorite 안에 집어 넣기

  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, doc });
  }); // 저장
});

router.post("/GetFavoriteMovie", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorite) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorite });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) res.status(400).send(err);
    res.status(200).json({ success: true, result });
  });
});

module.exports = router;
