<template>
  <div class="list-template">
    <search-tem class="list-search" @on-search="onSearch">
      <el-form :inline="true" :model="searchFrom">
        <el-form-item>
          <el-input v-model="searchFrom.user" placeholder="审批人" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchFrom.region" placeholder="活动区域" clearable>
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <org-tree v-model="searchFrom.org" placeholder="选择组织"></org-tree>
        </el-form-item>
        <el-form-item>
          <org-tree v-model="searchFrom.org" placeholder="选择组织"></org-tree>
        </el-form-item>
        <el-form-item>
          <org-tree v-model="searchFrom.org" placeholder="选择组织"></org-tree>
        </el-form-item>
        <el-form-item>
          <org-tree v-model="searchFrom.org" placeholder="选择组织"></org-tree>
        </el-form-item>
        <el-form-item>
          <org-tree v-model="searchFrom.org" placeholder="选择组织"></org-tree>
        </el-form-item>
        <el-form-item>
          <org-tree v-model="searchFrom.org" placeholder="选择组织"></org-tree>
        </el-form-item>
        <el-form-item>
          <org-tree v-model="searchFrom.org" placeholder="选择组织"></org-tree>
        </el-form-item>
        <el-form-item>
          <org-tree v-model="searchFrom.org" placeholder="选择组织"></org-tree>
        </el-form-item>
      </el-form>
    </search-tem>
    <div class="list-el">
      <icon-btn icon="add" :content="$t('table.add')" @click="addData"></icon-btn>
      <icon-btn icon="import" :content="$t('table.import')" @click="importFun"></icon-btn>
      <icon-btn icon="export" :content="$t('table.export')" @click="exportFun"></icon-btn>
    </div>
    <div class="list-el list-autoHeight">
      <div class="list-table">
        <t-for-col selection index :data="list" :sort-change="sortChange" :columnsTitle="columnsTitle" @select-change="handleSelectionChange"></t-for-col>
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
    </div>
  </div>
</template>

<script>
  // import { fetchList } from './service';
  // import { iconTooltip } from '@/libs/utils/table';
  import add from './add';
  import list from '@/libs/mixins/list';
  import dialog from '@/libs/mixins/dialog';

  export default {
    mixins: [list, dialog],
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
            ],
            sortable: 'custom' // 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
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
          //     return h('span', [h('span', params.column.label), iconTooltip(h, '提示')]);
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
                { icon: 'edit', t: 'table.edit', handler: this.addData }, // this.addOrUpdate 引用 list.js 方法 此方法为新增时显示窗口用
                { icon: 'delete', t: 'table.delete', handler: this.deleteItem } // this.deleteItem 引用 list.js 方法 此方法为删除数据时提示窗口
              ]));
            }
          }
        ],
        fileType: 'user'
      };
    },
    mounted() {
    },
    methods: {
      sortChange(data) {
        console.log(data);
      },
      _getList() {
        this.loading = true;
        // fetchList(this.searchData).then(res => {
        //   setTimeout(() => {
        //     this.list = res.data.items;
        //     this.totalElement = res.data.total;
        //   }, 2000);
        // });
        setTimeout(() => {
          this.list = [
            { username: '1111111111111111111111111111111111133333333333333333333333332222222222222111', age: 23 },
            { username: '222', age: 25 },
            { username: '3333', age: 24 },
            { username: '3333', age: 24 },
            { username: '3333', age: 24 },
            { username: '3333', age: 24 },
            { username: '3333', age: 24 },
            { username: '3333', age: 24 },
            { username: '3333', age: 24 },
            { username: '3333', age: 24 },
            { username: '3333', age: 24 },
            { username: '3333', age: 24 },
            { username: '3333', age: 24 },
            { username: '3333', age: 24 },
            { username: '3333', age: 24 },
            { username: '11111', age: 23 }
          ];
          this.totalElement = 1;
        }, 2000);
      },
      // this.addOrUpdate方法会调用此方法 在编辑时获取当前数据
      getFormById(id) {
        setTimeout(() => {
          this.list.forEach((item) => {
            if (item.id === id) this.dialogData = item;
          });
        }, 1000);
      },
      addData() {
        this.$dialogBox({ title: '新增', components: add, props: { id: 2 }});
      }
    }
  };
</script>

<style scoped>
</style>
