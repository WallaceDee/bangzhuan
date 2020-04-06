<template>
  <div class="block" :style="`background-color:${currentValue.backgroundColor}`">
    <div class="content">
      <h2>{{currentValue.subTitle}}</h2>
      <h1>{{currentValue.label}}</h1>
      <p>{{currentValue.description}}</p>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Block',
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentValue: {}
    }
  },
  watch: {
    currentValue(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.currentValue = val
    }
  },
  mounted() {
    if (this.value) {
      this.currentValue = this.value
    }
  }
}
</script>
<style lang="less" scoped>
.block .content {
  padding-top: 50px;
  > h1,
  > h2,
  > p {
    text-align: center;
  }
  >h1 {
    color: #202020;
    letter-spacing: 2px;
    font-size: 32px;
  }
  > h2 {
    font-size: 18px;
    letter-spacing: 2px;
    color: #c9c9c9;
    font-weight: normal;
  }
  > p {
    color: #858585;
    font-size: 18px;
    margin-bottom: 30px;
  }
}
@media screen and (min-width: 641px) {
  .block {
      min-width: 1180px;
      .content {
    min-width: 1180px;
  }
  }
}
@media screen and (max-width: 640px) {
  .block .content {
      padding-top: 30px;
    min-width: auto;
    >h1{
      font-size: 22px;
    }
    > h2{
      font-size: 14px;
      letter-spacing: 0;;
    }
    >p{
      font-size: 14px;
    }
  }
}
</style>