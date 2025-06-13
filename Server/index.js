const http = require('http'); //for Http Server
const fs = require('fs');  // for file handling
const url = require('url'); // for parsing url

const Server = http.createServer((req, res) => {
    
    // Creating log data of req.
    if(req.url === '/favicon.ico') return res.end(); 

     const log = `${Date.now()} : ${req.url} New request coming \n`;
   

    //parse the actual url
    const myUrl = url.parse(req.url);
    console.log(myUrl);
    

    // append log data into file
    fs.appendFile('log.txt', log, (err, data) =>{

        //sending resopse according to url search
        switch(req.url){

            case '/' :
                res.end("Home Page \n");
                break;

            case '/contact' :
                res.end("This is Contact page\n");
                break;

            default :
                res.end(console.log("Something went wrong"));
        }
    })
})

// Assigning serve port number for run the Server
Server.listen(3000, ()=>{console.log("Server is Started")});
