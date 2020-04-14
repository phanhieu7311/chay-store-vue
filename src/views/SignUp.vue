<template>
  <div class="bo9 p-l-40 p-r-40 p-t-30 p-b-38 m-r-0 m-l-auto p-lr-15-sm login">
      <h5 class="m-text20 p-b-24">
        Đăng ký
      </h5>

      <!--  -->
      <div class="flex-w flex-sb bo10 p-t-15 p-b-20">
        <div class="flex-w flex-sb-m p-b-12">
          <span class="s-text18 w-size19 w-full-sm title">
            Tên tài khoản:
          </span>
          <span class="m-text21 w-size20 w-full-sm textBox">
            <div class="bo4 m-b-12 box">
              <input class="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="Tên tài khoản" v-model="user.username">
            </div>
          </span>
          <small class="small-alert" id="username-failed">Tên tài khoản phải có trên 3 ký tự</small>
        </div>
        <div class="flex-w flex-sb-m p-b-12">
          <span class="s-text18 w-size19 w-full-sm title">
            Mật khẩu:
          </span>
          <span class="m-text21 w-size20 w-full-sm textBox">
            <div class="bo4 m-b-12 box">
              <input class="sizefull s-text7 p-l-15 p-r-15" type="password" name="state" placeholder="Mật khẩu" v-model="user.password">
            </div>
          </span>
          <small class="small-alert" id="password-failed">Mật khẩu phải có trên 6 ký tự</small>
        </div>
        <div class="flex-w flex-sb-m p-b-12">
          <span class="s-text18 w-size19 w-full-sm title">
            Nhập lại mật khẩu:
          </span>
          <span class="m-text21 w-size20 w-full-sm textBox">
            <div class="bo4 m-b-12 box">
              <input class="sizefull s-text7 p-l-15 p-r-15" type="password" name="state" placeholder="Nhập lại mật khẩu" v-model="user.repassword">
            </div>
          </span>
          <small class="small-alert" id="repassword-failed">Nhập lại mật khẩu không đúng</small>
        </div>
        <div class="flex-w flex-sb-m p-b-12">
          <span class="s-text18 w-size19 w-full-sm title">
            Tên người dùng:
          </span>
          <span class="m-text21 w-size20 w-full-sm textBox">
            <div class="bo4 m-b-12 box">
              <input class="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="Tên người dùng" v-model="user.fullname">
            </div>
          </span>
          <small class="small-alert" id="name-failed">Tên người dùng không hợp lệ</small>
        </div>
        <div class="flex-w flex-sb-m p-b-12">
          <span class="s-text18 w-size19 w-full-sm title">
            Email:
          </span>
          <span class="m-text21 w-size20 w-full-sm textBox">
            <div class="bo4 m-b-12 box">
              <input class="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="Email" v-model="user.email">
            </div>
          </span>
          <small class="small-alert" id="email-failed">Email không hợp lệ</small>
        </div>
        <div class="flex-w flex-sb-m p-b-12">
          <span class="s-text18 w-size19 w-full-sm title">
            Phone:
          </span>
          <span class="m-text21 w-size20 w-full-sm textBox">
            <div class="bo4 m-b-12 box">
              <input class="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="SĐT người dùng" v-model="user.phone">
            </div>
          </span>
          <small class="small-alert" id="phone-failed">Số điện thoại không hợp lệ</small>
        </div>
        
        <router-link to="/login">
        <a href="#"><b>Đăng nhập</b></a>
        </router-link>
      </div>

      <div class="flex-w flex-sb-m p-t-26 p-b-10">
      </div>

      <div class="size15 trans-0-4">
        <!-- Button -->
        <span class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4 butt cs-pointer" @click="submit">
          Đăng ký
        </span>
      </div>

      <div class="alert alert-success" id="success" role="alert">
        Đăng ký thành công !
      </div>
      <!-- <div class="alert alert-danger" id="email-failed" role="alert">
        Email không hợp lệ
      </div>
      <div class="alert alert-danger" id="phone-failed" role="alert">
        Số điện thoại không hợp lệ
      </div><div class="alert alert-danger" id="name-failed" role="alert">
        Tên người dùng không hợp lệ
      </div>
      <div class="alert alert-danger" id="password-failed" role="alert">
        Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự
      </div>
      <div class="alert alert-danger" id="repassword-failed" role="alert">
        Nhập lại mật khẩu không đúng
      </div> -->
      <div class="alert alert-danger" id="user-failed" role="alert">
        Người dùng đã tồn tại
      </div>
      <div class="alert alert-danger" id="uniq-failed" role="alert">
        Email hoặc số điện thoại đã được đăng ký
      </div>
      <!-- <div class="alert alert-danger" id="username-failed" role="alert">
        Tên tài khoản phải nhiều hơn hoặc bằng 3 ký tự
      </div> -->
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/core.js"></script>
<script>
import axios from '../axios';
export default {
  name:'signup',
  data() {
    return {
      user: {
        username: '',
        password: '',
        repassword: '',
        fullname: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    async submit () {
      if (this.validateData()) {
        let userData = this.user;
        userData.role = 3;
        delete userData.repassword;
        await axios.post('/api/signup',userData).then(function(response){
          if (response.data.success) {
            document.getElementById('success').style.display = 'block';
            setTimeout(function() {
              $('#success').fadeOut(1000)
            }, 3000)
          } else {
            if (response.data.message == 'user'){
              document.getElementById('user-failed').style.display = 'block';
              setTimeout(function() {
                $('#user-failed').fadeOut(1000)
              }, 3000)
            } else {
              document.getElementById('uniq-failed').style.display = 'block';
              setTimeout(function() {
                $('#uniq-failed').fadeOut(1000)
              }, 3000)
            }
          }
        })
      }
    },
    validateData () {
      let err = false
      if (!this.validateUsername(this.user.username)) {
        document.getElementById('username-failed').style.display = 'block';
        err = true;
      } else {
        document.getElementById('username-failed').style.display = 'none';
      } 
      if (!this.validatePassword(this.user.password)) {
        document.getElementById('password-failed').style.display = 'block';
        err = true;
      } else {
        document.getElementById('password-failed').style.display = 'none';
      }
      if (!this.validateRePassword(this.user.password, this.user.repassword)) {
        document.getElementById('repassword-failed').style.display = 'block';
        err = true;
      } else {
        document.getElementById('repassword-failed').style.display = 'none';
      }
      if (!this.validateFullname(this.user.fullname)) {
        document.getElementById('name-failed').style.display = 'block';
        err = true;
      } else {
        document.getElementById('name-failed').style.display = 'none';
      }
      if (!this.validateEmail(this.user.email)) {
        document.getElementById('email-failed').style.display = 'block';
        err = true;
      } else {
        document.getElementById('email-failed').style.display = 'none';
      }
      if (!this.validatePhone(this.user.phone)) {
        document.getElementById('phone-failed').style.display = 'block';
        err = true;
      } else {
        document.getElementById('phone-failed').style.display = 'none';
      }
      if (err) {
        return false;
      }
      return true;
    },
    validateEmail (email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(email).toLowerCase())) {
        return true;
      }
      return false
    },
    validatePhone (phone) {
      let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      if (vnf_regex.test(phone)) {
        return true;
      }
      return false;
    },
    validatePassword (password) {
      if (password.length < 6){
        return false;
      }
      return true;
    },
    validateRePassword (password, repassword) {
      if (password != repassword) {
        return false;
      }
      return true;
    },
    validateFullname (fullname) {
      if (fullname.length < 1) {
        return false;
      }
      return true;
    },
    validateUsername (username) {
      if (username.length < 3) {
        return false;
      }
      return true;
    },
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
.small-alert{
  color: red;
  margin-left: 35px;
  margin-top: -20px;
  display: none;
}
</style>