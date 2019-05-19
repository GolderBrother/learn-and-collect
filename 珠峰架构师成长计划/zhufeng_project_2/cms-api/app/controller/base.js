const { Controller } = require('egg');

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  error(error) {
    this.ctx.body = {
      code: 1,
      error,
    };
  }
  async index() {
    const { ctx, service } = this;
    //我们规定分页的条件是放在查询字符串中传过来的
    let {pageNum,pageSize,...where} = ctx.query;
    // pageNum=1 pageSize=5 where={username:'1'}
    const result = await service[this.model].list(pageNum,pageSize,where);
    this.success(result);
  }
  async create() {
    const { ctx, service } = this;
    const entity = ctx.request.body;
    const result = await service[this.model].create(entity);
    if (result.affectedRows > 0) {
      this.success(result.insertId);
    } else {
      this.error('添加失败');
    }
  }
  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const entity = ctx.request.body;
    entity.id = id;
    const result = await service[this.model].update(entity);
    if (result.affectedRows > 0) {
      this.success('更新成功');
    } else {
      this.error('更新失败');
    }
  }
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    let ids = ctx.request.body;
    if(!ids){
      ids = [id];
    }
    const result = await service[this.model].destroy(ids);
    if (result.affectedRows > 0) {
      this.success('删除成功');
    } else {
      this.error('删除失败');
    }
  }
}

module.exports = BaseController;
