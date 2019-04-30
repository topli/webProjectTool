<template>
  <!-- IconBtn -->
  <transition name="">
    <div v-btn-auth="authCode" style="display: inline-block">
      <el-tooltip placement="bottom" :content="content" :open-delay="500">
        <div @click="clickBtn($event)" :class="classs" class="newIconBtn" @mouseenter="mouseEnter" @mouseleave="mouseLeave"
             :style="styles">
          <svg-icon :icon-class="icon"></svg-icon>
        </div>
      </el-tooltip>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        mouseSelect: false
      };
    },
    props: {
      content: String,
      icon: String,
      size: {
        type: String,
        default: '16'
      },
      color: {
        type: String
      },
      authCode: String
    },
    computed: {
      classs() {
        if (this.mouseSelect) return 'btn-is-focus';
        return '';
      },
      styles() {
        var style = { fontSize: this.size + 'px' };
        return style;
      }
    },
    methods: {
      clickBtn($event) {
        this.$emit('click', $event);
      },
      mouseEnter() {
        this.mouseSelect = true;
      },
      mouseLeave() {
        this.mouseSelect = false;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .btn-is-focus {
    color: #409Eff !important;
    border: 1px solid #409Eff !important;
  }

  .newIconBtn {
    margin-left: 5px;
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #f0f0f0;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 0px 3px;
    font-size: 12px;
    border-radius: 4px;
    -webkit-transition: color .2s linear,border .2s linear, background-color .2s linear, border .2s linear, -webkit-box-shadow .2s linear;
    transition: color .2s linear,border .2s linear, background-color .2s linear, border .2s linear, box-shadow .2s linear, -webkit-box-shadow .2s linear;
    color: #495060;
  }
</style>
