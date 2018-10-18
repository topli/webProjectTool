<template>
  <div class="import-template" v-loading="actionLoading">
    <div class="import-body">
      <el-input type="text"
                v-model="file.name"
                clearable
                @blur="handleBlur"
                @clear="clearFile"
                >
        <el-upload
          slot="append"
          :show-file-list="false"
          ref="upload"
          action="#"
          :on-change="handleChange"
          :auto-upload="false"
          :multiple="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-input>
    </div>
    <div class="import-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="submit" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
  // import { fetchList } from './service';

  export default {
    data() {
      return {
        file: {}
      };
    },
    props: {},
    computed: {
      type () {
        return this.$store.state.app.importType;
      },
      actionLoading() {
        return this.$store.getters.actionLoading;
      }
    },
    mounted() {
    },
    methods: {
      handleBlur() {
        // if (!this.fileName) this.file = {};
        if (!this.file.name) this.file = { name: '' };
      },
      clearFile() {
        this.file = {
          name: ''
        };
      },
      handleChange(file) {
        console.log(file);
        this.file = file || {};
      },
      submitUpload() {},
      // 取消按钮
      cancel() {
        this.$parent.$parent.diaVisible = false;
      },
      // 提交按钮
      submit() {
        this.$store.dispatch('setAL', true);
        setTimeout(() => {
          this.$message.success('成功');
          setTimeout(() => {
            this.$store.dispatch('setAL', false);
            // 执行操作后隐藏弹出框
            this.cancel();
          }, 300);
        }, 3000);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .import-template {
    /*.import-input {*/
      /*width: 80%;*/
      /*display: inline-block;*/
    /*}*/
    /*.import-btn {*/
      /*width: 20%;*/
      /*display: inline-block;*/
    /*}*/
    .import-footer {
      padding: 20px 0 0 0;
      text-align: right;
    }
  }
</style>
