<template>
  <transition name="fade">
    <el-table
      v-loading="loading"
      :data="data"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%"
      :height="height"
      @sort-change="sortChange">
      <el-table-column
        v-if="selection"
        fixed
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        v-if="index"
        type="index"
        align="center"
        width="70">
      </el-table-column>
      <template v-for="col in columnsTitle">
        <el-table-column
          show-overflow-tooltip
          :prop="col.key"
          :fixed="col.fixed || null"
          :align="col.align || 'left'"
          :label="label(col)"
          :width="col.width || null"
          :minWidth="col.minWidth || null"
          :renderHeader="col.renderHeader"
          :filters="col.searchFilters"
          :filter-method="col.filterMethod"
          :sortable="col.sortable"
          :sort-method="col.sortMethod"
          filter-placement="bottom">
          <template slot-scope="scope">
            <render-column :renderContent="col.render" :scope="scope" :prop="col.key"
                           :filters="col.filters"></render-column>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </transition>
</template>

<script>
  import renderColumn from './render-column';
  export default {
    components: { renderColumn },
    data () {
      return {
        // visible: false,
        tableHeight: 0
      };
    },
    props: {
      selection: { type: Boolean, default: false },
      index: { type: Boolean, default: false },
      data: { type: Array, required: true },
      columnsTitle: { type: Array, required: true },
      sortChange: { type: Function, default: function () {} }
    },
    created() {
      setTimeout(() => {
        // this.visible = true;
        this.$nextTick(() => {
          this.getTableHeight();
        });
      }, 200);
      window.addEventListener('resize', () => {
        this.getTableHeight();
      });
    },
    mounted() {
    },
    computed: {
      loading() {
        return !this.data.length;
      },
      // showTable() {
      //   return this.data.length > 0 || this.visible;
      // },
      height() {
        if (this.tableHeight < 220) {
          return 220;
        }
        return this.tableHeight;
      }
    },
    methods: {
      getTableHeight() {
        this.tableHeight = document.body.clientHeight - this.$el.offsetTop - 120; // 120 (表头 + 分页 高度)
      },
      label(col) {
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
