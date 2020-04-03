<template>
      <span class="arrow" :class="[type]" :style="`background-color: ${bg};width:${size}px;height:${size}px;background-size: ${size}px`"></span>
</template>
<script>
export default {
  name: "Block",
  props:{
    size:{
      type:Number,
      default:26
    },
    bg:{
      type:String,
      default:'#eee'
    },
    type:{
      type:String,
      default:'right'
    }
  }
}
</script>
<style lang="less" scoped>
    .arrow {
      outline: none;
      cursor: pointer;
      position: relative;
      display: block;
      border-radius: 50%;
      &:after {
        content: " ";
        display: inline-block;
        height:33%;
        width: 33%;
        border-width: 1px 1px 0 0;
        border-color: #858585;
        border-style: solid;
        transform: translateX(50%) translateY(-50%) matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: relative;
        right: 50%;
        position: absolute;
        top: 50%;
        margin-right: 8%;
      }
      &:hover {
        background-image: linear-gradient(30deg, #0099ff, #07cbd4);
        &:after {
          border-color: #fff;
        }
      }
      &.left{
        transform: rotate(180deg);
      }
    }
</style>