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
    methods: {
      showDialog() {
        this.$dialog(test, { title: '新增' });
      },
      showAdd() {
        this.$dialog(addOrUpdate, { title: '编辑', data: { id: 1 }});
      }
    }
  };
</script>

<style scoped>

</style>
