module.exports = {
  getSetting: `SELECT * FROM bz_setting WHERE id=1`,
  updateSetting:`UPDATE bz_setting SET name={{name}},tel={{tel}},copyright={{copyright}},wechatMiniProgramQrCode={{wechatMiniProgramQrCode}},wechatQrCode={{wechatQrCode}},serviceHours={{serviceHours}},address={{address}},relatedLinks={{relatedLinks}},data={{data}},description={{description}},headElements={{headElements}}, updateTime=CURRENT_TIMESTAMP WHERE id=1`,
  updateImagesSortList:'UPDATE bz_images_sort_list SET images={{images}} WHERE name={{name}}',
  getImagesSortList:'SELECT images FROM bz_images_sort_list WHERE name={{name}}',
  updateTdk:`UPDATE bz_setting SET headElements={{headElements}}, updateTime=CURRENT_TIMESTAMP WHERE id=1`
}