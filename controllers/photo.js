const express = require("express");
const router = express.Router();
const photo = require("../models/photo");


router.get("/", async (req, res) => {
    try {
      const result = await photo.find().sort({ postedTime: -1 });
      res.send(result);
    } catch (err) {
      console.log(err.message);
    }
});


router.post("/add_photo", async (req, res) => {
    const { url,postedBy  } = req.body;
    let countPhoto = await photo.countDocuments();
    if (!countPhoto) {
      newId = "Photo_01";
    }
    if (countPhoto < 9) {
        countPhoto++;
      newId = "Photo_0" + countPhoto;
    } else {
        countPhoto++;
      newId = "Photo_" + countPhoto;
    }
    const dateSort = new Date();
    try {
        const photoNew = new photo({
          photoID: newId,
          url: url,
          postedBy: postedBy,
          postedTime: dateSort,
          comments : []
        });
        await photoNew.save();
        res.send(photoNew);
    } catch (error) {
        console.log(error);
    }
});

router.post("/post_comment", async (req, res) => {
  const { photoID,username,commentText } = req.body;
  try {
    const foundObject = await photo.findOne({ photoID: photoID });
    if (foundObject) {

      if (foundObject.comments.length === 0){
        const dateSort = new Date();
        const newComment = {
          commentText: commentText,
          commentBy: username,
          commentDate: dateSort
        }
        
       const arr = Array.from(foundObject.comments)
       arr.push(newComment)
       foundObject.comments = arr
       foundObject.save()
       .then(()=>{
        res.send(arr)
       })
       .catch((err)=>{
        res.sendStatus(500)
       })
       
      }else{
        const dateSort = new Date();
        const newComment = {
          commentText: commentText,
          commentBy: username,
          commentDate: dateSort
        }
        const arr = Array.from(foundObject.comments)
        arr.unshift(newComment)
        foundObject.comments = arr
        foundObject.save()
        .then(()=>{
         res.send(arr)
        })
        .catch((err)=>{
         res.sendStatus(500)
        })
      }
    } else {
      throw new Error("not exist photo");
    }
  } catch (err) {
    console.log(err.message);
    res.send(400, err.message);
  }

});

module.exports = router;