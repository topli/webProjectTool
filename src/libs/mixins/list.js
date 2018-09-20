/**
 *  描述：混合类
 */
import { mapActions, mapGetters } from 'vuex';
import { debounce } from '@/libs/utils';
import 'static/styles/list.scss'; // 列表样式

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
      totalElement: 0
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
    }
  },
  watch: {}
};
