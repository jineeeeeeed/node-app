const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const querystring = require('querystring');
//------------------------------
const hostname = 'localhost';
const port = 3000;
var request;
var response;

//同期
const index_page = fs.readFileSync('./index.ejs','UTF-8');
const other_page = fs.readFileSync('./other.ejs','UTF-8');
const style_css = fs.readFileSync('./style.css','UTF-8');

var server = http.createServer(getFromCliant);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

//-----------------------------------
function getFromCliant (req,res){
	var url_parts = url.parse(req.url,true);//true をつけるとパラメータもパースされて扱いやすい
	switch(url_parts.pathname){
		case '/':
			indeX_render(req,res,url_parts);
			break;
		case '/other':
			other_render(req,res);
			break;
		case '/style.css':
			res.writeHead(200, {"Content-Type": "text/css"});
			res.write(style_css);
			res.end();
			break;
		default:
			res.writeHead(200,{'Content-Type':'text/plain'});
			res.write('no');
			res.end();
			break;
	}
}

function indeX_render(req,res,url_parts){
	//既にロード済のページにレンだー
	var content = ejs.render(index_page,{
		title:'タイトル'
	});
	content = content.replace('１ss１１','むっき');
	var query = url_parts.query;
	if(query.apple != undefined){
		content +='wee ' +query.apple;
	}else {
		content +='なし ' ;
	}
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write(content);
	res.end();
}

function other_render(req,res){
	//既にロード済のページにレンだー
	var content = ejs.render(other_page,{
		title:'タイotherトル'
	});
	content = content.replace('１ss１１','むっき');
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write(content);
	res.end();
}

//-----------------------------------
