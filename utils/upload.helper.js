const path = require("path");

const checkImageType = function (file, cb) {
//Allowed file extensions
const fileTypes = /jpeg|jpg|png|gif|svg/;

//check extension names
const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

const mimeType = fileTypes.test(file.mimetype);

if (mimeType && extName) {
return cb(null, true);
} else {
cb("Error: You can Only Upload Images!!");
}
};
const checkAttachmentType = function (file, cb) {
//Allowed file extensions
const fileTypes = /pdf|text/;

//check extension names
const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

const mimeType = fileTypes.test(file.mimetype);

if (mimeType && extName) {
return cb(null, true);
} else {
cb("Error: You can Only Upload Images!!");
}
};

module.exports = {checkImageType, checkAttachmentType}