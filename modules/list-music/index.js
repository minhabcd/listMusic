const productModel = require('./modal')



const handler = {
    async findMany(req, res, next) {
        try {
            let { pageIndex, pageSize, sortBy, sort, search = '', field = '' } = req.query
            console.log(search)

            pageSize = parseInt(pageSize) || 20
            pageIndex = parseInt(pageIndex) || 1

            let limit = pageSize
            let skip = (pageIndex - 1) * pageSize
            let sortInfo = `${sort == 'desc' ? '-' : ''}${sortBy}`
            let fieldsArr = field.split(',').map(field => field.trim())
            console.log(fieldsArr)
            let condition = {}
            if (search) {
                condition.title = new RegExp(search, 'i')


            }

            console.log(condition)
                // let items = await productModel.find({ }, fieldsArr).skip(skip).limit(limit).sort(sortInfo)
            let items = await productModel.find(condition, fieldsArr).skip(skip).limit(limit).sort(sortInfo)

            // let items = await productModel.find({})
            res.json(items)
        } catch (error) {
            next(error)
        }

    },

    async search(req, res, next) {
        try {
            let { search = '' } = req.query
            console.log(search)
                // if (search) {
                //     condition.title = new RegExp(search, 'i')

            // }
            // search = new RegExp(search, 'i')
            var phrase = "\"" + search + "\""
            let items = await productModel.find({ $text: { $search: phrase } })
            res.json(items)
            res.json(itemss)
        } catch (error) {
            next(error)
        }

    },

    async findOne(req, res, next) {
        try {
            let id = req.params.id
            let item = await productModel.findById(id)
            console.log(item)
            res.json(item)
        } catch (error) {
            next(error)
        }

    },

    async create(req, res, next) {
        try {
            let data = req.body // { title: '123', description: '123' }
            console.log(data + "ok")
            let item = await productModel.create(data) // { _id: '', title, description }
            res.json(item)
        } catch (err) {
            next(err)
        }
    },
    async update(req, res, next) {
        try {
            let data = req.body
            let id = req.body._id

            if (!id) {
                throw new Error(`Require 'id' to update!`)
            }

            let item = await productModel.findByIdAndUpdate(
                id,
                data, { new: true }
            )
            res.json(item)
        } catch (err) {
            next(err)
        }
    },

    async delete(req, res, next) {
        try {
            let id = req.params.id
            let item = await productModel.findByIdAndDelete(id)
            res.json(item)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = handler