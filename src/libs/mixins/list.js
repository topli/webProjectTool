/**
 *  描述：混合类
 */
import { mapActions, mapGetters } from 'vuex';
import { debounce } from '@/libs/utils';
import 'static/styles/list.scss'; // 列表样式
import 'static/styles/aou.scss'; // 新增弹窗样式

export default {
  data() {
    return {
      list: [],
      loading: false,
      loadingText: '加载中...',
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
      diaWidth: '50%',
      diaCurrentPage: ''
    };
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    this._getList();
  },
  mounted() {
  },
  methods: {
    ...mapActions([]),
    debounce,
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
    addOrUpdate(id) {
      this.diaVisible = true;
      this.diaCurrentPage = 'addOrUpdate';
      this.diaTitle = (typeof id === 'object') ? '新增' : '编辑';
      this.clearForm();
    },
    importFun() {
      this.diaVisible = true;
      this.diaCurrentPage = 'importTemplate';
      this.diaTitle = '导入';
    },
    exportFun() {},
    deleteSub(id) {
    },
    deleteItem(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id);
        this.deleteSub(id);
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
