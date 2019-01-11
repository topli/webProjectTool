/**
 *  混合列表模板
 */
import 'static/styles/aou.scss'; // 新增弹窗样式
import importTemplate from '@/components/Import/index';

export default {
  components: { importTemplate },
  data() {
    return {
      dialogType: '',
      dialogVisible: false,
      dialogTitle: '',
      dialogWidth: '50%',
      dialogCurrentPage: '',
      dialogBox: null,
      dialogData: {},
      argRow: {},
      importType: ''
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    showDialog(type, row) {
      this.dialogType = type;
      this.argRow = row;
    },
    clearForm() {
      this.dialogData = {};
    },
    addOrUpdate() {
      this.dialogVisible = true;
      this.dialogCurrentPage = 'addOrUpdate';
      this.dialogTitle = this.argRow ? this.$t('table.edit') : this.$t('table.add');
      this.$nextTick(() => {
        this.dialogBox = this.$refs['dialogBox'] || null;
        if (!this.dialogBox) console.error(this.$t('consoleError.dialogNullError'));
        this.dialogBox && this.clearForm();
        if (this.argRow) {
          this.getFormById && this.getFormById(this.argRow);
        }
      });
    },
    importFun() {
      if (!this.importType) {
        console.error(this.$t('consoleError.importTypeNullError'));
      }
      this.dialogVisible = true;
      this.dialogCurrentPage = 'importTemplate';
      this.$store.dispatch('setImportType', this.importType);
      this.dialogTitle = '导入';
    },
    exportFun() {},
    deleteSub(id) {},
    deleteItem() {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteSub(this.argRow.id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  watch: {
    dialogType: function (newVal) {
      this.dialogWidth = '770px';
      if (newVal === 'add' || newVal === 'edit') {
        this.addOrUpdate(); // 新增编辑
      } else if (newVal === 'import') {
        this.dialogWidth = '430px';
        this.importFun(); // 导入
      } else if (newVal === 'delete') {
        this.deleteItem(); // 删除
      } else {
        this.dialogVisible = true;
        this.dialogCurrentPage = newVal; // 自定义  component
      }
    }
  }
};
