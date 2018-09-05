<template>
  <!-- list search template -->
  <div class="search-tem">
    <el-row>
      <el-col :span="24">
        <div class="search-from" :class="{'toggle-from':openSearch}">
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
    props: {
      toggleOpen: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      openSearch() {
        return this.toggleOpen
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search-tem {
    position: relative;
  }

  .search-from {
    width: 100%;
    padding-right: 120px;
    transition: height 0.3s;
    -moz-transition: height 0.3s; /* Firefox 4 */
    -webkit-transition: height 0.3s; /* Safari 和 Chrome */
    -o-transition: height 0.3s; /* Opera */
  }

  .toggle-from {
    transition: height 0.3s;
    -moz-transition: height 0.3s; /* Firefox 4 */
    -webkit-transition: height 0.3s; /* Safari 和 Chrome */
    -o-transition: height 0.3s; /* Opera */
    height: 50px;
    overflow: hidden;
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
