<template>
  <!-- org-tree -->
  <div class="org-tree" style="position: relative" v-clickoutside="handleClickOutside">
    <el-input slot="reference" type="text" @focus="togglePopover" readonly v-model="checkedStr">
      <svg-icon slot="suffix" icon-class="file-tree"></svg-icon>
    </el-input>
    <transition name="fade">
      <div v-show="visible" style="position: absolute;overflow: hidden">
        <el-scrollbar class="tree-data" ref="scrollbar">
          <el-input type="text" class="filter-tree-text" v-model="filterText" placeholder="过滤组织" clearable></el-input>
          <el-tree
            :data="data"
            default-expand-all
            show-checkbox
            node-key="id"
            :props="defaultProps"
            :filter-node-method="filterTree"
            :default-checked-keys="checkedKeys"
            ref="tree"
          >
          </el-tree>
        </el-scrollbar>
      </div>
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
                  id: 3,
                  label: '子部门1',
                  state: true,
                  code: 'ZBM1',
                  linkman: '王五',
                  phone: '1313333333',
                  parentId: 2,
                  parentName: '部门2'
                }, {
                  id: 4,
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
              id: 5,
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
                  id: 6,
                  label: '子部门1',
                  state: true,
                  code: 'ZBM1',
                  linkman: '王五',
                  phone: '1313333333',
                  parentId: 5,
                  parentName: '部门2'
                }, {
                  id: 7,
                  label: '子部门2',
                  state: true,
                  code: 'ZBM2',
                  linkman: '赵六',
                  phone: '1511111111',
                  parentId: 5,
                  parentName: '部门2'
                }
              ]
            },
            {
              id: 8,
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
                  id: 9,
                  label: '子部门1',
                  state: true,
                  code: 'ZBM1',
                  linkman: '王五',
                  phone: '1313333333',
                  parentId: 8,
                  parentName: '部门2'
                }, {
                  id: 10,
                  label: '子部门2',
                  state: true,
                  code: 'ZBM2',
                  linkman: '赵六',
                  phone: '1511111111',
                  parentId: 8,
                  parentName: '部门2'
                }
              ]
            }]
        }];
      return {
        data: data,
        visible: false,
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        checkedKeys: [],
        checkedStr: ''
      };
    },
    props: {},
    created() {
    },
    mounted() {
    },
    computed: {},
    methods: {
      setElScrollTop() {
        const div = this.$refs['scrollbar'].$refs['wrap'];
        this.$nextTick(() => {
          div.scrollTop = 0;
        });
      },
      togglePopover() {
        this.visible = true;
      },
      handleCheckChange() {
      },
      handleClickOutside() {
        this.visible = false;
        this.checkedKeys = this.$refs.tree.getCheckedKeys();
        const inputStr = [];
        this.$refs.tree.getCheckedNodes().forEach((item) => {
          inputStr.push(item.label);
        });
        this.checkedStr = inputStr.toString();
      },
      filterTree(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree && this.$refs.tree.filter(val);
      },
      visible(val) {
        if (!val) return;
        this.filterText = '';
        this.setElScrollTop();
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter {
    height: 0px;
  }
  .fade-enter-to {
    height: 200px;
    opacity: 1;
  }
  .fade-leave {
    height: 200px;
  }
  .fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    height: 0px;
    opacity: 0;
  }
  .org-tree {
  .tree-data {
    background-color: white;
    overflow: hidden !important;
    /*position: absolute;*/
    width: 100%;
    height: 200px;
    margin-top: 6px;
    border: 1px solid #dcdfe6;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    .filter-tree-text{
      padding: 10px;
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
    .el-input__suffix {
      margin-right: 5px;
    }
   }
  }
</style>
