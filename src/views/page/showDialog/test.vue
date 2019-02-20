<template>
    <div>
      <div class="content">
        <el-radio v-model="radio" label="1">当前页导出</el-radio>
        <el-radio v-model="radio" label="2">按条件导出</el-radio>
      </div>
      <div class="footer">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button type="ghost" @click="cancel">取消</el-button>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'test',
    data () {
      return {
        radio: '1'
      };
    },
    methods: {
      submit() {
        this.cancel();
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        console.log(this);
        setTimeout(() => {
          loading.close();
        }, 2000);
      },
      cancel() {
        this.$dialog.closeAll();
      }
    }
  };
</script>

<style scoped>

</style>
