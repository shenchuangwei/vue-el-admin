<template>
  <div>
    <div class="contain">
      <div class="row">
        <div class="col-12 col-sm-8 col-md-6 col-lg-4 m-auto pt-5" m-auto>
          <div class="card mt-5">
            <div class="card-header bg-white">
              <h3 class="mb-0 text-center text-muted">{{this.$conf.logo}}</h3>
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
                  <el-button class="w-100 bg-info" size="middle" type="primary" @click="submitForm('formLogin')">立即登录</el-button>
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
export default {
  name: "index",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          alert('请输入正确账号和密码');
          return
        }else this.$router.push({name:'index'})
      });
    },
  }
}
</script>

<style scoped>

</style>