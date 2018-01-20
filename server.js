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
    serveFile('index.html', r);
    return;
  }
  serveFile(file, res);
}).listen(8080);

function page_to_file(page){  
  var pages = {
    'index' : 'index.html',
    // Factions
    'carthage' : 'Regional/Africa/Factions/carthage.html',
    'aztec' : 'Regional/America/Factions/aztec.html',
    'incan_empire' : 'Regional/America/Factions/incan_empire.html',
    'iriqouis' : 'Regional/America/Factions/aztec.html',
    'han_empire' : 'Regional/Asia/Factions/han_empire.html',
    'united_mahajanapadas' : 'Regional/Asia/Factions/united_mahajanapadas.html',
    'demon_army' : 'Regional/Europe/Factions/demon_army.html',
    'europa' : 'Regional/Europe/Factions/europa.html',
    'persia' : 'Regional/Europe/Factions/persia.html',
    'roman_empire' : 'Regional/Europe/Factions/roman_empire.html',
    // Magic and technology
    'arcane_arts' : 'Global/Technology/arcane_arts.html',
    'divine_arts' : 'Global/Technology/divine_arts.html',
    'magicnology' : 'Global/Technology/magicnology.html',
    'mundane_technology' : 'Global/Technology/mundane_tech.html',
    // Characters and races
    'bestiary' : 'Global/bestiary.html',
    'pantheon' : 'Global/pantheon.html',
  };
  if(!(page in pages)){ return ''; }
  return pages[page];
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
