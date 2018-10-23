<template>
  <!-- org-tree -->
  <div class="org-tree" style="position: relative" v-clickoutside="handleClickOutside">
    <el-input slot="reference" type="text" @focus="togglePopover" readonly>
      <i slot="suffix" class=""></i>
    </el-input>
    <transition v-if="visible">
      <el-scrollbar class="tree-data">
        <el-input type="text" class="filter-tree-text" v-model="filterText"></el-input>
        <el-tree
          :data="data"
          default-expand-all
          show-checkbox
          @check-change="handleCheckChange">
        </el-tree>
      </el-scrollbar>
    </transition>
  </div>
</template>

<script>
  import Clickoutside from 'element-ui/src/utils/clickoutside';

  export default {
    directives: { Clickoutside },
    data() {
      const data = [
        {
          id: 9999,
          label: '顶级机构',
          type: 'org',
          children: [
            {
              id: 1,
              label: '部门1',
              state: true,
              code: 'BM1',
              linkman: '张三',
              phone: '13211111111',
              parentId: 9999,
              parentName: '顶级机构',
              parentType: 'org'
            },
            {
              id: 2,
              label: '部门2',
              state: true,
              code: 'BM2',
              linkman: '李四',
              phone: '1322222222',
              parentId: 9999,
              parentName: '顶级机构',
              parentType: 'org',
              children: [
                {
                  id: 5,
                  label: '子部门1',
                  state: true,
                  code: 'ZBM1',
                  linkman: '王五',
                  phone: '1313333333',
                  parentId: 2,
                  parentName: '部门2'
                }, {
                  id: 6,
                  label: '子部门2',
                  state: true,
                  code: 'ZBM2',
                  linkman: '赵六',
                  phone: '1511111111',
                  parentId: 2,
                  parentName: '部门2'
                }
              ]
            },
            {
              id: 2,
              label: '部门2',
              state: true,
              code: 'BM2',
              linkman: '李四',
              phone: '1322222222',
              parentId: 9999,
              parentName: '顶级机构',
              parentType: 'org',
              children: [
                {
                  id: 5,
                  label: '子部门1',
                  state: true,
                  code: 'ZBM1',
                  linkman: '王五',
                  phone: '1313333333',
                  parentId: 2,
                  parentName: '部门2'
                }, {
                  id: 6,
                  label: '子部门2',
                  state: true,
                  code: 'ZBM2',
                  linkman: '赵六',
                  phone: '1511111111',
                  parentId: 2,
                  parentName: '部门2'
                }
              ]
            },
            {
              id: 2,
              label: '部门2',
              state: true,
              code: 'BM2',
              linkman: '李四',
              phone: '1322222222',
              parentId: 9999,
              parentName: '顶级机构',
              parentType: 'org',
              children: [
                {
                  id: 5,
                  label: '子部门1',
                  state: true,
                  code: 'ZBM1',
                  linkman: '王五',
                  phone: '1313333333',
                  parentId: 2,
                  parentName: '部门2'
                }, {
                  id: 6,
                  label: '子部门2',
                  state: true,
                  code: 'ZBM2',
                  linkman: '赵六',
                  phone: '1511111111',
                  parentId: 2,
                  parentName: '部门2'
                }
              ]
            }]
        }];
      return {
        data: data,
        visible: false,
        filterText: ''
      };
    },
    props: {},
    created() {
    },
    mounted() {
    },
    computed: {},
    methods: {
      togglePopover() {
        this.visible = true;
      },
      handleCheckChange() {
      },
      handleClickOutside() {
        this.visible = false;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .org-tree {
  .tree-data {
    background-color: white;
    overflow: hidden !important;
    position: absolute;
    width: 100%;
    height: 200px;
    margin-top: 6px;
    border: 1px solid #dcdfe6;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .filter-tree-text{
      padding: 10px;
      /*padding-left: 10px;*/
      /*padding-right: 10px;*/
    }
   }
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  .org-tree {
  .tree-data {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
   }
  }
</style>
