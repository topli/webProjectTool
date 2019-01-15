<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="visible"
    :width="width"
    @close="close"
    center>
    <component :is="component" v-if="visible" ref="component" :data="componentData"></component>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        width: '50%',
        visible: true,
        componentData: {}
      };
    },
    created() {
      console.log(1);
    },
    methods: {
      close() {
        this.visible = false;
        this.onClose();
      }
    },
    beforeDestroy() {
      console.log('beforeDestroy');
    }
  };
</script>

<style scoped>

</style>
