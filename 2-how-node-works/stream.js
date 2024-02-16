const fs = require('fs')

const server = require('http').createServer()

server.on('request',(req,res)=>{            

    //s1
    // fs.readFile('test-file.txt','utf-8',(err,data)=>{
    //     if(err) console.log(err)
    //     res.end(data)
    // })

    //s2 流
    // const readable = fs.createReadStream('test-file.txt') //一小块一小块消耗
    // readable.on('data',chunck =>{
    //     res.write(chunck)
    // })

    // readable.on('end',()=>{
    //     res.end()
    // })

    // readable.on('error',err =>{
    //     console.log(err)
    //     res.statusCode = 500
    //     res.end('file not found')
    // }
    // )


    //s3 管道
    const readable = fs.createReadStream('test-file.txt') //一小块一小块消耗
    readable.pipe(res)
})

server.listen(8000,'127.0.0.1',()=>{
    console.log('listening')
})