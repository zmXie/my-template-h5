  <template>
  <van-pull-refresh class="pm-page-list" v-model="isRefresh" @refresh="onRefresh" success-text="数据刷新成功">
    <div v-if="state.nodata === true">
      <pm-empty @refresh="refresh">
        <slot name="empty-btn"></slot>
      </pm-empty>
    </div>
    <van-list v-else v-model="isListLoading" :finished="isFinished" :error.sync="error" error-text="请求失败，点击重新加载" finished-text="没有更多了"
              :offset="state.offset" :immediate-check="false" @load="onLoad">
      <slot></slot>
    </van-list>
  </van-pull-refresh>
</template>
<script>
export default {
  props: {
    // 页面请求模型
    pageModel: {
      type: Object,
      default: () => {
        return {
          pageNumber: 1,
          pageSize: 15,
          total: 0
        };
      }
    },
    // 列表数据
    dataList: {
      type: [],
      default: Array
    },
    // 请求Api
    getListApi: {
      type: Function,
      default: Function
    }
  },
  data() {
    return {
      state: {
        offset: 6, // 滚动条与底部距离小于 offset 时触发load事件
        nodata: false
      },
      isRefresh: false,
      isFinished: false,
      isListLoading: false,
      error: false
    };
  },
  computed: {},
  mounted() {
    this.queryList();
  },
  methods: {
    // 刷新
    refresh() {
      this.dataList.length = 0;
      this.onRefresh();
    },
    // 请求数据
    queryList() {
      this.isListLoading = true;
      this.getListApi(this.pageModel).then(({ result, totalCount }) => {
        let tempList = result;
        if (this.pageModel.pageNumber === 1) {
          this.dataList.length = 0;
        }
        this.dataList.addArray(tempList);
        if (this.dataList.length < totalCount) {
          this.pageModel.pageNumber++;
        } else {
          this.isFinished = true;
        }
        this.pageModel.total = totalCount;
        this.state.nodata = totalCount === 0;
        this.error = false;
      }).catch(() => {
        this.error = true;
      }).finally(() => {
        this.isListLoading = false;
        this.isRefresh = false;
      });
    },
    // 下拉刷新
    onRefresh() {
      this.isRefresh = false;
      this.pageModel.pageNumber = 1;
      this.queryList();
    },
    // 上拉加载
    onLoad() {
      this.queryList();
    }
  }
}
</script>
<style lang="scss" scoped>
.pm-page-list {
  flex: 1;
  overflow: auto;
  overscroll-behavior: contain;
}
</style>