/**
 *  描述：混合类
 */
import { mapActions, mapGetters } from 'vuex'
import { debounce } from '@/libs/utils'
import 'static/styles/list.scss' // 列表样式

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
      openSearch: true
    }
  },
  computed: {
    ...mapGetters(['roles']),
    toggleFromIcon() {
      return this.openSearch ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
    }
  },
  created() {
    this._getList()
  },
  mounted() {},
  methods: {
    ...mapActions([]),
    debounce,
    openSearchFun() {
      this.openSearch = !this.openSearch
    },
    onSearch() {
      this._getList()
    },
    handleSizeChange(val) {
      console.log('handleSizeChange')
      this.searchData.pageSize = val
    },
    handleCurrentChange(val) {
      console.log('handleCurrentChange')
      this.searchData.pageNo = val
      this._getList()
    }
  },
  watch: {}
}
