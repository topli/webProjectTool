<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="visible"
    :width="width"
    @close="closeDialog"
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
    },
    methods: {
      closeDialog() {
        console.log('close');
        this.onClose();
      }
    }
  };
</script>

<style scoped>

</style>
