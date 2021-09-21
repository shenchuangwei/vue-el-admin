<template>
  <div>
    <el-container style="position:absolute;left: 0;top: 55px;bottom: 0;right: 0">
      <el-header class="d-flex align-items-center border-bottom">
        <!--头部-->
        <div class="d-flex mr-auto align-items-center">
          <el-select v-model="searchForm.order" class="mr-2" placeholder="请选择图片排序方式" size="mini" style="width: 150px;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-input class="mr-2" size="mini" placeholder="输入相册名称" v-model="searchForm.keywords"
                    style="width: 150px;"></el-input>
          <el-button type="success" size="mini">搜索</el-button>
        </div>
        <el-button type="success" size="mini">创建相册</el-button>
        <el-button type="warning" size="mini">上传图片</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!--侧边列表组-->
          <ul class="list-group list-group-flush" style="font-size: 12px">
            <li v-for="(item,index) of albums" class="list-group-item list-group-item-action d-flex align-items-center"
                :key="index" @click.stop="albumChange(index)" style="line-height: 24px;cursor: pointer"
                :class="{'active sum-active':albumIndex === index}">{{ item.name }}
              <el-dropdown class="btn ml-auto">
                <span class="btn btn-light btn-sm border" size="mini" style="font-size: 12px">
                  {{ item.num }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>黄金糕</el-dropdown-item>
                  <el-dropdown-item>狮子头</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </el-aside>
        <el-container>
          <el-main>
            <!--内容主体部分-->
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
        <!--底部-->
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      searchForm: {
        keywords: '',
        order: '',
      },
      //当前相册选中项
      albumIndex: 0,
      albums: []
    }
  },
  created() {
    this.__init()
  },
  methods: {
    //初始化侧边栏相册列表
    __init() {
      for (let i = 0; i < 20; i++) {
        this.albums.push(
            {name: '相册' + i, num: Math.floor(Math.random() * 100), order: 0}
        )
      }
    },
    //检测左侧相册列表变化事件
    albumChange(index) {
      this.albumIndex = index
    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

/*>>>>>>>>>>>*/
.el-aside {
  position: absolute;
  top: 60px;
  bottom: 60px
}

.el-main {
  position: absolute;
  top: 60px;
  bottom: 60px;
  right: 0;
  left: 200px
}

.sum-active {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
</style>
