const Client = require('../config/redis');
const axios = require('axios');
const StatusCodes = require('../common/statusCode');


exports.getInfo = async (req, res) => {

        try{
            const usersRedisKey = "store:information";
            const dataExpireTime = 3600;
            return Client.get(usersRedisKey, (err, information) => {

                if(information){
                   return  res.status(200).json({
                        data: {
                            source:"Information get from redis",
                            values: JSON.parse(information)
                        },
                        message: 'Information Get Success!',
                        statusCode: StatusCodes.Success
                    });
                }else {
                    axios
                        .get("https://se-api.azurewebsites.net/information/get")
                        .then((info) =>{
                            Client.setex(usersRedisKey, dataExpireTime, JSON.stringify(info.data.data));

                            return res.status(200).json({
                                data: {
                                    source:"Information get from Mysql",
                                    values: info.data.data
                                },
                                message: 'Information Get Success!',
                                statusCode: StatusCodes.Success
                            });
                        }).catch(e=>{
                            console.log(e);
                    })
                }
            })
        }catch (e) {
           console.log(e);
        }
};
