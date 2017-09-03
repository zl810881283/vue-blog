<template>
  <nav class="nav">
    <h1>码蜂社博客</h1>
    <ul class="links">
        <li><router-link to="/">主页</router-link></li>
        <li><router-link to="/about">关于</router-link></li>
        <template v-if="!isSignin">
          <li><a id="signin" href="#" @click.prevent="clickSignin">登录</a></li>
          <li><a id="signup" href="#" @click.prevent="clickSignup">注册</a></li>
        </template>
        <template v-if="isSignin">
          <li>欢迎你！{{user.username}}</li>
          <li><router-link to="/sign-out">注销</router-link></li>
          <li><router-link to="/admin">管理</router-link></li>
        </template>

    </ul>

    <md-dialog md-open-from="#signin" md-close-to="#signin" ref="signinDialog">
      <md-dialog-title>用户登录</md-dialog-title>

      <md-dialog-content>
        <form>
          <md-input-container>
            <label>用户名</label>
            <md-input v-model="user.username"></md-input>
          </md-input-container>
          <md-input-container>
            <label>密码</label>
            <md-input v-model="user.password"></md-input>
          </md-input-container>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('signinDialog')">取消</md-button>
        <md-button class="md-primary" @click="signinSubmit">提交</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog md-open-from="#signup" md-close-to="#signup" ref="signupDialog">
      <md-dialog-title>用户注册</md-dialog-title>

      <md-dialog-content>
          <md-input-container>
            <label>用户名</label>
            <md-input v-model="user.username"></md-input>
          </md-input-container>
          <md-input-container>
            <label>密码</label>
            <md-input v-model="user.password"></md-input>
          </md-input-container> 
          <md-input-container>
            <label>重复密码</label>
            <md-input v-model="user.passwordRepeat"></md-input>
          </md-input-container>          
          <md-input-container>
            <label>E-mail</label>
            <md-input v-model="user.email"></md-input>
          </md-input-container> 
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('signupDialog')">取消</md-button>
        <md-button class="md-primary" @click="signupSubmit">提交</md-button>
      </md-dialog-actions>
    </md-dialog>

  </nav>
</template>

<script>
import axios from 'axios'
export default {
  name: 'main-nav',
  data () {
    return {
      user: {
        username: '',
        password: '',
        passwordRepeat: '',
        email: ''
      },
      isSignin: false
    }
  },
  async created () {
    let {data: res} = await axios.get('http://localhost:3000/api/session')
    console.log(res.data)
    if (!res.data) {
      this.isSignin = false
    } else {
      this.isSignin = true
      this.user = res.data
    }
  },
  watch: {
    '$route': function (newVal) {
      if (newVal.name === 'SignOut') {
        this.isSignin = false
        this.user = {}
      }
    }
  },
  methods: {
    clickSignup () {
      this.$refs['signupDialog'].open()
    },
    clickSignin () {
      this.$refs['signinDialog'].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    async signinSubmit () {
      let {data: res} = await axios.post('http://localhost:3000/api/session', this.user)
      if (res.err) {
        alert('登录出错')
      } else {
        alert('登录成功')
        this.isSignin = true
        this.$refs['signinDialog'].close()
      }
    },
    signupSubmit () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.nav 
  display flex
  justify-content space-between
  align-items center
  border-bottom 1px solid #eee
  margin-bottom 20px
.links
  display flex
  li 
    margin: 0 10px

</style>
