var express = require('express');
var router = express.Router();
const {requirement} = require('../models');

router.get('/', async function(req, res){
    // 의뢰인 메인 화면
    let require = await requirement.findAll({
        
        // where : {
        //     id_ : req.user.id,
        // }
    });

    const jsonArray = JSON.stringify(require);
    console.log(jsonArray);

    res.send({success:true , data: jsonArray});
})

router.post('/', async function(req,res){
    var requirementId = 0;

    let require = await requirement.findAll({
    });
    console.log(require);
    if(require.length === 0){
        requirementId = 0;
    }
    else{
        requirementId = require[require.length-1].requirementId + 1;
    }

    // 의뢰인이 신청함.

    var post = req.body;
    console.log(post);

    //var id_ = req.user.id;
    var address = post.address; // 배열
    var phone_number = post.phone_number; // 부동산 번호 배열
    var date = post.date; // 의뢰 기한
    var comment = post.comment;
    
    for(var i=0 ; i < address.length;i++){
        requirement.create({
            userId : `${id_}`,
            requirementId : `${requirementId}`,
            address : `${address[i]}`,
            phone_number : `${phone_number[i]}`,
            date : `${date}`,
            comment : `${comment}`,
            check_num : '0'
        })
    }

    requirementId++;

    res.send({success: true,data:null});
})

module.exports = router;