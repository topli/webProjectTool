<style rel="stylesheet/scss" lang="scss">
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
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item :label="$t('resources.fromTitle.type')" prop="resource">
            <el-radio-group v-model="form.type" @change="changeType" :disabled="disabledType">
              <el-radio label="1">菜单</el-radio>
              <el-radio label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('resources.fromTitle.name')" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('resources.fromTitle.parent')" prop="parentName">
            <el-input v-model="form.parentName" disabled></el-input>
            <el-input v-model="form.parenId" v-show="false"></el-input>
          </el-form-item>
          <el-form-item :label="$t('resources.fromTitle.code')" prop="code" v-if="isShowCode">
            <!--<el-input v-model="form.code"></el-input>-->
            <el-select
              v-model="form.code"
              clearable
              filterable
              allow-create
              default-first-option>
              <el-option
                v-for="item in codeArray"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('resources.fromTitle.showHide')" prop="show">
            <el-switch v-model="form.show"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('resources.fromTitle.icon')" prop="icon" v-if="isShowIcon">
            <svg-icon v-if="form.icon" :icon-class="form.icon"
                      style="font-size: 28px;margin-top: 5px;"></svg-icon>
            <el-button type="text" @click="showDialog = true" style="margin-left: 10px">{{$t('resources.fromTitle.selectIcon')}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button v-if="form.id" type="primary" @click="submitForm('form')">{{$t('resources.fromTitle.edit')}}</el-button>
            <el-button v-else type="primary" @click="submitForm('form')">{{$t('resources.fromTitle.add')}}</el-button>
            <el-button @click="resetForm('form')">{{$t('resources.fromTitle.reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog :close-on-click-modal="false"
      :title="$t('resources.fromTitle.icon')"
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
          type: 'org',
          children: [
            {
              id: 1,
              name: '首页',
              type: '1',
              show: true,
              icon: 'dashboard',
              parentId: 9999,
              parentName: '顶级机构',
              parentType: 'org'
            },
            {
              id: 2,
              name: '用户中心',
              type: '1',
              show: true,
              icon: 'user',
              parentId: 9999,
              parentName: '顶级机构',
              parentType: 'org',
              children: [
                {
                  id: 5,
                  name: '用户管理',
                  type: '1',
                  show: true,
                  parentId: 2,
                  parentName: '用户中心',
                  children: [
                    {
                      id: 501,
                      name: '新增',
                      type: '2',
                      show: true,
                      parentId: 5,
                      code: 'add',
                      parentName: '用户管理',
                      children: []
                    }
                  ]
                }, {
                  id: 6,
                  name: '菜单管理',
                  type: '1',
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
        form: {
          type: '1',
          name: '',
          parentName: '',
          parenId: '',
          parentType: '',
          show: true,
          code: '',
          icon: ''
        },
        rules: {
          name: [
            { required: true, message: this.$t('resources.errorTip.name'), trigger: 'blur' },
            { min: 3, max: 5, message: this.$t('resources.errorTip.nameLength'), trigger: 'blur' }
          ],
          code: [
            { required: true, message: this.$t('resources.errorTip.code'), trigger: 'blur change' }
          ]
        },
        codeArray: [
          { value: 'add', label: 'add' },
          { value: 'update', label: 'update' },
          { value: 'import', label: 'import' },
          { value: 'export', label: 'export' },
          { value: 'delete', label: 'delete' }
        ]
      };
    },
    computed: {
      isShowIcon() {
        if (this.form.parentType === 'org' && this.form.type === '1') {
          return true;
        }
        return false;
      },
      isShowCode() {
        if (this.form.type === '2') {
          return true;
        }
        return false;
      },
      disabledType() {
        if (this.form.id) {
          return true;
        }
        return false;
      }
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
        this.form.icon = text;
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
      append(item) {
        // todo 右侧显示新增页面
        this.form.parentName = item.data.name;
        this.form.parentId = item.data.id;
        this.form.parentType = item.data.type;
      },
      edit(item) {
        // todo 右侧显示修改页面
        this.form = deepClone(item.data);
      },
      remove(item) {
        if (item.data && item.data.children && item.data.children.length > 0) {
          this.$message.error({ message: '该节点存在子级不能删除' });
          return;
        }
        const parent = item.node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === item.data.id);
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
      renderIconBtn(h, data, props, fun, show = true) {
        if (!show) return null;
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
        return h('span', { class: { 'custom_content': true }},
          [
            h('span', { class: { 'title': true }}, data.name),
            h('span', [
              this.renderIconBtn(h, { node, data, store }, { icon: 'add', content: '新增' }, this.append, data.type === '1' || data.type === 'org'),
              this.renderIconBtn(h, { node, data, store }, { icon: 'edit', content: '编辑' }, this.edit, data.type !== 'org'),
              this.renderIconBtn(h, { node, data, store }, { icon: 'delete', content: '删除' }, this.remove, data.type !== 'org')
            ])
          ]);
      },
      handleClose() {
        this.showDialog = false;
      },
      getCurrentNode(node) {
        // if (node.type === 'org') {
        //   this.$message.error({ message: '顶级机构不能被修改' });
        //   return;
        // }
        this.form = node;
      },
      showMenu(e, d, n, c) {
        // 右键事件
      },
      changeType(val) {
        if (this.form.type === '2') {
          this.rules.code = { required: true, message: this.$t('resources.errorTip.code'), trigger: 'blur' };
        } else {
          this.rules.code = { required: false };
        }
      }
    }
  };
</script>
