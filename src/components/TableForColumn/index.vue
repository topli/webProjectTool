<template>
  <el-table
    :data="data"
    border
    @selection-change="handleSelectionChange"
    style="width: 100%">
    <el-table-column
      v-if="selection"
      fixed
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      v-if="index"
      type="index"
      width="50">
    </el-table-column>
    <template v-for="col in columnsTitle">
      <el-table-column
        show-overflow-tooltip
        :prop="col.key"
        :fixed="col.fixed || null"
        :align="col.align || 'left'"
        :label="label(col)"
        :width="col.width || null"
        :renderHeader="col.renderHeader"
        :filters="col.filters"
        filter-placement="bottom">
        <template slot-scope="scope">
          <render-column :renderContent="col.render" :scope="scope" :prop="col.key"></render-column>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
  import renderColumn from './render-column';
  export default {
    components: { renderColumn },
    data () {
      return {};
    },
    props: {
      selection: { type: Boolean, default: false },
      index: { type: Boolean, default: false },
      data: Array,
      columnsTitle: Array
    },
    created() {
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      label(col) {
        console.log(22222);
        return col.title + (col.unit ? '(' + col.unit + ')' : '');
      },
      handleSelectionChange(selection) {
        if (!this.selection) return;
        this.$emit('select-change', selection);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
