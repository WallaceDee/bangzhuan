module.exports = {
  list: `SELECT id,username,nickname,avatar,job,gender,isAdmin,email,isSubscribe,createTime,updateTime FROM bz_user 
  WHERE username LIKE CONCAT("%",{{keyword}},"%") 
  OR nickname LIKE CONCAT("%",{{keyword}},"%") 
  OR job LIKE CONCAT("%",{{keyword}},"%") 
  LIMIT {{currentIndex}},{{rows}};
  SELECT COUNT(*) AS total FROM bz_user 
  WHERE username LIKE CONCAT("%",{{keyword}},"%") 
  OR nickname LIKE CONCAT("%",{{keyword}},"%") 
  OR job LIKE CONCAT("%",{{keyword}},"%");`,
  login: 'SELECT id,username,nickname,avatar,job,gender,isAdmin,createTime,updateTime FROM bz_user WHERE username={{username}} AND password ={{password}}',
  getUserInfoById:'SELECT id,username,nickname,avatar,job,gender,isAdmin,email,isSubscribe,createTime,updateTime FROM bz_user WHERE id={{id}}',
  updateUserInfo:'UPDATE bz_user SET nickname={{nickname}},avatar={{avatar}},job={{job}},gender={{gender}},email={{email}},isSubscribe={{isSubscribe}} WHERE id={{id}}',
  getUserByUserName: 'SELECT username FROM bz_user WHERE username={{username}}',
  insert:'INSERT INTO bz_user(username,password,nickname) VALUES({{username}},{{password}},{{nickname}})',
  updatePassword:'UPDATE bz_user SET password={{password}} WHERE id={{userId}}',
  validatePassword:'SELECT username FROM bz_user WHERE id={{userId}} AND password={{password}}'
}