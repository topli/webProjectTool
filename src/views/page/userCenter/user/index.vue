<template>
  <div class="list-tem">
    <search-tem :toggleOpen="openSearch">
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
        <el-form-item>
          <el-select v-model="searchFrom.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="btn" class="btn">
        <el-button type="text" @click="openSearchFun" :icon="toggleFromIcon">更多</el-button>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </div>
    </search-tem>
    <div class="list-div">
      <el-button type="ghost" @click="onSearch" v-btn-auth="'add'">新增</el-button>
      <el-button type="ghost" @click="onSearch">导入</el-button>
      <el-button type="ghost" @click="onSearch">导出</el-button>
    </div>
    <div class="list-div">
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
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <icon-btn icon="edit" content="编辑" auth-code="edit"></icon-btn>
            <icon-btn icon="delete" content="删除" auth-code="delete"></icon-btn>
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
  </div>
</template>

<script>
  import {fetchList} from './service';
  import list from '@/libs/mixins/list';

  export default {
    components: {},
    mixins: [list],
    data () {
      return {};
    },
    mounted () {
    },
    methods: {
      _getList () {
        this.loading = true;
        fetchList().then(res=> {
          this.list = res.data.items;
          this.totalElement = res.data.total;
        });
      }
    }
  };
</script>

<style scoped>

</style>
