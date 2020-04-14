<template>
  <div class="bo9 p-l-40 p-r-40 p-t-30 p-b-38 m-r-0 m-l-auto p-lr-15-sm user">
      <h5 class="m-text20 p-b-24">
        Tài khoản
      </h5>

      <!--  -->
      <div class="flex-w flex-sb bo10 p-t-15 p-b-20">
        <img src="images/user.jpg" alt="IMG-PRODUCT" width="200px" class="avatar">
        <div class="info">
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-full-sm">
              Tên tài khoản: {{user.username}}
            </span>
          </div>
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-full-sm">
              Tên người dùng: {{user.fullname}}
            </span>
          </div>
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-full-sm">
              Email: {{user.email}}
            </span>
          </div>
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-full-sm">
              Số điện thoại: {{user.phone}}
            </span>
          </div>
        </div>
      </div>

      <div class="flex-w flex-sb-m p-t-26 p-b-10">
      </div>

      <div class="size15 trans-0-4">
        <!-- Button -->
        <router-link to="/user/edit">
          <span class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4 butt cs-pointer butt">
            Chỉnh sửa thông tin cá nhân
          </span>
        </router-link>
        <router-link to="/user/changePassword">
          <span class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4 butt cs-pointer butt">
            Đổi mật khẩu
          </span>
        </router-link>
        <span class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4 butt cs-pointer butt">
          Lịch sử đơn hàng
        </span>
      </div>
  </div>
</template>

<script>
// import axios from '../axios';
export default {
  name:'user',
  data(){
    return{
      user: {}
    }
  },
  methods:{
    loadCookie () {
      this.user = this.$cookies.get('user')
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
  margin-left: 10%
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
  width: 45%;
  margin-top: 3%;
}
.butt {
  width: 200px;
  float: left;
  margin: 0px 50px;
}
</style>