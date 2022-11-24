const http=require("http");
const fs=require("fs");
const PORT=7777;
const FILE_NAME="temp.txt" //Temperorary file

// function to createFile
const createFile=()=>{
    let data="HELLO WORLD!!! HTTP FS"
    fs.writeFileSync(FILE_NAME,data,(err)=>{
        if(err) throw err;
        console.log("CANNOT WRITE DATA");
    })
}

// function to update static data
const updateFile=()=>{
    let newData=`\n New data appended`
    fs.appendFile(FILE_NAME,newData,"utf8",(err)=>{
        if(err) throw err;
    })
}

// function to deletefile
const deleteFile=()=>{
    fs.unlink(FILE_NAME,(err)=>{
        if(err) throw err;
    })
}

// creating a server instance at server variable
let server=http.createServer((req,res)=>{
    const url=req.url;// url instance
    
    if(url=="/"){
        fs.readFile("./index.html","utf-8",(err,data)=>{
            if(err) throw err;
            res.writeHead(200,{'Content-type':'text/html'})
            res.end(data);
        })
    }

    else if(url=="/createfile"){
        if(fs.existsSync(FILE_NAME)){
            res.writeHead(200,{'Content-type':'text/html'})
            res.write(`File Already Exist <br>
            <a href="/">Go Home</a>`);
            res.end()
        }
        else{
            createFile();
            res.writeHead(200,{'Content-type':'text/html'})
            res.end(`${FILE_NAME} created Successfully 
            <br> <a href="/">Go Home</a>`)
        }
        
    }
    else if(url=="/readfile"){
        if(fs.existsSync(FILE_NAME)){
            fs.readFile(FILE_NAME,"utf-8",(err,data)=>{
                if(err) throw err;
                res.writeHead(200,{'Content-type':'text/html'})
                res.write(`<h2>${data}</h2> <br> <a href="/">Go Home</a>`)
                res.end()
            })
        }
        else{
            res.writeHead(200,{'Content-type':'text/html'})
            res.end(`${FILE_NAME} doesn't exist <br> <a href="/">Go Home</a>`)
        }
    }

    else if(url=="/updatefile"){
        if(fs.existsSync(FILE_NAME)){
            updateFile();
            res.writeHead(200,{'Content-type':'text/html'})
            res.end(`${FILE_NAME} Updated Successfully
            <br> <a href="/">Go Home</a>`)
        }
        else{
            res.writeHead(200,{'Content-type':'text/html'})
            res.end(`File Not Exist
            <br><a href="/">Go Home</a>`);
        }
    }

    else if(url=="/deletefile"){
        if(fs.existsSync(FILE_NAME)){
            deleteFile();
            res.writeHead(200,{'Content-type':'text/html'})
            res.end(`${FILE_NAME} deleted successfully 
            <br> <a href="/">Go Home</a>`)
        }
        else{
            res.writeHead(200,{'Content-type':'text/html'})
            res.end(`${FILE_NAME} file doesn't exist
            <br> <a href="/">Go Home</a>`)
        }
    }
    else{
        fs.readFile("./404.html","utf-8",(err,data)=>{
            if(err) throw err;
            res.writeHead(404, {"Content-Type": "text/html"});  
            res.end(data);
        })
    }

})

server.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Listening on Port ${PORT}`);
})