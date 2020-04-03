module.exports = {
  insert: 'INSERT INTO table_user(userName,userNickName,userPassword,createTime,updateTime) VALUES({{usernam}},{{name}},{{password}},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)',
  delete: 'DELETE FROM table_user WHERE userId={{userId}}',
  update: `UPDATE table_user SET userNickName={{userNickName}},userAvatar={{userAvatar}} ,userPhone={{userPhone}} ,userGender={{userGender}},updateTime=CURRENT_TIMESTAMP WHERE userId={{userId}}`,
  list: `SELECT id,username,nickname,avatar,job,gender,createTime,updateTime FROM bz_user 
  WHERE username LIKE CONCAT("%",{{keyword}},"%") 
  OR nickname LIKE CONCAT("%",{{keyword}},"%") 
  OR job LIKE CONCAT("%",{{keyword}},"%") 
  LIMIT {{currentIndex}},{{rows}};
  SELECT COUNT(*) AS total FROM bz_user 
  WHERE username LIKE CONCAT("%",{{keyword}},"%") 
  OR nickname LIKE CONCAT("%",{{keyword}},"%") 
  OR job LIKE CONCAT("%",{{keyword}},"%");`,
  login: 'SELECT id,username,nickname,avatar,job,gender,createTime,updateTime FROM bz_user WHERE username={{username}} AND password ={{password}}',
  getAdminUserInfo: 'SELECT userNickName,userAvatar,job,signature,userPhone,userBirthday,userGender,createTime FROM table_user WHERE userId=1',
  updateAvatar: 'UPDATE table_user SET userAvatar=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
  updateNickName: 'UPDATE table_user SET userNickName=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
  updatePhone: 'UPDATE table_user SET userPhone=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
  updateGender: 'UPDATE table_user SET userGender=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
  updateBirthday: 'UPDATE table_user SET userBirthday=? ,updateTime=CURRENT_TIMESTAMP WHERE userName=?',
  checkIfExistByWeiboId: 'SELECT userId,userName,userNickName,userAvatar,userBirthday,userPhone,userGender,createTime FROM table_user WHERE weiboId={{weiboId}}',
  checkIfExistByQQOpenid: 'SELECT userId,userName,userNickName,userAvatar,userBirthday,userPhone,userGender,createTime FROM table_user WHERE qqOpenId={{openid}}',
  signUpWithWeibo: 'INSERT INTO table_user(weiboId,userNickName,userAvatar,userGender,createTime,updateTime) VALUES({{weiboId}},{{userNickName}},{{userAvatar}},{{userGender}},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);SELECT userId,userName,userNickName,userAvatar,userBirthday,userPhone,userGender,createTime FROM table_user WHERE weiboId={{weiboId}};',
  signUpWithQQ: 'INSERT INTO table_user(qqOpenId,userNickName,userAvatar,userGender,createTime,updateTime) VALUES({{openid}},{{userNickName}},{{userAvatar}},{{userGender}},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);SELECT userId,userName,userNickName,userAvatar,userBirthday,userPhone,userGender,createTime FROM table_user WHERE qqOpenId={{openid}};',
  getUserByUserName: 'SELECT userName FROM table_user WHERE table_user.userName={{username}}'
}