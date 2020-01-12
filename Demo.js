 //http sever established
 // const app =http.createServer((req,res) => {
    //     res.end("working")
    // })

// app.use((req,res,next) => {
//     console.log("hello")
//     next()
// })

// app.use((req,res,next) => {
    
//     res.status(200).json({
//         msg:1,
//     })
// })


app.get("/profile",(req,res,next) => {
    res.status(200).json({
        msg:1,
        data:"none of your concern"
    })
})
app.get("/name",(req,res,next) => {
res.status(200).json({ 
    data:"none of yur cncrn"
})
})
