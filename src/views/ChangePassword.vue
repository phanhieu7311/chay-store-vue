<template>
  <div class="bo9 p-l-40 p-r-40 p-t-30 p-b-38 m-r-0 m-l-auto p-lr-15-sm user">
      <h5 class="m-text20 p-b-24">
        Đổi mật khẩu
      </h5>

      <div class="flex-w flex-sb bo10 p-t-15 p-b-20">
        <div class="info">
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-full-sm inside">
              Mật khâu cũ:
            </span>
            <span class="m-text21 w-size20 w-full-sm inside textBox">
              <div class="bo4 m-b-12 box">
                <input class="sizefull s-text7 p-l-15 p-r-15" type="password" name="state" placeholder="Mật khẩu cũ" v-model="password">
              </div>
            </span>
          </div>
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-full-sm inside">
              Mật khẩu mới:
            </span>
            <span class="m-text21 w-size20 w-full-sm inside textBox">
              <div class="bo4 m-b-12 box">
                <input class="sizefull s-text7 p-l-15 p-r-15" type="password" name="state" placeholder="Mật khẩu mới" v-model="newPassword">
              </div>
            </span>
          </div>
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-full-sm inside">
              Nhập lại mật khẩu mới:
            </span>
            <span class="m-text21 w-size20 w-full-sm inside textBox">
              <div class="bo4 m-b-12 box">
                <input class="sizefull s-text7 p-l-15 p-r-15" type="password" name="state" placeholder="Nhập lại mật khẩu mới" v-model="reNewPassword">
              </div>
            </span>
            <small class="small-alert" id="repassword-failed">Nhập lại mật khẩu không chính xác</small>
          </div>
        </div>
      </div>

      <div class="flex-w flex-sb-m p-t-26 p-b-10">
      </div>

      <div class="size15 trans-0-4">
        <span class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4 butt cs-pointer butt" @click="submit">
          Cập nhật
        </span>
      </div>
      <div class="alert alert-success" id="success" role="alert">
        Cập nhật thành công !
      </div>
      <div class="alert alert-danger" id="password-failed" role="alert">
        Mật khẩu cũ không đúng
      </div>
      <div class="alert alert-danger" id="lenght-failed" role="alert">
        Mật khẩu phải có trên 6 ký tự
      </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/core.js"></script>
<script>
import axios from '../axios';
export default {
  name:'changePassword',
  data(){
    return{
      user: {},
      password: '',
      newPassword: '',
      reNewPassword: ''
    }
  },
  methods:{
    loadCookie () {
      this.user = this.$cookies.get('user')
    },
    async submit () {
      console.log(this.user.id)
      if (!this.validatePassword()) {
        document.getElementById('lenght-failed').style.display = 'block';
        setTimeout(function() {
					$('#lenght-failed').fadeOut(1000)
        }, 3000)
      } else if (!this.validateRepassword()) {
        document.getElementById('repassword-failed').style.display = 'block';
      } else {
        document.getElementById('repassword-failed').style.display = 'none';
        let self = this;
        await axios.post('/api/user/changePass',{
          'user_id': this.user.id,
          'oldPassword': this.password,
          'newPassword': this.newPassword
        }).then(function(response){
          if (response.data.success) {
            document.getElementById('success').style.display = 'block';
            setTimeout(function() {
              $('#success').fadeOut(1000)
            }, 3000)
          } else if (response.data.message == 'Mật khẩu không đúng') {
            document.getElementById('password-failed').style.display = 'block';
            setTimeout(function() {
              $('#password-failed').fadeOut(1000)
            }, 3000)
          }
        })
      }
    },
    validateRepassword () {
      if (this.newPassword != this.reNewPassword) {
        return false;
      }
      return true;
    },
    validatePassword () {
      if (this.newPassword.length < 6 || this.reNewPassword.length < 6) {
        return false;
      }
      return true;
    }
  },
  beforeMount (){
    this.loadCookie();
  }
}
</script>

<style scoped>
.user{
  width: 1000px;
  margin-left: 27%;
  margin-top: 5%;
}
.textBox{
  margin: 10px;
  width: 300px;
  margin-left: 10%;
}
.title{
  text-align: left;
  width: 150px;
  margin-bottom: 10px;
  margin-left: 10%;
  margin-right: 20px
}
.avatar{
  margin-left: 20%;
  margin-right: 50px;
}
.info{
  float: left;
  width: 100%;
  margin-top: 3%;
}
.butt {
  width: 200px;
  float: left;
  margin-left: 40%;
}
.inside{
  margin: 0px 108px;
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
  margin-left: 510px;
  margin-top: -10px;
  display: none;
}
</style>