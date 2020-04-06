module.exports = {
  list: `SELECT n.id,n.cover,n.title,n.content,n.updateTime,n.createTime,u.nickname as updator,u.avatar as updatorAvatar,a.avatar as authorAvatar,a.nickname as author
  FROM bz_news n LEFT JOIN bz_user u ON (n.updateBy=u.id) LEFT JOIN bz_user a ON (n.createBy=a.id)
  WHERE n.title LIKE CONCAT("%",{{title}},"%") 
  AND n.content LIKE CONCAT("%",{{content}},"%")
  AND a.nickname LIKE CONCAT("%",{{author}},"%")
  ORDER BY n.updateTime DESC
  LIMIT {{currentIndex}},{{rows}};
  SELECT COUNT(1) AS total FROM bz_news n LEFT JOIN bz_user u ON (n.updateBy=u.id) LEFT JOIN bz_user a ON (n.createBy=a.id)
  WHERE n.title LIKE CONCAT("%",{{title}},"%") 
  AND n.content LIKE CONCAT("%",{{content}},"%")
  AND a.nickname LIKE CONCAT("%",{{author}},"%")`,
  insert:'INSERT INTO bz_news(cover,title,content,createTime,updateTime,createBy,updateBy) VALUES({{cover}},{{title}},{{content}},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,{{userId}},{{userId}})',
  update:'UPDATE bz_news SET cover={{cover}},title={{title}},content={{content}},updateBy={{userId}},updateTime=CURRENT_TIMESTAMP WHERE id={{id}}',
  delete:'DELETE FROM bz_news WHERE id={{id}}',
  detail:'SELECT n.id,n.cover,n.title,n.content,n.updateTime,n.createTime,u.nickname as updator,u.avatar as updatorAvatar,a.avatar as authorAvatar,a.nickname as author FROM bz_news n LEFT JOIN bz_user u ON (n.updateBy=u.id) LEFT JOIN bz_user a ON (n.createBy=a.id) WHERE n.id={{id}}'
}