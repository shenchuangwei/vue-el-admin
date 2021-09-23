<template>
  <div class="bg-white border-top px-3" style="margin: -20px">
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) of tabBars" :key="index" :label="item.name">
        <!--组件引入-->
        <buttonSearch ref="buttonSearch" placeholder="要搜索的商品名称" @search="searchEvent(e=true)">
          <template slot="left">
            <!--左边-->
            <el-button size="mini" type="success">发布商品</el-button>
            <el-button size="mini" type="danger">批量删除</el-button>
          </template>
          <!--表单插槽-->
          <template slot="form">
            <el-form inline ref="form" :model="form" label-width="80px">
              <el-form-item label="商品名称" class="mb-0">
                <el-input v-model="form.name" placeholder="商品名称" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="商品编码" class="mb-0">
                <el-input v-model="form.code" placeholder="商品编码" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="商品类型" class="mb-0">
                <el-select v-model="form.type" size="mini" placeholder="请选择商品类型">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品分类" class="mb-0">
                <el-input v-model="form.category" placeholder="商品分类" size="mini"></el-input>
              </el-form-item>
              <el-form-item class="mb-0">
                <el-button type="info" size="mini" @click="searchEvent(e=false)">搜索</el-button>
                <el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
              </el-form-item>
            </el-form>
          </template>
        </buttonSearch>
        <!-- 商品列表 -->
        <!--
         商品
          图片 http://static.yoshop.xany6.com/2018071718294208f086786.jpg
          名称 荣耀 V10全网通 标配版 4GB+64GB 魅丽红
          时间	 2019-07-17 18:34:14
           分类  手机
         商品类型（普通商品）
         实际销量（20）
         商品排序（100）
         商品状态（上架）
         总库存（200）
         价格(元)（1000.00）
         -->
        <el-table border class="mt-3" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="45" align="center"></el-table-column>

          <el-table-column label="商品" width="380">
            <template slot-scope="scope">
              <div class="media">
                <img class="mr-3" style="width: 60px;height: 60px;" :src="scope.row.cover">
                <div class="media-body">
                  <p class="mb-0 font-weight-bold text-info">{{ scope.row.title }}</p>
                  <p class="mb-0">分类：{{ scope.row.category }}</p>
                  <p class="mb-0">时间：{{ scope.row.create_time }}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" align="center" label="商品类型">
          </el-table-column>
          <el-table-column align="center" prop="sale_count" label="实际销量">
          </el-table-column>
          <el-table-column align="center" prop="order" label="商品排序">
          </el-table-column>
          <el-table-column prop="status" align="center" label="商品状态">
            <template slot-scope="scope">
              <el-button type="success" size="mini" plain>上架
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="stock" align="center" label="总库存">
          </el-table-column>
          <el-table-column prop="pprice" align="center" label=" 价格(元)">
          </el-table-column>
          <el-table-column prop="id" align="center" label="操作">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search'

export default {
  name: "list",
  components: {buttonSearch},
  data() {
    return {
      tabIndex: 0,
      tabBars: [
        {name: '审核中'},
        {name: '出售中'},
        {name: '已下架'},
        {name: '库存预警'},
        {name: '回收站'},
      ],
      form: {
        name: '',
        code: '',
        type: '',
        category: '',
      },
      superSearch: false,
      tableData: [{
        id: 1,
        title: '荣耀 V10全网通 标配版 4GB+64GB 魅丽红',
        cover: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
        create_time: '2019-07-17 18:34:14',
        category: "手机",
        type: "普通商品",
        sale_count: 20,
        order: 100,
        status: 1,
        stock: 200,
        pprice: 1000,
        ischeck: 1
        // 0未审核，1通过，2不通过
      }],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //页头切换
    handleClick(tab, event) {
      console.log(tab.index);
    },
    //高级搜素
    searchEvent(e) {
      if (!e) {
        return console.log('高级搜索')
      }
      console.log('简单搜索事件')
    },
    //清空表单
    clearSearch() {
      this.$refs.buttonSearch[this.tabIndex].superSearch = false
      this.form = {name: '', code: '', type: '', category: ''}
    }
  }
}
</script>

<style scoped>

</style>
