const express = require('express');
const router = express.Router();
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');
const axios = require('axios');
const StatusCodes = require('../common/statusCode');

router.post('/add',uploadStrategy, async (req, res) => {
    try {

        axios
            .post("https://se-function.azurewebsites.net/api/HttpTrigger",{
                filedata : req.file,
                filename : req.file.originalname,
                contentType : req.file.mimetype
            })
            .then((info) =>{
               if(info.status ===StatusCodes.Success) {
                   return res.status(200).json({
                       data: null,
                       message: 'Image Upload Success!',
                       statusCode: StatusCodes.Success
                   });
               }else {
                   return res.status(200).json({
                       data: null,
                       message: 'Image Upload Success!',
                       statusCode: StatusCodes.ServerError
                   });
               }
            }).catch(e=>{
             console.log(e);
        });

    } catch (err) {
    }
});
module.exports =router;
