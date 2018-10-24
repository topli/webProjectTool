<template>
  <div class="list-template">
    <search-tem @on-search="onSearch">
      <el-form :inline="true" :model="searchFrom">
        <el-form-item>
          <el-input v-model="searchFrom.user" placeholder="类型"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchFrom.user" placeholder="标签"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchFrom.user" placeholder="父级"></el-input>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="list-el">
      <el-button type="ghost" @click="addOrUpdate" v-btn-auth="">{{$t('table.add')}}</el-button>
      <el-button type="ghost" @click="importFun">{{$t('table.import')}}</el-button>
      <el-button type="ghost" @click="exportFun">{{$t('table.export')}}</el-button>
    </div>
    <div class="list-el">
      <t-for-column selection index :data="list" :columnsTitle="columnsTitle" @select-change="handleSelectionChange"></t-for-column>
      <el-pagination
        class="list-page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchData.pageNo"
        :page-sizes="pageSizeOpts"
        :page-size="searchData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElement">
      </el-pagination>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :title="diaTitle"
      :visible.sync="diaVisible"
      :width="diaWidth"
      center>
      <component :is="diaCurrentPage" v-if="diaVisible" ref="dialogBox" :data="dialogData"></component>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList } from './service';
  import addOrUpdate from './addOrUpdate';
  import list from '@/libs/mixins/list';

  export default {
    components: { addOrUpdate },
    mixins: [list],
    data() {
      return {
        columnsTitle: [
          {
            key: 'label',
            title: '标签',
            width: '180'
          },
          {
            key: 'key',
            title: '键',
            width: '180'
          },
          {
            key: 'value',
            title: '值',
            width: '180'
          },
          {
            key: 'group',
            title: '分组',
            width: '180'
          },
          {
            key: 'childCount',
            title: '子级数量',
            width: '180'
          },
          {
            key: 'createTime',
            title: '创建时间',
            minWidth: '180',
            filters: 'parseTime'
          },
          {
            title: '操作',
            width: '100',
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return h('div', this.iconBtn(h, params, [
                { icon: 'edit', t: 'table.edit', handler: this.addOrUpdate },
                { icon: 'delete', t: 'table.delete', handler: this.deleteItem }
              ]));
            }
          }
        ],
        importType: 'dictionary'
      };
    },
    mounted() {
    },
    methods: {
      _getList() {
        this.loading = true;
        fetchList().then(res => {
          this.list = res.data.items;
          this.totalElement = res.data.total;
        });
      },
      getFormById(id) {
        setTimeout(() => {
          this.list.forEach((item) => {
            if (item.id === id) this.dialogData = item;
          });
        }, 1000);
      },
      clearForm() {
      },
      deleteSub(id) {
      }
    }
  };
</script>

<style scoped>

</style>
