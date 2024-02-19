const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Tour = require('../../models/tourModel')

dotenv.config({ path: '../../config.env' })
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)


mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false

}).then(con => {

})
//读取文件
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

//import data
const importData = async () => {
    try {
        await Tour.create(tours)
        console.log('DATA LOADED')
    } catch (err) {
        console.log(err)
    }
    process.exit()

}

//删除原有data
const deleteData = async () => {
    try {
        await Tour.deleteMany()
        console.log('DATA DELETED')
    } catch (err) {
        console.log(err)
    }
    process.exit()

}

if(process.argv[2] === '--import'){
    importData()
}else if(process.argv[2] === '--delete'){
    deleteData()
}