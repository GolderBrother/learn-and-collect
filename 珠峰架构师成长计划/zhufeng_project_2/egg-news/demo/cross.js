//cross-env EGG_SERVER_ENV=local
let paramstring = 'EGG_SERVER_ENV=local';
let [key,val] = paramstring.split('=');
if(WINDOWS){
  SET key = val;
}else if(MAC){
  EXPORT key = value;
}
