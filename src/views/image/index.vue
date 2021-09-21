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
        <el-button type="success" size="mini" @click="openEditModel(false)">创建相册</el-button>
        <el-button type="warning" size="mini" @click="albumUploadModel = true">上传图片</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!--侧边列表组-->
          <ul class="list-group list-group-flush" style="font-size: 12px">

            <albumItem v-for="(item,index) of albums" :key="index" :item="item" :index="index" :albumIndex='albumIndex'
                       @albumChange="albumChange" @albumDel="albumDel" @openEditModel="openEditModel"/>

          </ul>
        </el-aside>
        <el-container>
          <el-main>
            <!--内容主体部分-->
            <el-row :gutter="10">
              <el-col :span="24" :lg="4" :md="6" :sm="8" v-for="(item,index) in imageList" :key="item.id">
                <el-card class="box-card mb-3 bg-white" shadow="hover" :body-style="{padding:0}"
                         style="position: relative;cursor: pointer">
                  <span class="badge badge-danger" v-show="item.isChecked"
                        style="position: absolute;right: 0;top: 0">{{ item.checkOrder }}</span>
                  <div class="border" :class="{'border-danger':item.isChecked}">
                    <img :src="item.url" class="w-100" @click="checkImage(item)"/>
                    <div class="w-100 text-white position-absolute"
                         style="background-color: rgba(0,0,0,.5);margin-top: -24px;line-height: 24px;">
                      <span class="small ml-2">{{ item.name }}</span>
                    </div>
                    <div class="text-center p-2">
                      <!--图片预览，编辑和删除-->
                      <el-button-group>
                        <el-button class="p-2" size="mini" @click="previewImage(item)" icon="el-icon-view"></el-button>
                        <el-button class="p-2" size="mini" @click="imageEdit(item)" icon="el-icon-edit"></el-button>
                        <el-button class="p-2" size="mini" @click="imageDel(index)" icon="el-icon-delete"></el-button>
                      </el-button-group>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <el-footer class="bg-primary">
        <!--底部-->
      </el-footer>
    </el-container>

    <!--修改弹出层-->
    <el-dialog :title="modelTitle" :visible.sync="albumEditModel" width="30%">
      <!--表单项-->
      <el-form ref="form" :model="albumForm" label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="albumForm.name"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number v-model="albumForm.order" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="albumEditModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改弹出层-->
    <el-dialog title="上传图片" :visible.sync="albumUploadModel">
      <el-upload
          class="upload-demo text-center"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
    <!--预览图片弹出层-->
    <el-dialog :visible.sync="previewModel">
      <div style="margin: -60px -20px -30px">
        <img class="w-100" :src="previewUrl">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import albumItem from '@/components/image/album-item'

export default {
  name: "index",
  components: {albumItem},
  data() {
    return {
      searchForm: {
        keywords: '',
        order: '',
      },
      //当前相册选中项
      albumIndex: 0,
      albums: [],
      //修改,上传弹出层是否可见
      albumUploadModel: false,
      albumEditModel: false,
      albumEditIndex: -1,
      //相册修改表单对象
      albumForm: {
        name: '',
        order: 0
      },
      previewModel: false,
      previewUrl: '',
      imageList: [],
      //被选中照片的列表
      chooseList: []
    }
  },
  computed: {
    modelTitle() {
      //判断弹出层标题title
      return this.albumEditIndex > -1 ? '修改相册' : '添加相册'
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
      for (let i = 0; i < 20; i++) {
        this.imageList.push(
            {
              id: i,
              url: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg',
              name: '超级英雄',
              isChecked: false,
              checkOrder: 0
            }
        )
      }
    },
    //检测左侧相册列表变化事件
    albumChange(index) {
      this.albumIndex = index
    },
    //打开删除相册弹出层，删除相册
    albumDel(index) {
      this.$confirm('此操作将永久删除该相册, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.albums.splice(index, 1)
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      });
    },
    //打开修改弹出层
    openEditModel(albumObj) {
      //修改相册
      if (albumObj) {
        const {item, index} = albumObj
        this.albumForm.name = item.name
        this.albumForm.order = item.order
        this.albumEditIndex = index
        return this.albumEditModel = true
      }
      //添加相册
      this.albumForm.name = ''
      this.albumForm.order = 0
      this.albumEditIndex = -1
      this.albumEditModel = true
    },
    //点击确定修改/创建相册
    confirmAlbumModel() {
      if (this.albumEditIndex > -1) {
        this.albumEdit();
        this.$message.success('修改相册成功')
        return this.albumEditModel = false
      }
      //创建相册,向相册数组前面添加新的一项
      this.albums.unshift(
          {name: this.albumForm.name, order: this.albumForm.order, num: 0}
      )
      this.$message.success('修改添加成功')
      this.albumEditModel = false
    },
    albumEdit() {
      //修改对应索引相册
      this.albums[this.albumEditIndex].name = this.albumForm.name
      this.albums[this.albumEditIndex].order = this.albumForm.order
    },
    //打开预览图片
    previewImage({url}) {
      this.previewUrl = url
      this.previewModel = true
    },
    //修改图片名称
    imageEdit(item) {
      this.$prompt('请输入新名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        if (!value) return this.$message.info('图片名称不能为空')
        item.name = value
        this.$message.success('图片名称修改成功')
      }).catch(() => {
        this.$message.info('取消输入')
      })
    },
    //根据索引值删除图片
    imageDel(index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.imageList.splice(index, 1)
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.error('已取消删除')
      })
    },
    checkImage(item) {
      if (!item.isChecked) {
        this.chooseList.push({id: item.id, url: item.url})
        item.checkOrder = this.chooseList.length
        item.isChecked = !item.isChecked
      }
    }
  }
}
</script>

<style scoped>
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
