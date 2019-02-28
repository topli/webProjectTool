<template>
  <el-dialog
    ref="dialogs"
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="visible"
    :width="width"
    center
    @close="close">
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
