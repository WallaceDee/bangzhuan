module.exports = {
  list: 'SELECT * FROM bz_case ORDER BY updateTime DESC',
  insert:'INSERT INTO bz_case(title,subTitle,enable,cover,content,createTime,updateTime) VALUES({{title}},{{subTitle}},{{enable}},{{cover}},{{content}},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
  update:'UPDATE bz_case SET title={{title}},subTitle={{subTitle}},enable={{enable}},cover={{cover}},content={{content}},updateTime=CURRENT_TIMESTAMP WHERE id={{id}}',
  delete: 'DELETE FROM bz_case WHERE id = {{id}}',
  setEnable:'UPDATE bz_case SET enable={{enable}},updateTime=CURRENT_TIMESTAMP WHERE id={{id}}',
  setUpdateTime:'UPDATE bz_case SET updateTime=CURRENT_TIMESTAMP WHERE id={{id}}'
}