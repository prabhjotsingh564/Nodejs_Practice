function error(data,res){
    res.status(data.status).json({
        msg:data.msg,
        response:false,
        error:data.error
    })
}

function success(data,res){
    res.status(data.status).json({
        msg:data.msg,
        response:true,
        data:data.data
    })
}



module.exports={error,success};