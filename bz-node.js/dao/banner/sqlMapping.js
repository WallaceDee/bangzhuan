module.exports = {
  listAll: 'SELECT * FROM bz_banner ORDER BY updateTime DESC',
  list: 'SELECT * FROM bz_banner WHERE enable=1 ORDER BY updateTime DESC',
  insert:'INSERT INTO bz_banner(description,enable,thumbnail,url,createTime,updateTime) VALUES({{description}},{{enable}},{{thumbnail}},{{url}},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
  update:'UPDATE bz_banner SET description={{description}},enable={{enable}},thumbnail={{thumbnail}},url={{url}},updateTime=CURRENT_TIMESTAMP WHERE id={{id}}',
  delete: 'DELETE FROM bz_banner WHERE id = {{id}}',
  setEnable:'UPDATE bz_banner SET enable={{enable}},updateTime=CURRENT_TIMESTAMP WHERE id={{id}}',
  setUpdateTime:'UPDATE bz_banner SET updateTime=CURRENT_TIMESTAMP WHERE id={{id}}'
}