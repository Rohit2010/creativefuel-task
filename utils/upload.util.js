const multer = require("multer");

const {checkImageType, checkAttachmentType} = require("./upload.helper")

const ImageStorage = multer.diskStorage({
    destination: "public/images/",
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const attachmentStorage = multer.diskStorage({
    destination: "public/document/",
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const uploadImage = multer({
    storage:ImageStorage,
    limits: { fileSize: 1000000 * 2 },
    fileFilter: (req, file, cb) => {
        checkImageType(file, cb);
        },
})
const uploadAttachment = multer({
    storage:attachmentStorage,
    limits: { fileSize: 1000000 * 2 },
    fileFilter: (req, file, cb) => {
        checkAttachmentType(file, cb);
        },
})

module.exports = {uploadImage, uploadAttachment}