<template>
  <div class="success">
    <i class="fas fa-check-circle fa-10x success_icon"></i><br/>
    <h3>Đặt hàng thành công !!</h3>
    <div class="bo9 p-l-40 p-r-40 p-t-30 p-b-38 m-r-0 m-l-auto p-lr-15-sm bill">
      <h5 class="m-text20 p-b-24">
        Đơn hàng
      </h5>
      <!--  -->
      <div class="flex-w flex-sb bo10 p-t-15 p-b-20 info">
        <span class="s-text18 w-size19 w-full-sm title">
          Tên người nhận: {{bill.customer}}
        </span>
        <span class="s-text18 w-size19 w-full-sm title">
          Địa chỉ nhận: {{bill.address}}
        </span>
        <span class="s-text18 w-size19 w-full-sm title">
          SĐT người nhận: {{bill.phone}}
        </span>
        <span class="s-text18 w-size19 w-full-sm title">
          Ghi chú: {{bill.note}}
        </span>
      </div>

      <div class="flex-w flex-sb-m p-t-26 p-b-10">
      </div>
      <h5 class="m-text20 p-b-20">
        Danh sách sản phẩm
      </h5>
        
      <div  v-for="(item, index) in listProd" :key="index">
        <span class="s-text18 w-size19 w-full-sm title">
          {{item.product_name+'('+billDetails[index].size+')'+' x '+billDetails[index].quantity}}
        </span>
        <span class="s-text18 w-size19 w-full-sm title">
          {{formatMoney(item.price*billDetails[index].quantity)}}
        </span>
      </div>

      <div class="flex-w flex-sb-m p-t-26 p-b-10">
      </div>

      <div class="flex-w flex-sb bo3 p-t-15 info">
        <h6 class="m-text15">
          Tổng tiền: {{formatMoney(total)}}
        </h6>
      </div>
            
    </div>
  </div>
</template>

<script>
import axios from '../axios';
export default {
  name:'Success',
  data() {
    return {
      billId: 0,
      bill: {},
      billDetails: [],
      listProd: [],
      total: 0
    }
  },
  methods: {
    loadSession(){
			this.billId = this.$session.get('billId');
    },
    async getBill () {
      await axios.get('/api/bill/get?bill_id='+this.billId)
        .then(response => {
          this.bill = response.data.bill;
          this.billDetails = response.data.detail;
        })
    },
    async getProduct() {
			this.done = false;
      this.billDetails.forEach(async detail => {
        await axios.get('/api/product/getDetail?product_id='+detail.product_id)
          .then((response) => {
            this.listProd.push(response.data[0]);
            this.total += response.data[0].price * detail.quantity;
          })
      });
    },
    formatMoney(price){
			return price.toLocaleString('en-US', { style: 'currency', currency: 'VND' });
    }
  },
  async beforeMount () {
    await this.loadSession();
    await this.getBill();
    this.getProduct()
  }
}
</script>

<style scoped>
.success_icon{
  color: limegreen;
  margin: 20px
}
.success{
  margin:100px
}
.bill{
  width: 600px;
  margin-left: 33%;
  margin-top: 5%;
}
.title{
  text-align: left;
  width: 700px;
  margin-bottom: 10px;
  margin-left: 10%;
  margin-right: 20px
}
.info{
  padding-left: 50px;
}
</style>