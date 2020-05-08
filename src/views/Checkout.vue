<template>
  <div class="checkout">
    <form>
      <div class="bo9 p-l-40 p-r-40 p-t-30 p-b-38 m-r-0 m-l-auto p-lr-15-sm formInfor">
        <h5 class="m-text20 p-b-24">
          Thông tin khách hàng
        </h5>

        <!--  -->
        <div class="flex-w flex-sb bo10 p-t-15 p-b-20">
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-size19 w-full-sm title">
              Tên người nhận:
            </span>
            <span class="m-text21 w-size20 w-full-sm textBox">
              <div class="bo4 m-b-12 box">
                <input class="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="Tên người nhận" v-model="customer.name">
              </div>
            </span>
          </div>
          <small class="small-alert" id="name-failed">*Tên người nhận không được bỏ trống</small>
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-size19 w-full-sm title">
              SĐT người nhận:
            </span>
            <span class="m-text21 w-size20 w-full-sm textBox">
              <div class="bo4 m-b-12 box">
                <input class="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="SĐT người nhận" v-model="customer.phone">
              </div>
            </span>
          </div>
          <small class="small-alert" id="phone-failed">*Số điện thoại không hợp lệ</small>
          <div class="flex-w flex-sb-m p-b-12">
            <span class="s-text18 w-size19 w-full-sm title">
              Địa chỉ nhận:
            </span>
            <span class="m-text21 w-size20 w-full-sm textBox">
              <div class="bo4 m-b-12 box">
                <input class="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="Địa chỉ nhận" v-model="customer.address">
              </div>
            </span>
          </div>
          <small class="small-alert" id="address-failed">*Địa chỉ nhận hàng không được bỏ trống</small>
          <div class="flex-w flex-sb-m p-b-12" style="margin-bottom:20px">
            <span class="s-text18 w-size19 w-full-sm title">
              Ghi chú:
            </span>
            <span class="m-text21 w-size20 w-full-sm textBox">
              <div class="bo4 m-b-12 box">
                <textarea name="" class="s-text7 p-l-15 p-r-13" id="" cols="45" rows="3" placeholder="Ghi chú" v-model="customer.note"></textarea>
              </div>
            </span>
          </div>
        </div>

        <div class="flex-w flex-sb-m p-t-26 p-b-10">
        </div>

        <div class="size15 trans-0-4">
          <!-- Button -->
          <span class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4 butt cs-pointer" @click="submitForm">
            Đặt hàng
          </span>
        </div>
      </div>
    </form>

    <div class="bo9 w-size18 p-l-40 p-r-40 p-t-30 p-b-38 m-t-30 m-r-0 m-l-auto p-lr-15-sm formCheck">
				<h5 class="m-text20 p-b-24">
					Giỏ hàng
				</h5>

				<!--  -->
        <div class=" bo10">
          <div class="flex-w flex-sb p-t-15 p-b-20" v-for="item in cart" :key="item.key">
            <span class="s-text18 w-size20 w-full-sm">
              {{item.name}} ({{item.size}}) x {{item.quantity}}
            </span>
            <span class="s-text18 w-size19 w-full-sm">
                {{formatMoney(moneyToInt(item.price) * item.quantity)}}
            </span>
          </div>
        </div>

				<!--  -->
				<div class="flex-w flex-sb-m p-t-26 p-b-30">
					<span class="m-text22 w-size19 w-full-sm">
						Total:
					</span>

					<span class="m-text21 w-size20 w-full-sm">
						{{formatMoney(total)}}
					</span>
				</div>

				<div class="size15 trans-0-4">
					<!-- Button -->
          <router-link to="/shop">
            <button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
              Tiếp tục mua hàng
            </button>
          </router-link>
				</div>
			</div>

  </div>
</template>

<script>
import axios from '../axios';
export default {
  name:'checkout',
  data(){
    return {
      cart: [],
      total: 0,
      customer: {
        name: '',
        phone: '',
        address: '',
        note: ''
      },
      user: {}
    }
  },
  methods: {
    loadCookie () {
      this.user = this.$cookies.get('user')
    },
    loadSession(){
			Object.keys(this.$session.getAll()).forEach(key => {
				if(key != 'session-id' && key != 'cartCount' && key != 'billId'){
					this.cart.push(this.$session.get(key));
					let price = this.$session.get(key).price;
					this.total += this.moneyToInt(price) * this.$session.get(key).quantity;
				}
			});
    },
    moneyToInt(price){
			price = price.replace(/,/g,'');
			price = price.slice(1,price.length);
			return parseInt(price);
    },
    formatMoney(price){
			return price.toLocaleString('en-US', { style: 'currency', currency: 'VND' });
    },
    async submitForm(){
      let userId = this.user ? this.user.id : null;
      let err = false;
      if (!this.validatePhone(this.customer.phone)) {
        document.getElementById('phone-failed').style.display = 'block';
        err = true;
      } else {
        document.getElementById('phone-failed').style.display = 'none';
      } 
      if (this.customer.address.length == 0) {
        document.getElementById('address-failed').style.display = 'block';
        err = true;
      } else {
        document.getElementById('address-failed').style.display = 'none';
      } 
      if (this.customer.name.length == 0) {
        document.getElementById('name-failed').style.display = 'block';
        err = true;
      } else {
        document.getElementById('name-failed').style.display = 'none';
      } 

      if (!err) {
        let bill = {};
        await axios.post('/api/bill/create',{
          'user_id':userId,
          'customer': this.customer.name,
          'address': this.customer.address,
          'phone': this.customer.phone,
          'note': this.customer.note,
        }).then(function(response){
          bill = response.data;
        })
        this.cart.forEach(async item => {
          axios.post('/api/bill/createDetail',{
            'bill_id': bill.id,
            'quantity': item.quantity,
            'product_id': item.id,
            'size': item.size
          })
          axios.post('/api/storage/decrement',{
            "product_id":item.id,
            "size":item.size,
            "quantity":item.quantity
          })
        });
        this.$router.push('/success');
        this.$session.clear();
        this.$session.set('cartCount', 0);
        this.$session.set('billId', bill.id);
				this.$bus.emit('updateCart', this.$session.get('cartCount'));
      }
    },
    validatePhone (phone) {
      let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      if (vnf_regex.test(phone)) {
        return true;
      }
      return false;
    },
  },
  beforeMount(){
    this.loadSession();
    this.loadCookie();
  }
}
</script>

<style scoped>
.formInfor{
  width: 750px;
  float: left;
  margin-left: 15%;
  margin-bottom: 50px;
}
.formCheck{
  margin-right: 15%;
  margin-top: 50px;
}
.title{
  width: 150px;
  margin-bottom: 10px;
  margin-left: 55px;
  margin-right: 20px
}
.textBox{
  width: 300px;
}
.box{
  height:35px;
  width: 120%;
}
.butt{
  width:300px;
  margin-left: 27%
}
.small-alert{
  color: red;
  margin-left: 225px;
  margin-top: -25px;
  display: none;
}
</style>