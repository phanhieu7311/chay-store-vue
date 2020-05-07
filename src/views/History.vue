<template>
	<div class="cart">
		<!-- Title Page -->
		<section class="bg-title-page p-t-40 p-b-50 flex-col-c-m" style="background-image: url(images/heading2.png);">
			<h2 class="l-text2 t-center">
				Lịch sử đơn hàng
			</h2>
		</section>

		<!-- Cart -->
		<section class="cart bgwhite p-t-70 p-b-100">
			<h3 v-if="bills.length == 0">Không có đơn hàng</h3>
			<div class="" v-else>
				<!-- Cart item -->
				<div class="container-table-cart pos-relative">
					<div class="wrap-table-shopping-cart bgwhite" v-if="done">
						<table class="table-shopping-cart">
							<tr class="table-head">
								<th class="column-1 p-l-100">Mã đơn hàng</th>
								<th class="column-2 p-l-100">Người nhận</th>
								<th class="column-3 p-l-100">Địa chỉ nhận</th>
								<th class="column-4 p-l-100">SĐT nhận</th>
								<th class="column-5 p-l-100">Ghi chú</th>
                <th class="column-6 p-l-100">Sản phẩm</th>
                <th class="column-7 p-l-100">Trạng thái</th>
                <th class="column-8 p-l-100">Ngày tạo</th>
                <th class="column-9 p-l-100">Tùy chọn</th>
							</tr>

							<tr class="table-row" v-for="(item,index) in bills" :key="item.key">
								<td class="column-1">{{item.bill.id}}</td>
								<td class="column-2">{{item.bill.customer}}</td>
								<td class="column-3">{{item.bill.address}}</td>
								<td class="column-4">{{item.bill.phone}}</td>
								<td class="column-5">{{item.bill.note}}</td>
                <td class="column-6">
									<div v-for="prod in listProd[index]" :key="prod.key">
										{{prod}}
									</div>
                </td>
                <td class="column-7" v-if="item.bill.status==0">Đã tiếp nhận</td>
                <td class="column-7" v-if="item.bill.status==1">Đang giao hàng</td>
                <td class="column-7" style="color:#00cc00" v-if="item.bill.status==2">Hoàn thành</td>
                <td class="column-7" style="color:#ff0000" v-if="item.bill.status==3">Đã hủy</td>
                <td class="column-8">{{formatCreated(item.bill.created)}}</td>
                <td class="column-9" v-if="item.bill.status==0">
                  <button type="button" class="btn btn-danger" @click="cancel(item.bill.id, index)">Hủy đơn hàng</button>
                </td>
                <td class="column-9" v-else></td>
							</tr>
						</table>
					</div>
				</div>

			</div>
		</section>
	</div>
</template>

<script>
import axios from '../axios';
export default {
	name:'history',
	data(){
		return {
      user: {},
			bills: [],
			listProd: [],
			done: false
		}
	},
	methods: {
		loadCookie () {
      this.user = this.$cookies.get('user')
    },
    async getBills () {
      await axios.get('/api/bill/getByUser?user_id='+this.user.id)
        .then(response => {
          this.bills = response.data;
          this.bills.sort(function(a, b){return b.bill.id - a.bill.id});
        })
    },
		moneyToInt(price){
			price = price.replace(/,/g,'');
			price = price.slice(1,price.length);
			return parseInt(price);
		},
		formatMoney(price){
			return price.toLocaleString('en-US', { style: 'currency', currency: 'VND' });
    },
    formatCreated(date){
      date = date.replace(/T|Z/gi,' ').slice(0,19);
      return date;
    },
    async cancel(bill_id, index) {
      await axios.get('/api/bill/cancel?bill_id='+bill_id)
        .then(() => {
          this.bills[index].bill.status = 3;
        })
    },
    async getProduct() {
			let bills = this.bills;
			this.done = false;
			for(let i = 0; i<bills.length; i++){
				let billDetails = bills[i].billDetail;
				billDetails.forEach(async detail => {
					await axios.get('/api/product/getDetail?product_id='+detail.product_id)
						.then((response) => {
							let text = response.data[0].product_name+'('+detail.size+')'+' x '+detail.quantity;
							if(!this.listProd[i]) {
								this.listProd[i] = [];
							}
							this.listProd[i].push(text);
						})
					if (i == bills.length-1){
						this.done = true;
					}
				});
			}
    }
	},
	async beforeMount(){
    await this.loadCookie();
		await this.getBills();
		this.getProduct();
	}
}
</script>

<style scoped>
.column-1{
	padding-left: 0px;
	text-align: center;
	width: 100px;
}
.column-2{
	padding-left: 0px;
	text-align: center;
	width: 100px;
}
.column-3{
	padding-left: 0px;
	text-align: center;
	width: 100px;
}
.column-4{
	padding-left: 0px;
	text-align: center;
	width: 100px;
}
.column-5{
	padding-left: 0px;
	text-align: center;
	width: 100px;
}
.column-6{
	padding-left: 0px;
	text-align: center;
	width: 250px;
}
.column-7{
	padding-left: 0px;
	text-align: center;
	width: 100px;
}
.column-8{
	padding-left: 0px;
	text-align: center;
	width: 100px;
}
.column-9{
	padding-left: 0px;
	text-align: center;
	width: 100px;
}
</style>