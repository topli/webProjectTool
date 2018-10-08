<style rel="stylesheet/scss" lang="scss" scoped>
  @import './style.scss';
</style>
<template>
  <div class="menu-tree">
    <div class=" custom-tree-container">
      <div class="block">
        <p>{{$t('resources.title')}}</p>
        <el-tree
          :data="treeData"
          :show-checkbox="false"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
          @node-contextmenu="showMenu">
        </el-tree>
      </div>
      <div class="block">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="资源类型" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="1">菜单</el-radio>
              <el-radio label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="父节点" prop="parentName">
            <el-input v-model="ruleForm.parentName" disabled></el-input>
            <el-input v-model="ruleForm.parenId" v-show="false"></el-input>
          </el-form-item>
          <el-form-item label="显示/隐藏" prop="show">
            <el-switch v-model="ruleForm.show"></el-switch>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <svg-icon v-if="ruleForm.icon" :icon-class="ruleForm.icon"
                      style="font-size: 28px;margin-top: 5px;"></svg-icon>
            <el-button type="text" @click="showDialog = true" style="margin-left: 10px">选择图标</el-button>
          </el-form-item>
          <el-form-item>
            <el-button v-if="ruleForm.id" type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button v-else type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="图标"
      :visible.sync="showDialog"
      width="60%"
      :before-close="handleClose">
      <div class="icons-container">
        <div class="icons-wrapper">
          <div v-for="item of iconsMap" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{generateIconCode(item)}}
              </div>
              <div class="icon-item">
                <svg-icon class-name="disabled" :icon-class="item"/>
                <span>{{item}}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import icons from '@/icons/generateIconsView';
  import { deepClone } from '@/libs/utils';

  export default {
    data() {
      const data = [
        {
          id: 9999,
          name: '顶级机构',
          resource: 'org',
          children: [
            {
              id: 1,
              name: '首页',
              resource: '1',
              show: true,
              parentId: 9999,
              parentName: '顶级机构'
            },
            {
              id: 2,
              name: '用户中心',
              resource: '1',
              show: true,
              parentId: 9999,
              parentName: '顶级机构',
              children: [
                {
                  id: 5,
                  name: '用户管理',
                  resource: '1',
                  show: true,
                  parentId: 2,
                  parentName: '用户中心',
                  children: [
                    {
                      id: 501,
                      name: '新增',
                      resource: '2',
                      show: true,
                      parentId: 5,
                      parentName: '用户管理',
                      children: []
                    }
                  ]
                }, {
                  id: 6,
                  name: '菜单管理',
                  resource: '1',
                  show: false,
                  parentId: 2,
                  parentName: '用户中心'
                }
              ]
            }]
        }];
      return {
        showDialog: false,
        iconsMap: [],
        treeData: JSON.parse(JSON.stringify(data)),
        ruleForm: {
          resource: '1',
          name: '',
          parentName: '',
          parenId: '',
          show: true,
          icon: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        }
      };
    },
    mounted() {
      const iconsMap = icons.state.iconsMap.map((i) => {
        return i.default.id.split('-')[1];
      });
      this.iconsMap = iconsMap;
    },
    methods: {
      generateIconCode(symbol) {
        return symbol;
      },
      handleClipboard(text, event) {
        this.ruleForm.icon = text;
        this.handleClose();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      append(data) {
        // todo 右侧显示新增页面
        this.ruleForm = {
          resource: '1',
          parentName: data.name,
          parentId: data.id,
          show: true
        };
      },
      edit(data) {
        // todo 右侧显示修改页面
        this.ruleForm = deepClone(data);
      },
      remove(node, data) {
        if (data.children && data.children.length > 0) {
          this.$message.error({ message: '该节点存在子级不能删除' });
          return;
        }
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        this.$confirm('确定要删除该节点吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // todo 调用后台删除菜单api
          children.splice(index, 1);
          this.treeData = Object.assign([], this.treeData);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      renderIconBtn(h, data, props, fun) {
        return h('icon-btn', {
          props: props,
          on: {
            click: () => {
              fun && fun(data);
            }
          }
        });
      },
      renderContent(h, { node, data, store }) {
        return h('span', { style: { width: '100%' }},
          [
            h('span', data.name),
            h('span', { style: { position: 'relative', float: 'right', right: '16px', marginTop: '-6px' }}, [
              data.resource === '1' || data.resource === 'org' ? this.renderIconBtn(h, data, { icon: 'add', content: '新增' }, this.append) : null,
              data.resource !== 'org' ? this.renderIconBtn(h, data, { icon: 'edit', content: '编辑' }, this.edit) : null,
              data.resource !== 'org' ? this.renderIconBtn(h, data, { icon: 'delete', content: '删除' }, this.remove) : null
            ])
          ]);
      },
      handleClose() {
        this.showDialog = false;
      },
      getCurrentNode(node) {
        if (node.resource === 'org') {
          this.$message.error({ message: '顶级机构不能被修改' });
          return;
        }
        this.ruleForm = node;
      },
      showMenu(e, d, n, c) {
        // 右键事件
      }
    }
  };
</script>
