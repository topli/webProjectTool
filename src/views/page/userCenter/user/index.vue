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
      <el-table
        :data="list"
        border
        style="width: 100%">
        <el-table-column
          fixed
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <template v-for="col in columnsTitle">
          <el-table-column
            :prop="col.key"
            :label="col.title + (col.unit ? '(' + col.unit + ')' : '')"
            :width="col.width || null"
            :formatter="col.formatter || null">
          </el-table-column>
        </template>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
          align="center">
          <template slot-scope="scope">
            <icon-btn icon="edit" :content="$t('table.edit')" auth-code="" @click="addOrUpdate(scope.row.id)"></icon-btn>
            <icon-btn icon="delete" :content="$t('table.delete')" auth-code="" @click="deleteItem(scope.row.id)"></icon-btn>
          </template>
        </el-table-column>
      </el-table>
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
      width="diaWidth"
      center>
      <component :is="diaCurrentPage" ref="dialogBox" :data="dialogData"></component>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList } from './service';
  import addOrUpdate from './addOrUpdate';
  import importTemplate from './importTemplate';
  import list from '@/libs/mixins/list';

  export default {
    components: { addOrUpdate, importTemplate },
    mixins: [list],
    data() {
      return {
        columnsTitle: [
          {
            key: 'username',
            title: '姓名',
            width: '180',
            unit: '',
            filter: ''
          },
          {
            key: 'age',
            title: '年龄',
            width: '180',
            unit: '岁',
            filter: ''
          },
          {
            key: 'createTime',
            title: '创建时间',
            unit: '',
            formatter: (row, col, value, index) => {
              return this.parseTime(value);
            }
          }
        ]
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
        console.log(id);
        setTimeout(() => {
          this.list.forEach((item) => {
            if (item.id === id) this.dialogData = item;
          });
        }, 5000);
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
