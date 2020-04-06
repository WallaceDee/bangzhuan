<template>
  <div class="about-us">
    <div class="banner"></div>
    <Title :title="{label:'认识帮专',subTitle:'OUR COMPANY'}">
      <div class="content">
        <p class="description" v-for="p in description.split('\n')">{{p}}</p>
        <ul class="data">
          <li v-for="item in data" :style="`width:${data.length>5?25:100/data.length}%`">
            <h1>
              {{item.number}}
              <em>{{item.unit}}</em>
            </h1>
            <p>{{item.description}}</p>
          </li>
        </ul>
      </div>
    </Title>
    <Title :title="{label:'专业团队',subTitle:'OUR TEAM'}"></Title>
  </div>
</template>
<script>
export default {
  name: "AboutUs",
  computed: {
    description() {
      return this.$store.state.description;
    },
    data() {
      return this.$store.state.data;
    }
  }
};
</script>
<style lang="less" scoped>
.about-us {
  .banner {
    width: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(../assets/images/aboutus_bg.jpg);
  }
  .description {
    color: #858585;
  }
  ul.data {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    li {
      text-align: center;
      position: relative;
      &:after {
        position: absolute;
        z-index: 15;
        top: 15%;
        right: 0;
        bottom: auto;
        left: auto;
        display: block;
        width: 1px;
        height: 70%;
        content: "";
        -webkit-transform-origin: 50% 0;
        transform-origin: 50% 0;
        background-color: #e7e7e7;
      }
      &:last-child::after {
        display: none;
      }
      h1 {
        font-size: 36px;
        color: @mainColor;
        em {
          margin-left: 5px;
          font-size: 14px;
          font-weight: normal;
          font-style: normal;
          color: #858585;
        }
      }
      p {
        color: #858585;
      }
    }
  }
}
@media screen and (min-width: 641px) {
  .about-us {
    padding-bottom: 100px;
    overflow: auto;
    min-width: 1180px;
    .banner {
      min-width: 1180px;
      height: 500px;
    }
    .content {
      width: 1180px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 250px;
      .description {
        color: #858585;
        padding: 0 50px;
        margin-bottom: 10px;
        line-height: 24px;
      }
      ul.data {
        padding: 0 50px;
        justify-content: space-between;
        margin-top: 50px;
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .about-us {
    .banner {
      height: 200px;
    }
    .content {
      padding: 0 20px;
      ul.data {
        margin-top: 50px;
        margin-bottom: 50px;
li {
          width: 50% !important;
          &:nth-child(even):after{
            display: none;
          }
        }
      }
    }
  }
}

@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .about-us ul.data li:after {
    transform: scaleX(0.5);
  }
}

@media only screen and (-webkit-min-device-pixel-ratio: 3) {
  .about-us ul.data li:after {
    transform: scaleX(0.33);
  }
}
</style>