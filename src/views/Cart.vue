<template>
	<div class="cart">
		<!-- Title Page -->
		<section class="bg-title-page p-t-40 p-b-50 flex-col-c-m" style="background-image: url(images/heading2.png);">
			<h2 class="l-text2 t-center">
				Giỏ hàng
			</h2>
		</section>

		<!-- Cart -->
		<section class="cart bgwhite p-t-70 p-b-100">
			<div class="container">
				<!-- Cart item -->
				<div class="container-table-cart pos-relative">
					<div class="wrap-table-shopping-cart bgwhite">
						<table class="table-shopping-cart">
							<tr class="table-head">
								<th class="column-1"></th>
								<th class="column-2 p-l-110">Sản phẩm</th>
								<th class="column-3 p-l-30">Giá</th>
								<th class="column-4 p-l-100">Số lượng</th>
								<th class="column-5">Thành tiền</th>
							</tr>

							<tr class="table-row" v-for="(item,index) in cart" :key="item.key">
								<td class="column-1" @click="deleteCartItem(item,index)">
									<div class="cart-img-product b-rad-4 o-f-hidden">
										<img :src="'images/'+item.image" alt="IMG-PRODUCT">
									</div>
								</td>
								<td class="column-2">{{item.name + ' ( ' + item.size + ' )'}}</td>
								<td class="column-3">{{item.price}}</td>
								<td class="column-4 p-l-70">
									<div class="flex-w bo5 of-hidden w-size17">
										<b v-if="item.quantity > 1">
											<button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2" @click="item.quantity--">
												<i class="fs-12 fa fa-minus" aria-hidden="true"></i>
											</button>
										</b>
										<b v-else>
											<button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
												<i class="fs-12 fa fa-minus" aria-hidden="true"></i>
											</button>
										</b>

										<input class="size8 m-text18 t-center num-product" type="number" name="num-product1" v-model="item.quantity">

										<button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2" @click="item.quantity++">
										<i class="fs-12 fa fa-plus" aria-hidden="true"></i>
									</button>
									</div>
								</td>
								<td class="column-5">{{formatMoney(moneyToInt(item.price) * item.quantity)}}</td>
							</tr>
						</table>
					</div>
				</div>

				<div class="flex-w flex-sb-m p-t-25 p-b-25 bo8 p-l-35 p-r-60 p-lr-15-sm">
					<div class="flex-w flex-m w-full-sm">

						<div class="size12 trans-0-4 m-t-10 m-b-10 m-r-10">
							<!-- Button -->
							<router-link to="/shop">
							<button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
								Tiếp tục mua hàng
							</button>
							</router-link>
						</div>
					</div>

					<div class="size10 trans-0-4 m-t-10 m-b-10">
						<!-- Button -->
						<button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" @click="updateCart">
							Cập nhật giỏ hàng
						</button>
					</div>
				</div>

				<!-- Total -->
				<div class="bo9 w-size18 p-l-40 p-r-40 p-t-30 p-b-38 m-t-30 m-r-0 m-l-auto p-lr-15-sm">
					<h5 class="m-text20 p-b-24">
						Tổng tiền
					</h5>

					<!--  -->
					<div class="flex-w flex-sb-m p-t-26 p-b-30">
						<span class="m-text22 w-size19 w-full-sm">
							Tổng:
						</span>

						<span class="m-text21 w-size20 w-full-sm">
							{{formatMoney(total)}}
						</span>
					</div>

					<div class="size15 trans-0-4">
						<!-- Button -->
						<button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" @click="checkCart">
							Đặt hàng
						</button>
					</div>
				</div>
			</div>
		</section>
		
		<div class="alert alert-danger" id="uniq-failed" role="alert">
			Chưa có sản phẩm nào trong giỏ hàng
		</div>
	</div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/core.js"></script>
<script>
export default {
	name:'cart',
	data(){
		return {
			cart: [],
			total: 0
		}
	},
	methods: {
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
		updateCart(){
			let keys = Object.keys(this.$session.getAll());
			for(let i = 0; i < keys.length; i++) {
				if (keys[i] == 'session-id') {
					keys.splice(i , 1);
				}
				if (keys[i] == 'cartCount') {
					keys.splice(i , 1);
				}
				if (keys[i] == 'billId') {
					keys.splice(i , 1);
				}
			}
			let length = keys.length;
			for(let i = 0 ; i < length ; i++){
					this.$session.set(keys[i], this.cart[i]);
			}
			this.total = 0;
			keys.forEach(key => {
				let price = this.$session.get(key).price;
				this.total += this.moneyToInt(price) * this.$session.get(key).quantity;
			});
		},
		async deleteCartItem(item,index){
			let keys = Object.keys(this.$session.getAll());
			for(let i = 0; i < keys.length; i++) {
				if (keys[i] == 'session-id') {
					keys.splice(i , 1);
				}
				if (keys[i] == 'cartCount') {
					keys.splice(i , 1);
				}
				if (keys[i] == 'billId') {
					keys.splice(i , 1);
				}
			}
			this.total -= this.moneyToInt(this.cart[index].price) * this.cart[index].quantity;
			this.$session.remove(keys[index]);
			this.cart.splice(index,1);
			await this.$session.set('cartCount',this.$session.get('cartCount')-1);
			this.$bus.emit('updateCart', this.$session.get('cartCount'));
		},
		checkCart () {
			if(this.cart.length > 0) {
				this.$router.push('/checkout');
			} else {
				document.getElementById('uniq-failed').style.display = 'block';
				setTimeout(function() {
					$('#uniq-failed').fadeOut(1000)
				}, 3000)
			}
		}
	},
	beforeMount(){
		this.loadSession();
	}
}
</script>

<style scoped>
.alert{
  position: fixed;
	width: 200px;
	top: 100px;
	right: 10px;
	display: none;
}
</style>
