const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const hostname = 'localhost';
const port = 3000;
var request;
var response;

const index_page = fs.readFileSync('./index.ejs','UTF-8');//同期
var server = http.createServer(getFromCliant);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

//-----------------------------------
function getFromCliant (req,res){
	request = req;
	response = res;
	var content =fs.readFile('./index.html','UTF-8',readHTML);
}

function readHTML(err,data){
	response.writeHead(200,{'Content-Type':'text/html'});
	response.write(data);
	response.end;
}