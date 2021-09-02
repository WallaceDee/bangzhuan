module.exports = {
  listAll: 'SELECT * FROM bz_category ORDER BY updateTime DESC',
  list: 'SELECT * FROM bz_category WHERE enable=1 ORDER BY updateTime DESC',
  insert:'INSERT INTO bz_category(name,enable,createTime,updateTime) VALUES({{name}},{{enable}},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
  update:'UPDATE bz_category SET name={{name}},updateTime=CURRENT_TIMESTAMP WHERE id={{id}}',
  delete: 'DELETE FROM bz_category WHERE id = {{id}}',
  setEnable:'UPDATE bz_category SET enable={{enable}},updateTime=CURRENT_TIMESTAMP WHERE id={{id}}',
  setUpdateTime:'UPDATE bz_category SET updateTime=CURRENT_TIMESTAMP WHERE id={{id}}'
}