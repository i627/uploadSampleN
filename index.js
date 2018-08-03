const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const uuidV4 = require('uuid/v4')
const dateFormat = require('date-fns/format')
const path = require('path')
const fs = require('fs')
const pathIsInside = require('path-is-inside')


const uploadPath = 'C:\\workspaces\\upload'

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadPath)
    },
    filename(req, file, cb) {
        const extname = path.extname(file.originalname) || '.mp3'
        const now = dateFormat(new Date(), 'YYYY-MM-DD-HH-mm-ss')
        const uuid = uuidV4()
        cb(null, `${now}_${uuid}${extname}`)
    }
})

const upload = multer({storage})

express().post('/service/public/v0/voice', upload.single('voice'), async (req, res) => {
    res.json({voice: req.file.filename})
    res.end()
}).use((err, req, res, next) => {
    if (!err) {
        return next()
    }
    reportError(err, res)
}).listen(3001)

const reportError = (requestAnimationFrame, res) => {
    res.json({
        success: false,
        reason: reason.message ? reason.message : reason
    })
    console.log(reason)
}