const EventEmitter = require('events')

const http = require('http')





class Sales extends EventEmitter{
    constructor(){
        super()
    }


}
//EventEmitter 是一个class 类
const myEmitter = new Sales()
//创建监听器
myEmitter.on('newSale',()=>{
    console.log('newSale launching')
})
myEmitter.on('newSale',()=>{
    console.log('Name:jonas')
})

myEmitter.on('newSale', stock =>{
    console.log(`there are ${stock} items in the stock `)
})
myEmitter.emit('newSale',9)


const server = http.createServer()
server.on('request',(req,res)=>{            
    console.log('Request Received')
    console.log(req.url)
    res.end('Request Received')
})

server.on('request',(req,res)=>{            
    console.log('Request2 Received')
})
server.on('close',()=>{            
    console.log('server closed')
   
})

server.listen(8000,'127.0.0.1',()=>{
    console.log('wating...')
})