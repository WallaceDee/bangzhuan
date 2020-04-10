<template>
<div class="title-index">
  <div class="title" id="title">
    <h2>{{title.subTitle}}</h2>
  <h1>{{title.label}}</h1>
  </div>
  <slot></slot>
</div>
</template>
<script>
export default {
  name:'Title',
  props:{
    title:{
      type:Object,
      default:() => {}
    }
  }
}
</script>
<style lang="less" scoped>
.title-index{
  position: relative;
.title{
  width: 100%;
   color: #c9c9c9;
    font-weight: normal;
        h1{
      color: #202020;
    }
    h2{  font-weight: normal;}
}
}
@media screen and (min-width: 641px) {
.title-index{
.title{
  padding-top: 100px;
  padding-bottom: 30px;
  padding-left: 50px;
    width: 1180px;
    margin-right: auto;
    margin-left: auto;
    h2{
      font-size: 18px;
    letter-spacing: 2px;
    }
    h1{
    letter-spacing: 2px;
    font-size: 32px;
    }
}
}
}
@media screen and (max-width: 640px) {
.title-index{
.title{
  padding:20px;
   h2{   font-size: 14px;}
       h1{
    font-size: 22px;
    }
  }
}
}
</style>