<template>
  <div>
    <!--  顶部导航条  -->
    <el-container class="contain">
      <el-header class="top-bar">
        <h3 class="font-weight-bold">{{ this.$conf.logo }}</h3>
        <el-menu
            :default-active="topBar.activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="topBarSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item v-for="(item,index) of topBar.list" :index="index | numberToString">{{ item.name }}
          </el-menu-item>
          <el-submenu index="100">
            <template slot="title">
              <el-avatar
                  :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' || user.avatar"></el-avatar>
              {{ user.username }}
            </template>
            <el-menu-item index="6-1">修改</el-menu-item>
            <el-menu-item index="6-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <!--   侧边栏   -->
      <el-container style="height: 100%">
        <el-aside width="240px">
          <el-menu
              :default-active="slideMenuActive"
              background-color="#545c64"
              @select="sideSelect"
              text-color="#fff"
              active-text-color="#ffd04b"
              style="border: 1px solid #545c64">
            <el-menu-item :index="index | numberToString" :key="index" v-for="(item,index) of slideMenu">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <!--内容主体区-->
        <el-main class="bg-light" style="position: relative">
          <!--面包屑导航-->
          <div class="border-bottom bg-white mb-3" style="padding: 20px;margin: -20px" v-if="bran.length">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="(item,index) of bran" @click.native="branPathTo(item)" :key="index">
                {{ item.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import common from "@/common/mixin/common";
import {mapState} from 'vuex'

export default {
  name: "layout",
  data() {
    return {
      topBar: [],
      bran: []
    }
  },
  //初始化topBar，使其等于原型上的topBar
  created() {
    this.topBar = this.$conf.topBar
    this.getRouteBran()
    this.__initNavBar()
  },
  computed: {
    //获取存储在vuex中的user
    ...mapState(
        {user: state => state.user.user}
    ),
    //当前左侧菜单激活项索引
    slideMenuActive: {
      get() {
        return this.topBar.list[this.topBar.activeIndex].subActive || ''
      },
      set(val) {
        this.topBar.list[this.topBar.activeIndex].subActive = val
      }
    },
    //当前侧边栏列表
    slideMenu() {
      return this.topBar.list[this.topBar.activeIndex].subMenu || []
    }
  },
  watch: {
    //监视路由的变化,当路径发生变化时执行面包屑修改
    $route: {
      handler() {
        //将侧边栏索引跟top导航栏索引存到缓存中
        window.sessionStorage.setItem('navActive', JSON.stringify({
          top: this.topBar.activeIndex,
          left: this.slideMenuActive
        }))
        this.getRouteBran()
      }
    }
  },
  mixins: [common],
  methods: {
    //读取缓存中的索引初始化顶部和侧边导航栏
    __initNavBar() {
      const navIndex = JSON.parse(window.sessionStorage.getItem('navActive'))
      if (!navIndex) return
      this.topBar.activeIndex = navIndex.top
      this.slideMenuActive = navIndex.left
      // console.log(navIndex)
    },
    getRouteBran() {
      //过滤名字为空的
      let bran = this.$route.matched.filter(value => value.name)
      //过滤掉name值为layout和index
      const arr = [];
      bran.forEach((element) => {
        if (element.name === 'layout' || element.name === 'index') return
        arr.push({
          name: element.name,
          path: element.path,
          title: element.meta.title
        })
      });
      if (arr.length > 0) {
        arr.unshift({name: 'index', path: '/index', title: '后台首页'})
      }
      this.bran = arr;
      // console.log(this.bran)
    },
    topBarSelect(key, keyPath) {
      if (key == '6-1') return console.log('修改')
      if (key == '6-2') {
        return this.axios.post('/admin/logout', {}, {
          token: true,
        }).then(res => {
          this.$message('退出成功')
          // 清除状态和存储
          this.$store.commit('logExit')
          // 返回到登录页
          this.$router.push({name: "login"})
        }).catch(err => {
          console.log(err.response);
          // 清除状态和存储
          this.$store.commit('logExit')
          // 返回到登录页
          this.$router.push({name: "login"})
        })
      }
      //当前激活的菜单索引
      this.topBar.activeIndex = key;
      // this.slideMenuActive = '0'
      // 默认选中跳转到当前激活
      if (this.slideMenu.length > 0) {
        this.$router.push({
          name: this.slideMenu[this.slideMenuActive].pathname
        })
      }
    },
    sideSelect(key, keyPath) {
      this.slideMenuActive = key;
      this.$router.push({name: this.slideMenu[key].pathname})
    },
    //面包屑导航跳转
    branPathTo(item) {
      if (item.path === '/index') this.slideMenuActive = '0'
      this.$router.push({path: item.path})
    }
  }
}
</script>

<style scoped lang="less">
.el-header {
  background-color: #545c64;
  color: #333;
}

.el-aside {
  background-color: #545c64;
  color: #333;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}

.contain {
  height: 100vh;
  overflow: hidden;

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    h3 {
      font-size: 20px;
      margin: 0;
      cursor: pointer;
    }
  }
}

</style>
