var startTime = Date.now();
var db = connect('school');
for(var i=1;i<100;i++){
    db.users.insert({_id:i,name:'zfpx'+i});
}
print(Date.now() - startTime);