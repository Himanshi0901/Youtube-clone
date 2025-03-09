import YoutubeDataModel from "../Model/YoutubeData.model.js";

// Function to post new YouTube data
export function postData(req, res) {
    const { imageIcon, video_url, description, owner, views, time, genre } = req.body;
    const newData = new YoutubeDataModel({
        imageIcon,
        video_url,
        description,
        owner,
        views,
        time,
        genre
    });
    newData.save().then((data) => {
        if (!data) {
            res.status(404).send('Something went wrong');
        } else {
            getData(req, res);
        }
    }).catch((err) => {
        return res.status(500).json({ message: err.message });
    });
}

// Function to get all YouTube data
export function getData(req, res) {
    YoutubeDataModel.find().then((data) => {
        if (!data.length) {
            res.status(404).send({ "message": "Data not found" });
        } else {
            res.send(data);
        }
    }).catch((err) => {
        return res.status(500).json({ message: err.message });
    });
}