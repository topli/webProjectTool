<template>
  <!-- list search template -->
  <div class="search-tem">
    <el-row>
      <el-col :span="24">
        <div class="search-form" :style="style">
          <slot></slot>
        </div>
        <div class="search-btn">
          <slot name="btn"></slot>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formHeight: 0
      };
    },
    props: {
      toggleOpen: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.formHeight = this.$slots.default[0].elm.clientHeight;
    },
    computed: {
      openSearch() {
        return this.toggleOpen;
      },
      style() {
        if (this.toggleOpen) {
          return { height: this.formHeight + 'px' };
        } else {
          return { height: '50px' };
        }
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .search-tem {
    position: relative;
  }
  .search-form {
    width: 100%;
    padding-right: 120px;
    overflow: hidden;
    transition: height 0.3s;
    -moz-transition: height 0.3s; /* Firefox 4 */
    -webkit-transition: height 0.3s; /* Safari 和 Chrome */
    -o-transition: height 0.3s; /* Opera */
  }

  .search-btn {
    width: 120px;
    position: absolute;
    top: 0;
    right: 10px;

  }
</style>

<style rel="stylesheet/scss" lang="scss">
  .search-btn {
    .btn {
      display: inline-flex;
    }
  }
</style>
