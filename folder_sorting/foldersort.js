
//import node.js module 

const fs = require("fs");
const path =require("path")
let folderpath = "./testfolder";

//get file names (returns array)
let files = fs.readdirSync(folderpath);

// console.log(files) ;

for (let i = 0; i < files.length; i++)
    sortfolder(files[i]);

function checkext(file) {
    return file.split(".")[1];
}

function movefile(file, ext) {
    
    // let src = path.join(__dirname , "testfolder" , file);
    let src = `${folderpath}/${file}`;
    console.log(src);
    if (ext == "txt" || ext == "doc" || ext == "pdf") {
        let dest = `${folderpath}/documents/${file}`;
        fs.copyFileSync(src, dest);
    }
    else if (ext == "jpg" || ext == "png" || ext == "gif") {
        let dest = `${folderpath}/images/${file}`;
        fs.copyFileSync(src, dest);
    }
    if(ext){
        fs.unlinkSync(src);
    }
    // fs.unlinkSync(src);
}

function createfolder(ext) {
    if (ext == "txt" || ext == "doc" || ext == "pdf") {
        let extfolderpath = `${folderpath}/documents`;
        fs.mkdirSync(extfolderpath);
    }
    else if (ext == "jpg" || ext == "png" || ext == "gif") {
        let extfolderpath = `${folderpath}/images`;
        fs.mkdirSync(extfolderpath);
    }
}

function folderexists(ext) {
    if (ext == "txt" || ext == "doc" || ext == "pdf") {
        let extfolderpath = `${folderpath}/documents`;
        return fs.existsSync(extfolderpath);
    }
    else if (ext == "jpg" || ext == "png" || ext == "gif") {
        let extfolderpath = `${folderpath}/images`;
        return fs.existsSync(extfolderpath);
    }
}

function sortfolder(file) {
    let ext = checkext(file);
    if (folderexists(ext)) {
        movefile(file, ext);
    }
    else {
        createfolder(ext);
        movefile(file, ext);
    }

}

