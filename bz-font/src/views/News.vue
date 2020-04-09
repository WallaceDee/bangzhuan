<template>
  <div class="news">
    <div class="banner"></div>
        <keep-alive>
         <router-view />
             </keep-alive>
  </div>
</template>
<style lang="less" scoped>
.news {
  background-color: #f8f8f8;
  .banner {
    width: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(../assets/images/news_bg.jpg);
  }
}
@media screen and (min-width: 641px) {
  .news {
    padding-bottom: 100px;
    overflow: auto;
    min-width: 1180px;
    .banner {
      min-width: 1180px;
      height: 500px;
    }}
    }
    @media screen and (max-width: 640px) {
.news{
  .banner{
    height: 200px;
  }
}
}
</style>