<template>
  <div class="bg-white border-top px-3" style="margin: -20px;margin-bottom: 40px">
    <!--tab标签页-->
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane label="基础设置">
        <!--基础设置-->
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.title" placeholder="请输入商品名称，不能超过60个字符" class="w-50"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader v-model="form.category" :options="options"></el-cascader>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input type="textarea" v-model="form.desc" placeholder="选填，商品卖点简述，例如：此款商品美观大方 性价比较高 不容错过"
                      class="w-50"></el-input>
          </el-form-item>
          <el-form-item label="商品单位">
            <el-input v-model="form.unit" placeholder="请输入商品单位" class="w-50"></el-input>
          </el-form-item>
          <el-form-item label="总库存">
            <el-input type="number" v-model="form.stock" placeholder="" class="w-25">
              <template slot="append">件</template>
            </el-input>
          </el-form-item>
          <el-form-item label="库存预警">
            <el-input type="number" v-model="form.min_stock" placeholder="" class="w-25">
              <template slot="append">件</template>
            </el-input>
          </el-form-item>
          <el-form-item label="库存显示">
            <el-radio-group v-model="form.display_stock">
              <el-radio :label="1" border>是</el-radio>
              <el-radio :label="0" border>否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否上架">
            <el-radio-group v-model="form.status">
              <el-radio :label="0" border>放入仓库</el-radio>
              <el-radio :label="1" border>立即上架</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="运费模板">
            <el-select v-model="form.express" placeholder="请选择运费模板">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

      </el-tab-pane>
      <el-tab-pane label="商品规格">
        <!--商品规格
        0-->
        <el-form ref="form" label-width="80px">
          <el-form-item class="mb-2" label="商品规格">
            <el-radio-group v-model="skus_type" size="mini">
              <el-radio-button :label="0">
                单规格
              </el-radio-button>
              <el-radio-button :label="1">
                多规格
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="mb-2" label="添加规格">
            <div class="card" style="line-height: 1.2;">
              <div class="card-header d-flex align-items-center">
                规格项：
                <el-input size="mini" style="width: 200px;">
                  <el-button slot="append" icon="el-icon-more"></el-button>
                </el-input>
                <el-radio-group size="mini" style="margin-bottom: -10px;" class="ml-2">
                  <el-radio label="无"></el-radio>
                  <el-radio label="颜色"></el-radio>
                  <el-radio label="图片"></el-radio>
                </el-radio-group>
                <el-button size="mini" class="ml-auto" icon="el-icon-top"></el-button>
                <el-button size="mini" icon="el-icon-bottom"></el-button>
                <el-button size="mini" type="text">删除
                </el-button>
              </div>
              <div class="card-body">
                <div>
                  <el-button type="text" size="mini" icon="el-icon-plus">增加规格值</el-button>
                </div>
              </div>
            </div>
            <el-button class="mt-3" type="success" size="mini">添加规格
            </el-button>
          </el-form-item>
          <el-form-item class="mb-2" label="批量设置">
            <el-button type="text">销售价</el-button>
            <el-button type="text">市场价</el-button>
            <el-button type="text">成本价</el-button>
            <el-button type="text">库存</el-button>
            <el-button type="text">体积</el-button>
            <el-button type="text">重量</el-button>
          </el-form-item>
          <el-form-item class="mb-2" label="规格设置">规格设置</el-form-item>
        </el-form>

      </el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
      <el-tab-pane label="商品详情">商品详情</el-tab-pane>
      <el-tab-pane label="折扣设置">折扣设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import goods_create from "../../../store/modules/goods_create";

export default {
  name: "create",
  data() {
    return {
      tabIndex: 0,
      skus_type: 0,
      form: {
        title: "",
        category: [],
        desc: "",
        unit: "",
        stock: 0,
        min_stock: 0,
        display_stock: 0,
        status: 0,
        express: ""
      },
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    }
  },
  computed: {
    // ...mapState('goods_create',['test'])  数组形式
    ...mapState({
      test: state => state.goods_create.test
    })
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab.index);
    },
  }
}
</script>

<style scoped>
.goods_create .el-form-item {
  margin-bottom: 15px;
}
</style>
