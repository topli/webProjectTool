<template>
  <div class="aou-template" v-loading="actionLoading">
    <div class="aou-body">
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="身高">
          <el-input v-model="form.height"></el-input>
        </el-form-item>
        <el-form-item label="所属组织">
          <org-tree v-model="form.org"></org-tree>
        </el-form-item>
        <el-form-item label="启用/禁用">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
      </el-form>
    </div>
    <div class="aou-footer">
      <el-button @click="submit" type="primary">确定</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </div>
</template>

<script>
  import 'static/styles/aou.scss'; // 新增弹窗样式
  import { addData } from './service';

  export default {
    props: {
      data: Object
    },
    data() {
      return {
        form: {},
        loading: true
      };
    },
    created() {
      this.form = this.data;
    },
    mounted() {},
    computed: {
      actionLoading() {
        return this.$store.getters.actionLoading;
      }
    },
    methods: {
      // 取消按钮
      close() {
        // 隐藏方法
        // this.$parent.$parent.closeDialog();
        this.$dialog.closeAll();
      },
      // 提交按钮
      submit() {
        addData(this.form).then(() => {
          this.$message.success('成功');
          // 执行操作后隐藏弹出框
          this.close();
        }).catch(error => {
          console.log(error);
        });
      }
    },
    watch: {
      data: function (val) {
        this.form = val;
      }
    }
  };
</script>

<style scoped>
</style>
