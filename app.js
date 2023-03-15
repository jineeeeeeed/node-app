const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const ejs = require('ejs');
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
	content = content.replace('１ss１１','置換しました');
	//パラメータを取得してcontentに追記
	var query = url_parts.query;
	if(query.apple != undefined){
		content +='URLパラメタ（apple）： ' +query.apple;
	}else {
		content +='URLパラメタ：なし' ;
	}
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write(content);
	res.end();
}

function other_render(req,res){
	//POST
	if(req.method == 'POST'){
		var body ='';
		//データ受信のイベント処理
		req.on('data', function(chunk) {
			body += chunk
			console.log(body);
		});
		//データ受信終了のイベント処理
		req.on('end', function() {
			var postdata = querystring.parse(body);
			// パース後はキー（name）を指定すると値が取得できる
			var apple = postdata.apple;
			var content = ejs.render(other_page,{
				title:'POSTで遷移',
				msg:'POST!'+apple
			});
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(content);
			res.end();
		});

	//GET
	} else {
		//既にロード済のページにレンだー
		var content = ejs.render(other_page,{
			title:'GETで遷移',
			msg:'GET!'
		});
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(content);
		res.end();
	}
}

//-----------------------------------
