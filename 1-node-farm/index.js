const fs = require('fs')// 提取 fs 读取文件
const http = require('http')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')
const slugify = require('slugify')

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const objData = JSON.parse(data)
const slugs = objData.map(el => {
   return slugify(el.productName, { lower: true })
})

console.log(slugs)
const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true)
    //overview page 
    if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html',
        })
        const cardHtml = objData.map(item => {
            return replaceTemplate(tempCard, item)
        }).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml)
        res.end(output)
        //product    
    } else if (pathname === '/product') {
        //加入响应头
        res.writeHead(200, {
            'Content-type': 'text/html',
        })
        const product = objData[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)
        //api
    } else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json',
        })
        res.end(data)
        //404 page
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own': 'hello'
        })
        res.end('<h1>page not found <h1>')
    }
})
//server 有几个参数。  端口 
server.listen(8000, '127.0.0.1', () => {
    console.log('server has been start on port 8000 ')
})