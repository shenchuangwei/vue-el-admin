<template>
  <div>
    <div class="contain">
      <div class="row">
        <div class="col-12 col-sm-8 col-md-6 col-lg-4 m-auto pt-5" m-auto>
          <div class="card mt-5">
            <div class="card-header bg-white">
              <h3 class="mb-0 text-center text-muted">{{ this.$conf.logo }}</h3>
            </div>
            <div class="card-body">
              <el-form ref="formLogin" :model="form" :rules="rules">
                <el-form-item prop="username">
                  <el-input type="text" v-model="form.username" size="middle" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="form.password" size="middle" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button class="w-100 bg-info" size="middle" type="primary" @click="submitForm" :loading="loading">
                    立即登录
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "index",
  data() {
    return {
      //登录loin
      loading: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    ...mapMutations(
        {login: 'login'}
    ),
    submitForm() {
      this.$refs.formLogin.validate((valid) => {
        if (!valid) return this.$message('请输入用户信息')
        this.loading = true
        this.axios.post('/admin/login', this.form).then(
            res => {
              //将user和token存放的vux中
              this.login(res.data.data)
              this.loading = false
              this.$message.success('登录成功')
              this.$router.push({name: 'index'})
            }
        ).catch(
            err => {
              this.loading = false
              if (err.response && err.response.data && err.response.data.errorCode) {
                this.$message.error(err.response.data.msg)
              }
            }
        )
      });
    },
  },
}
</script>

<style scoped>

</style>