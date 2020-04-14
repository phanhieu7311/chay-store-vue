<template>
  <div class="bo9 p-l-40 p-r-40 p-t-30 p-b-38 m-r-0 m-l-auto p-lr-15-sm user">
      <h5 class="m-text20 p-b-24">
        Chỉnh sửa thông tin
      </h5>

      <div class="flex-w flex-sb bo10 p-t-15 p-b-20">
        <div class="info">
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-full-sm inside">
              Tên tài khoản:
            </span>
            <span class="s-text18 w-full-sm inside">
              {{user.username}}
            </span>
          </div>
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-full-sm inside">
              Tên người dùng:
            </span>
            <span class="m-text21 w-size20 w-full-sm inside textBox">
              <div class="bo4 m-b-12 box">
                <input class="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="Tên người dùng" v-model="user.fullname">
              </div>
            </span>
          </div>
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-full-sm inside">
              Email:
            </span>
            <span class="m-text21 w-size20 w-full-sm inside textBox">
              <div class="bo4 m-b-12 box">
                <input class="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="Email" v-model="user.email">
              </div>
            </span>
          </div>
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-full-sm inside">
              Số điện thoại:
            </span>
            <span class="m-text21 w-size20 w-full-sm inside textBox">
              <div class="bo4 m-b-12 box">
                <input class="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="SĐT người nhận" v-model="user.phone">
              </div>
            </span>
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
      <div class="alert alert-danger" id="email-failed" role="alert">
        Email không hợp lệ
      </div>
      <div class="alert alert-danger" id="phone-failed" role="alert">
        Số điện thoại không hợp lệ
      </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/core.js"></script>
<script>
import axios from '../axios';
export default {
  name:'editUser',
  data(){
    return{
      user: {}
    }
  },
  methods:{
    loadCookie () {
      this.user = this.$cookies.get('user')
    },
    async submit () {
      if (!this.validateEmail(this.user.email)) {
        document.getElementById('email-failed').style.display = 'block';
        setTimeout(function() {
					$('#email-failed').fadeOut(1000)
        }, 3000)
      } else if (!this.validatePhone(this.user.phone)) {
        document.getElementById('phone-failed').style.display = 'block';
        setTimeout(function() {
					$('#phone-failed').fadeOut(1000)
        }, 3000)
      } else {
        let self = this;
        await axios.post('/api/user/update',{
          'user_id': this.user.id,
          'fullname': this.user.fullname,
          'email': this.user.email,
          'phone': this.user.phone
        }).then(function(response){
          document.getElementById('success').style.display = 'block';
          setTimeout(function() {
            $('#success').fadeOut(1000)
          }, 3000)
          self.$cookies.set('user', response.data[0]);
        })
      }
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
  margin: 0px 120px;
}
.alert{
  position: fixed;
	width: 200px;
	top: 100px;
	right: 10px;
	display: none;
}
</style>