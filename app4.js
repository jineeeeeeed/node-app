const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
//------------------------------
const hostname = 'localhost';
const port = 3000;
var request;
var response;

//同期
const index_page = fs.readFileSync('./index.ejs','UTF-8');
const style_css = fs.readFileSync('./style.css','UTF-8');

var server = http.createServer(getFromCliant);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

//-----------------------------------
function getFromCliant (req,res){

	var urlParts = url.parse(req.url);
 
	switch(urlParts.pathname){
		case "/":
			var render = ejs.render(index_page, {
				title: "This is title!!",
				content: "This is content!!"
			});
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(render);
			res.end();
			break;
		case "/style.css":
			res.writeHead(200, {"Content-Type": "text/css"});
			res.write(style_css);
			res.end();
			break;
		default:
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end("No pages...");
			break;
	}
}

//-----------------------------------
function readHTML(data,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write(data);
	res.end;
	return;
}

