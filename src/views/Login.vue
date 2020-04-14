<template>
  <div class="bo9 p-l-40 p-r-40 p-t-30 p-b-38 m-r-0 m-l-auto p-lr-15-sm login">
      <h5 class="m-text20 p-b-24">
        Đăng nhập
      </h5>

      <!--  -->
      <div class="flex-w flex-sb bo10 p-t-15 p-b-20">
        <div class="flex-w flex-sb-m p-b-12">
          <span class="s-text18 w-size19 w-full-sm title">
            Tên tài khoản:
          </span>
          <span class="m-text21 w-size20 w-full-sm textBox">
            <div class="bo4 m-b-12 box">
              <input class="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="Tên tài khoản" v-model="username">
            </div>
          </span>
        </div>
        <div class="flex-w flex-sb-m p-b-12">
          <span class="s-text18 w-size19 w-full-sm title">
            Mật khẩu:
          </span>
          <span class="m-text21 w-size20 w-full-sm textBox">
            <div class="bo4 m-b-12 box">
              <input class="sizefull s-text7 p-l-15 p-r-15" type="password" name="state" placeholder="Mật khẩu" v-model="password">
            </div>
          </span>
        </div>
        
        <router-link to="/signup">
        <a href="#"><b>Đăng ký</b></a>
        </router-link>
      </div>

      <div class="flex-w flex-sb-m p-t-26 p-b-10">
      </div>

      <div class="size15 trans-0-4">
        <!-- Button -->
        <span class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4 butt cs-pointer" @click="submitLogin">
          Đăng nhập
        </span>
      </div>
      <div class="alert alert-danger" id="failed" role="alert">
        Sai mật khẩu hoặc tài khoản chưa được đăng ký
      </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/core.js"></script>
<script>
import axios from '../axios';
export default {
  name:'login',
  data(){
    return{
      username: '',
      password: ''
    }
  },
  methods:{
    async submitLogin(){
      let self = this;
      await axios.post('/api/login',{
        'username': this.username,
        'password': this.password
      }).then(function(response){
        if(response.data.success){
          self.$cookies.set('user',response.data.user);
          self.$bus.emit('login', self.$cookies.get('user'));
          if(response.data.user.role ==1 || response.data.user.role ==2){
            window.location.href = 'http://localhost:8081/';
          }
          else{
            self.$router.push('/')
          }
        } else {
          document.getElementById('failed').style.display = 'block';
          setTimeout(function() {
            $('#failed').fadeOut(1000)
          }, 3000)
        }
      })
    }
  }
}
</script>

<style scoped>
.login{
  width: 450px;
  margin-left: 35%;
  margin-top: 5%;
}
.textBox{
  margin: 10px;
  width: 300px;
  margin-left: 10%
}
.title{
  text-align: left;
  width: 150px;
  margin-bottom: 10px;
  margin-left: 10%;
  margin-right: 20px
}
.alert{
  position: fixed;
	width: 200px;
	top: 100px;
	right: 10px;
	display: none;
}
</style>