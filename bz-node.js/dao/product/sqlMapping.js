module.exports = {
  list: `SELECT p.* ,t.title as typeTitle FROM bz_product p LEFT JOIN bz_product_type t ON (t.type=p.type)
  WHERE p.title LIKE CONCAT("%",{{title}},"%")
  AND p.type LIKE CONCAT("%",{{type}},"%")
  ORDER BY indexTime DESC
  LIMIT {{currentIndex}},{{rows}};
  SELECT COUNT(1) AS total FROM bz_product
  WHERE title LIKE CONCAT("%",{{title}},"%")
  AND type LIKE CONCAT("%",{{type}},"%")`,
  listMenu: `SELECT title as label,subTitle,description,type FROM bz_product_type;SELECT id,type,title as label,description,icon,cover FROM bz_product
  ORDER BY indexTime DESC`,
  insert:`INSERT INTO bz_product(title,type,cover,backgroundColor,content,subItems,icon,description,indexTime,createTime,updateTime) VALUES({{title}},{{type}},{{cover}},{{backgroundColor}},{{content}},{{subItems}},{{icon}},{{description}},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`,
  update:'UPDATE bz_product SET title={{title}},type={{type}},cover={{cover}},backgroundColor={{backgroundColor}},content={{content}},subItems={{subItems}},icon={{icon}},description={{description}},updateTime=CURRENT_TIMESTAMP WHERE id={{id}}',
  delete:'DELETE FROM bz_product WHERE id={{id}}',
  getProductType:'SELECT * FROM bz_product_type',
  setIndexTime:'UPDATE bz_product SET indexTime=CURRENT_TIMESTAMP WHERE id={{id}}'
}