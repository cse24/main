var express = require('express');
var router = express.Router();
const {requirement} = require('../models');

router.post('/', async function(req,res){
    // 직원 메인화면.
    var post = req.body;
    var region = post.region;

    let require = await requirement.findAll({
        
        where : {
            address: region,
            check_num : 0
        }
    });

    const jsonArray = JSON.stringify(require);

    res.send({success:true , data: jsonArray});

})

module.exports = router;