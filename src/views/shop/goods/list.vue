<template>
  <div class="bg-white border-top px-3" style="margin: -20px">
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) of tabBars" :key="index" :label="item.name">
        <!--组件引入-->
        <buttonSearch ref="buttonSearch" placeholder="要搜索的商品名称" @search="searchEvent(e=true)">
          <template slot="left">
            <!--左边-->
            <router-link :to="{name:'shop_goods_create'}">
              <el-button size="mini" type="success">发布商品</el-button>
            </router-link>
            <el-button class="ml-2" size="mini" type="danger">批量删除</el-button>
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
        <el-table border class="mt-3" :data="tableData[index].list" style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="45" align="center"></el-table-column>

          <el-table-column label="商品" width="380">
            <template slot-scope="scope">
              <div class="media">
                <img class="mr-3 mt-3" style="width: 60px;height: 60px;" :src="scope.row.cover">
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
              <el-button type="success" size="mini" plain @click="scope.row.ischeck = 1">审核通过</el-button>
              <el-button class="ml-0 mt-2" type="danger" size="mini" plain @click="scope.row.ischeck = 2">审核通过
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="stock" align="center" label="总库存">
          </el-table-column>
          <el-table-column prop="pprice" align="center" label=" 价格(元)">
          </el-table-column>
          <el-table-column align="center" label="操作" width="150">
            <template slot-scope="scope">
              <el-button-group>
                <el-button plain size="mini" type="primary">编辑</el-button>
                <el-button plain size="mini" type="danger" @click="deleteItem(scope.$index)">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <!--占位，底部与分页分割-->
        <div style="height: 128px"></div>
        <!--表格分页-->
        <el-footer class="d-flex align-items-center px-0 border-top bg-white"
                   style="margin-left:240px;position: fixed;bottom: 0;left: 0;right:0;z-index: 9999">
          <!--底部-->
          <div class="px-3">
            <el-pagination
                :current-page="tableData[index].currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
          </div>
        </el-footer>
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
      tableData: [],
      multipleSelection: []
    }
  },
  created() {
    //初始化商品表格列表
    this.__initData();
  },
  methods: {
    //初始化表格数据
    __initData() {
      for (let i = 0; i < this.tabBars.length; i++) {
        this.tableData.push({currentPage: 1, list: []})
        for (let j = 0; j < 8; j++) {
          this.tableData[i].list.push(
              {
                id: 1,
                title: '三星 s21全网通 标配版 8GB+256GB 琉璃绿' + i + '+' + j,
                cover: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
                create_time: '2021-07-17 18:34:14',
                category: "手机",
                type: "普通商品",
                sale_count: 20,
                order: 100,
                status: 1,
                stock: 200,
                pprice: 1000,
                ischeck: 1
                // 0未审核，1通过，2不通过
              }
          )
        }
      }
    },
    //删除表格中指定商品
    deleteItem(index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //根据索引删除指定列表下的数据
        this.tableData[this.tabIndex].list.splice(index, 1)
        this.$message.success('删除成功');
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
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
