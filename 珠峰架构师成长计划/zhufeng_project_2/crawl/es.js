let elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
    host:'localhost:9200',
    log:'trace'
});

(async function(){
    let name = Date.now();
    let id = Date.now();
    const created = await client.create({
        index:'student',
        type:'city',
        id,
        body:{
            name,
            age:10
        }
    });
    const updated = await client.update({
        index:'student',
        type:'city',
        id,
        body:{
            doc:{
                name:'zfpx2',
                age:100
            }
        }
    });
    console.log(updated);
    const deleted = await client.delete({
        index:'student',
        type:'city',
        id
    });
    console.log(deleted);
})();