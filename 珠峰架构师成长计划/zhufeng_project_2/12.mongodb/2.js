var startTime = Date.now();
var db = connect('school');
var users = [];
for(var i=1;i<1000000;i++){
    users.push({_id:i,name:'zfpx'+i});
}
db.users.insert(users);
print(Date.now() - startTime);