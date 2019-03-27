<template>
  <div>
    <el-button type="ghost" @click="dialogBox">dialogBox</el-button>
    <el-button type="ghost" @click="showAdd">showAdd</el-button>
  </div>
</template>

<script>
  import test from './test';
  import addOrUpdate from './addOrUpdate.vue';
  export default {
    data () {
      return {
        importType: 'dialogBox'
      };
    },
    methods: {
      dialogBox() {
        this.$dialogBox({ title: '导出', components: test, props: { id: 2 }, onSub: (el) => { console.log(el); } });
      },
      showAdd() {
        this.$dialogBox({ title: '新增', components: addOrUpdate, props: { id: 2 }});
      }
    }
  };
</script>

<style scoped>

</style>
