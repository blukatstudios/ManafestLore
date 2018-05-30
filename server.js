var http = require('http');
var url = require('url');
var fs = require('fs');
var files;
//create a server object:
http.createServer(function (req, res) {
  var q = url.parse(req.url, true).query;
  var r = res;
  var file = page_to_file(q.page);
  if(file == ''){
    serveFile('templates/index.html', r);
    return;
  }
  serveFile(file, res);
}).listen(8080);

function page_to_file(page){  
  var pages = {
    'index' : 'index.html',
    // Factions
    'carthage' : 'carthage.html',
    'aztec' : 'aztec.html',
    'incan_empire' : 'incan_empire.html',
    'iriqouis' : 'aztec.html',
    'han_empire' : 'han_empire.html',
    'united_mahajanapadas' : 'united_mahajanapadas.html',
    'demon_army' : 'demon_army.html',
    'europa' : 'europa.html',
    'persia' : 'persia.html',
    'roman_empire' : 'roman_empire.html',
    // Magic and technology
    'arcane_arts' : 'arcane_arts.html',
    'divine_arts' : 'divine_arts.html',
    'magicnology' : 'magicnology.html',
    'mundane_technology' : 'mundane_tech.html',
    // Characters and races
    'bestiary' : 'bestiary.html',
    'pantheon' : 'pantheon.html',
    'history' : 'history.html'
  };
  if(!(page in pages)){ return ''; }
  return 'templates/' + pages[page];
}

function getFiles(_path){
  var path = typeof _path !== 'undefined' ?  _path  : '.';
  console.log("Path=" + path);
  fs.readdir(path, function(err, items) {
    files = items;
    console.log('found' + files);
  });
}

function serveFile(file, res){
  var _res = res;
  console.log('Serving file:' + file);
  fs.readFile(file, function(err, data){
    _res.writeHead(200, {'Content-Type': 'text/html'});
    _res.write(data);
    _res.end();
  });
}
