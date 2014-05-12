var fs = require('fs');

exports.list = function (req, res) {
  // var savedJSON = fs.readFileSync('message.json', 'utf8');
  // console.log(savedJSON);
  // res.json(savedJSON);
};

exports.create = function (req, res) {
	fs.writeFile('message.json', req.JSON, function (err) {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});
  // var newTodo = req.body;
  // newTodo.id = 1;// 2, 3, .....
  
  // res.json(newTodo);
};

exports.update = function (req, res) {

};

exports.reposition = function (req, res) {

};

exports.delete = function (req, res) {

};


//-----------------------------------------------//
function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}
