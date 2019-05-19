const { Service } = require('egg');
class BaseService extends Service {
  async list(pageNum,pageSize,where) {
    const { app } = this;
    pageNum = isNaN(pageNum)?1:parseInt(pageNum);
    pageSize = isNaN(pageSize)?1:parseInt(pageSize);
    //select * from table where username = 'zfpx' order by id desc limit offset,limit
    const list = await app.mysql.select(this.table,{
      where,
      orders:[['id','asc']],
      offset:(pageNum-1)*pageSize,
      limit:pageSize
    });//resourceIds
    const total = await app.mysql.count(this.table,where);
    return {list,total};
  }
  async create(entity) {
    const { app } = this;
    const result = await app.mysql.insert(this.table, entity);
    return result;
  }
  async update(entity) {
    const { app } = this;
    // update user set a=?,a=? where id=?
    const result = await app.mysql.update(this.table, entity);
    return result;
  }
  async destroy(ids) {
    const { app } = this;
    // delete user where id=?  delete from user where id in (1,2,3)
    const result = await app.mysql.delete(this.table, { id:ids });
    return result;
  }
}
module.exports = BaseService;
