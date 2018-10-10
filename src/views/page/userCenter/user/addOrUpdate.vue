<template>
  <div class="aou-template">
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
        <el-form-item label="体重">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
      </el-form>
    </div>
    <div class="aou-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="submit" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
  // import { fetchList } from './service';

  export default {
    props: {
      data: Object
    },
    data() {
      return {
        form: {}
      };
    },
    mounted() {
    },
    methods: {
      // 取消按钮
      cancel() {
        this.$parent.$parent.diaVisible = false;
      },
      // 提交按钮
      submit() {
        console.log(this.form);
        // 执行操作后隐藏弹出框
        this.cancel();
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
