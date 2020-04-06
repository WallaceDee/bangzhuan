module.exports = {
  getSetting: `SELECT * FROM bz_setting WHERE id=1`,
  updateSetting:`UPDATE bz_setting SET name={{name}},tel={{tel}},copyright={{copyright}},wechatMiniProgramQrCode={{wechatMiniProgramQrCode}},wechatQrCode={{wechatQrCode}},serviceHours={{serviceHours}},address={{address}},relatedLinks={{relatedLinks}},data={{data}},description={{description}}, updateTime=CURRENT_TIMESTAMP WHERE id=1`
}