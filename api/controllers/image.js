const mongoose = require('mongoose');
const Image = mongoose.model('Image');


module.exports.showImages = async (req, res) => {
    const images = await Image.find();
    res.status(200).json({images});

}

module.exports.deleteImage = async (req, res) => {
    const image = await Image.deleteOne( {filePath: req.params.filePath} );
    res.status(200).json({image});

}

module.exports.uploadImage = async (req, res) => {
    const { name } = req.body;
    const filePath = 'http://localhost:4200/images/' + req.file.filename; //this will be filePath value

    const image = new Image({
        name,
        filePath
    });
    const createdImage = await image.save();
    res.status(201).json({
        image: {
            ...createdImage._doc
        }
    });

}