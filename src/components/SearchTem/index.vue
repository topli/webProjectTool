<template>
  <!-- list search template -->
  <div class="search-tem">
    <div class="search-form" :style="style">
      <slot></slot>
    </div>
    <div class="search-btn" :style="btnStyle">
      <slot name="btn">
        <div class="btn">
          <el-button v-if="showMore" type="text" @click="openSearchFun" :icon="toggleFromIcon">更多</el-button>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formHeight: 0,
        toggleOpen: false
      };
    },
    props: {
      paddingRight: {
        type: String,
        default: '135'
      }
    },
    created() {
    },
    mounted() {
      this.getFormHeight();
      window.addEventListener('resize', () => {
        this.getFormHeight();
      });
    },
    computed: {
      showMore() {
        return this.formHeight > 60;
      },
      style() {
        const defStyle = { paddingRight: this.paddingRight + 'px' };
        if (this.toggleOpen) {
          defStyle.height = this.formHeight + 'px';
        } else {
          defStyle.height = '50px';
        }
        return defStyle;
      },
      btnStyle() {
        const defStyle = { width: this.paddingRight + 'px' };
        return defStyle;
      },
      toggleFromIcon() {
        return this.toggleOpen ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
      }
    },
    methods: {
      getFormHeight() {
        if (this.$slots.default && this.$slots.default[0]) {
          this.formHeight = this.$slots.default[0].elm.clientHeight;
        } else {
          this.formHeight = 58;
        }
      },
      openSearchFun() {
        this.toggleOpen = !this.toggleOpen;
      },
      onSearch() {
        this.$emit('on-search');
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .search-tem {
    position: relative;
    width: 100%;
  }
  .search-form {
    min-width: 135px;
    width: 100%;
    overflow: hidden;
    transition: height 0.3s;
    -moz-transition: height 0.3s; /* Firefox 4 */
    -webkit-transition: height 0.3s; /* Safari 和 Chrome */
    -o-transition: height 0.3s; /* Opera */
  }

  .search-btn {
    position: absolute;
    top: 0;
    right: 10px;
    .btn {
      text-align: right;
    }

  }
</style>
