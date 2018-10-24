<template>
  <div class="list-template">
    <search-tem @on-search="onSearch">
      <el-form :inline="true" :model="searchFrom">
        <el-form-item>
          <el-input v-model="searchFrom.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchFrom.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchFrom.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchFrom.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchFrom.user" placeholder="审批人"></el-input>
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
            key: 'username',
            title: '姓名',
            width: '180'
          },
          {
            key: 'age',
            title: '年龄',
            width: '180',
            unit: '岁',
            searchFilters: [
              { text: '> 20', value: 20 },
              { text: '> 50', value: 50 }
            ]
          },
          // renderHeader 用法
          // renderContent 用法
          // {
          //   key: 'age',
          //   title: 'test',
          //   width: '180',
          //   searchFilters: [
          //     { text: 'test1', value: 11 },
          //     { text: 'test2', value: 22 }
          //   ],
          //   renderHeader: (h, params) => {
          //     return h('span', [h('span', params.column.label), this.iconTooltip(h, '提示')]);
          //   },
          //   render: (h, params) => {
          //     return h('div', [
          //       h('el-input', {
          //         props: { value: params.row.age },
          //         on: {
          //           input: (val) => {
          //             // 通过index找到对应的值 并改变输入值
          //             this.$set(this.list[params.$index], 'age', val);
          //           }
          //         }
          //       })]);
          //   }
          // },
          {
            key: 'createTime',
            title: '创建时间',
            filters: 'parseTime'
          },
          {
            title: '操作',
            width: '100',
            align: 'center',
            render: (h, params) => {
              return h('div', this.iconBtn(h, params, [
                { icon: 'edit', t: 'table.edit', handler: this.addOrUpdate },
                { icon: 'delete', t: 'table.delete', handler: this.deleteItem }
              ]));
            }
          }
        ],
        importType: 'user'
      };
    },
    mounted() {
    },
    methods: {
      _getList() {
        this.loading = true;
        fetchList({ pageNo: 1, pageSize: 10 }).then(res => {
          setTimeout(() => {
            this.list = res.data.items;
            this.totalElement = res.data.total;
          }, 2000);
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
