module.exports = {
  list: `SELECT c.id,c.name,c.phone,c.remark,c.status,c.content,c.updateTime,c.createTime,u.nickname,u.avatar 
  FROM bz_consult c LEFT JOIN bz_user u ON (c.updateBy=u.id)
  WHERE c.name LIKE CONCAT("%",{{name}},"%") 
  AND c.phone LIKE CONCAT("%",{{phone}},"%") 
  AND c.content LIKE CONCAT("%",{{content}},"%")
  AND c.remark LIKE CONCAT("%",{{remark}},"%") 
  AND c.status LIKE CONCAT("%",{{status}},"%") ORDER BY c.updateTime DESC
  LIMIT {{currentIndex}},{{rows}};
  SELECT COUNT(1) AS total FROM bz_consult c
  WHERE c.name LIKE CONCAT("%",{{name}},"%") 
  AND c.phone LIKE CONCAT("%",{{phone}},"%") 
  AND c.content LIKE CONCAT("%",{{content}},"%")
  AND c.remark LIKE CONCAT("%",{{remark}},"%") 
  AND c.status LIKE CONCAT("%",{{status}},"%")`,
  insert:'INSERT INTO bz_consult(name,phone,content,createTime,updateTime) VALUES({{name}},{{phone}},{{content}},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
  setRemarkAndStatus:'UPDATE bz_consult SET remark={{remark}},status={{status}},updateBy={{userId}},updateTime=CURRENT_TIMESTAMP WHERE id={{id}}',
  delete:'DELETE FROM bz_consult WHERE id={{id}}',
  getSubscribeEmail:'SELECT email FROM bz_user WHERE isSubscribe=1',
  setSubscribeStatus:'UPDATE bz_user SET isSubscribe={{isSubscribe}} WHERE id={{userId}}'
}