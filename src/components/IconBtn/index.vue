<template>
  <!-- IconBtn -->
  <div @click="clickBtn($event)" class="newIconBtn" :style="styles" v-btn-auth="authCode">
    <el-tooltip  placement="bottom" :content="content" :open-delay="500">
      <svg-icon :icon-class="icon"></svg-icon>
    </el-tooltip>
  </div>
</template>

<script>
  export default {
    props: {
      content: String,
      icon: String,
      size: {
        type: String,
        default: '18'
      },
      color: {
        type: String
      },
      authCode: String
    },
    computed: {
      styles() {
        var style = { fontSize: this.size + 'px', color: this.color }
        return style
      }
    },
    methods: {
      clickBtn($event) {
        this.$emit('click', $event)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .newIconBtn {
    /*margin-left: 5px;*/
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 0px 3px;
    font-size: 12px;
    border-radius: 4px;
    -webkit-transition: color .2s linear,background-color .2s linear,border .2s linear,-webkit-box-shadow .2s linear;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear,-webkit-box-shadow .2s linear;
    color: #495060;
  }
</style>
