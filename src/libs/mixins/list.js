/**
 *  混合列表模板
 */
import { mapActions, mapGetters } from 'vuex';
import loading from './loading';
import { debounce, parseTime } from '@/libs/utils';
import { iconBtn, iconTooltip, tSelect } from '@/libs/utils/table';
import 'static/styles/list.scss'; // 列表样式
import 'static/styles/aou.scss'; // 新增弹窗样式
import importTemplate from '@/components/import/index';

export default {
  mixins: [loading],
  components: { importTemplate },
  data() {
    return {
      list: [],
      searchData: {
        pageNo: 1,
        pageSize: 20
      },
      searchFrom: {},
      pageSizeOpts: [10, 20, 50, 100],
      multipleSelection: [],
      totalElement: 0,
      diaVisible: false,
      diaTitle: '',
      // diaWidth: '40%',
      diaCurrentPage: '',
      dialogBox: null,
      dialogData: {},
      importType: ''
    };
  },
  computed: {
    ...mapGetters(['roles']),
    diaWidth() {
      if (this.diaCurrentPage === 'importTemplate') {
        return '500px';
      }
      return '770px';
    }
  },
  created() {
    this._getList();
  },
  mounted() {
  },
  methods: {
    ...mapActions([]),
    debounce, // 函数防抖
    parseTime, // 日期格式转换
    iconBtn, // 创建操作按钮方法
    iconTooltip, // render提示组件
    tSelect, // render Select 组件
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    onSearch() {
      this._getList();
    },
    handleSizeChange(val) {
      this.searchData.pageSize = val;
    },
    handleCurrentChange(val) {
      this.searchData.pageNo = val;
      this._getList();
    },
    clearForm() {},
    _clearForm () {
      this.dialogData = {}; // 显示页面时重置页面数据
    },
    addOrUpdate(row) {
      this.diaVisible = true;
      this.diaCurrentPage = 'addOrUpdate';
      this.diaTitle = (row.toString() === '[object Object]') ? this.$t('table.edit') : this.$t('table.add');
      this.$nextTick(() => {
        this.dialogBox = this.$refs['dialogBox'] || null;
        if (!this.dialogBox) console.error(this.$t('consoleError.dialogNullError'));
        this.dialogBox && this._clearForm();
        this.dialogBox && this.clearForm();
        if (row.id) {
          this.getFormById && this.getFormById(row.id);
        }
      });
    },
    importFun() {
      if (!this.importType) {
        console.error(this.$t('consoleError.importTypeNullError'));
      }
      this.diaVisible = true;
      this.diaCurrentPage = 'importTemplate';
      this.$store.dispatch('setImportType', this.importType);
      this.diaTitle = '导入';
    },
    exportFun() {},
    deleteSub(id) {},
    deleteItem(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.id);
        this.deleteSub(row.id);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  watch: {}
};
