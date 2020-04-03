module.exports = {
  list: `SELECT * FROM bz_team
  WHERE name LIKE CONCAT("%",{{name}},"%") 
  ORDER BY updateTime DESC
  LIMIT {{currentIndex}},{{rows}};
  SELECT COUNT(1) AS total FROM bz_team
  WHERE name LIKE CONCAT("%",{{name}},"%")`,
  insert:`INSERT INTO bz_team(name,photo,title,years,education,experience,customer,createTime,updateTime) 
                               VALUES({{name}},{{photo}},{{title}},{{years}},{{education}},{{experience}},{{customer}},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`,
  update:'UPDATE bz_team SET name={{name}},photo={{photo}},title={{title}},education={{education}},experience={{experience}},customer={{customer}},updateTime=CURRENT_TIMESTAMP WHERE id={{id}}',
  delete:'DELETE FROM bz_team WHERE id={{id}}',
}