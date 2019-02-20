<template>
  <div>
    <el-button type="ghost" @click="showDialog">showDialog</el-button>
    <el-button type="ghost" @click="showAdd">showAdd</el-button>
  </div>
</template>

<script>
  import test from './test';
  import addOrUpdate from './addOrUpdate.vue';
  export default {
    data () {
      return {
        importType: 'showDialog'
      };
    },
    methods: {
      showDialog() {
        this.$dialog(test, { title: '导出' });
      },
      showAdd() {
        this.$dialog(addOrUpdate, { title: '编辑', data: { id: 1 }});
      }
    }
  };
</script>

<style scoped>

</style>
