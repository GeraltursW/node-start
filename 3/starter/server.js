
const app =require('./app')
//variables
const port = 3000
//start server
app.listen(port, () => {
    console.log(`APP IS RUNNING on Port ${port}`)
})