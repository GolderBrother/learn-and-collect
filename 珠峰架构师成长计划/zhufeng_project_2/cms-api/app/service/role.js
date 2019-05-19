const BaseService = require('./base');
class RoleService extends BaseService {
    constructor(...args){
      super(...args);
      this.table = 'role';
    }
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
      for(let i=0;i<list.length;i++){
        let records = await app.mysql.select('role_resource',{where:{role_id:list[i].id}});
        // [{role_id:1,resource_id:1}]=>[1]
        let resourceIds =  records.map(item=>item.resource_id);
        list[i].resourceIds= resourceIds;

        records = await app.mysql.select('role_user',{where:{role_id:list[i].id}});
        // [{role_id:1,resource_id:1}]=>[1]
        let userIds =  records.map(item=>item.user_id);
        list[i].userIds= userIds;
      }
      const total = await app.mysql.count(this.table,where);
      return {list,total};
    }
    async getUser(){//获取所有的用户
     const {app} = this;
     return await app.mysql.select('user');
    }
    async setUser(values){
      const {app} = this;
      let {roleId,userIds} = values;
      const conn = await app.mysql.beginTransaction(); // 初始化事务
      try {
         //1.先删除 所有的关联记录 DELETE FROM role_user WHERE role_id=1
          await conn.query(`DELETE FROM role_user WHERE role_id=?`,[roleId]);
          //2.插入新的关联记录
          for(let i=0;i<userIds.length;i++){
            let userId = userIds[i];
            await conn.insert('role_user',{role_id:roleId,user_id:userId});
          }
        await conn.commit(); // 提交事务
      } catch (err) {
        // error, rollback
        await conn.rollback(); // 一定记得捕获异常后回滚事务！！
        throw err;
      }

      return '给角色分配用户成功!'
    }
    async getResource(){
      const {app} = this;
      let list =  await app.mysql.select('resource');
      let resources = [];
      let map = {};
      list.forEach(item=>{
        item.children = [];
        map[item.id] = item;
        if(item.parent_id == 0){
          resources.push(item);
        }else{
          map[item.parent_id]&&map[item.parent_id].children.push(item);
        }
      });
      return resources;
    }
    async setResource(values){
      const {app} = this;
      let {roleId,resourceIds} = values;
      //1.先删除 所有的关联记录 DELETE FROM role_user WHERE role_id=1
      await app.mysql.query(`DELETE FROM role_resource WHERE role_id=?`,[roleId]);
      //2.插入新的关联记录
      for(let i=0;i<resourceIds.length;i++){
        let resourceId = resourceIds[i];
        await app.mysql.insert('role_resource',{role_id:roleId,resource_id:resourceId});
      }
      return '给角色分配资源成功!';
    }
}
module.exports = RoleService;
