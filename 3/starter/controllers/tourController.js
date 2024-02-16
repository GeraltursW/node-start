const fs = require('fs')
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkId = (req, res, next, val) => {
    if (Number(req.params.id) > tours.length) {
        return res.status(404).json({
            status: 404,
            message: 'Invalid ID'
        })
    }
    console.log(val)
    next()
}
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    next()

}
//routing 
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestAt: req.requestTime,
        results: tours.length,
        data: {
            tours,

        }
    })
}

//拿到一个tour

exports.getTour = (req, res) => {
    const id = req.params.id * 1
    const tourEl = tours.find(el => el.id === id)
    res.status(200).json({
        status: 'success',
        data: {
            tourEl,

        }
    })
}
exports.createTour = (req, res) => {
    const newID = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newID }, req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
    res.send('done')
}

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated>',

        }
    })
} 