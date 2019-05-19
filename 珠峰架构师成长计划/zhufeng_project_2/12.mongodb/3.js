var startTime = Date.now();
var db = connect('school');
var records = db.users.find({name:'zfpx888888'}).sort({age:-1});
records.forEach(function(item){
  printjson(item);
});
print(Date.now() - startTime);