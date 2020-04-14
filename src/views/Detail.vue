<template>
	<div>
		<!-- Product Detail -->
		<div class="container bgwhite p-t-35 p-b-80">
			<div class="flex-w flex-sb">
				<div class="w-size13 p-t-30 respon5">
					<div class="wrap-slick3 flex-sb flex-w">
						<div class="wrap-slick3-dots"></div>

						<div>
							<div class="item-slick3" data-thumb="images/thumb-item-01.jpg">
								<div class="wrap-pic-w">
									<img :src="'images/'+detail.image" alt="IMG-PRODUCT">
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="w-size14 p-t-30 respon5">
					<h4 class="product-detail-name m-text16 p-b-13">
						{{detail.product_name}}
					</h4>

					<span class="m-text17">
						{{detail.price}}
					</span><br/><br/>
					
					<p class="p-b-45">
						<span class="s-text8 m-r-35">Thương hiệu:</span>
						<span class="s-text8">{{brand}}</span>
					</p>

					<div class="wrap-dropdown-content bo6 p-t-15 p-b-14 active-dropdown-content">
						<h5 class="js-toggle-dropdown-content m-text19 trans-0-4">
							Mô tả
						</h5>
						<div>
							<p class="s-text8">
								{{detail.description}}
							</p>
						</div>
					</div>

					<!--  -->
					<div class="p-t-33 p-b-60">
						<div class="p-b-50">
							<div>
								<b v-if="listSize.length > 0">
									<div class="s-text15 w-size15 t-center" style="float:left; line-height:50px">
										Size
									</div>
									<div class="btn-group-toggle"  data-toggle="buttons"	v-for="item in listSize"
									:key="item.key">
										<label class="btn item-pagination flex-c-m trans-0-4 cs-pointer" style="float:left; margin-left:10px" 
										@click="chooseSize(item)"
										:class="[(item == size) ? 'active-pagination' : '']">
											<input type="radio" name="size" :value="item" v-model="size"> {{item.size}}
										</label>
									</div>
								</b>
								
								<b v-else>
									<b style="color:red">Hết hàng</b>
								</b>
							</div>
						</div>

						<div class="flex-r-m flex-w p-t-10">
							<div class="w-size16 flex-m flex-w">
								<div class="flex-w bo5 of-hidden m-r-22 m-t-10 m-b-10">
									<b v-if="quantity > 1">
										<button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2" @click="quantity--">
											<i class="fs-12 fa fa-minus" aria-hidden="true"></i>
										</button>
									</b>
									<b v-else>
										<button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
											<i class="fs-12 fa fa-minus" aria-hidden="true"></i>
										</button>
									</b>

									<input class="size8 m-text18 t-center num-product" type="number" name="quantity" v-model="quantity"> 

									<button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2" @click="quantity++">
										<i class="fs-12 fa fa-plus" aria-hidden="true"></i>
									</button>
								</div>

								<div class="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
									<!-- Button -->
										<button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" @click="addToCart">
											Thêm vào giỏ
										</button>
								</div>
							</div>
						</div>
					</div>

					<div class="alert alert-success" id="success" role="alert">
						Thêm vào giỏ hàng thành công !
					</div>
					<div class="alert alert-danger" id="failed" role="alert">
						Xin vui lòng chọn size
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/core.js"></script>
<script>
import axios from '../axios';
export default {
	name: 'detail',
	data(){
		return {
			product_id :'',
			detail : [],
			listSize : [],
			brand: '',
			size: '',
			quantity: 1,
			cartCount: 0
		}
	},
	methods: {
		async loadQuery(){
			this.product_id = this.$route.query.product_id
		},
		async loadProductDetail(){
			await axios.get('/api/product/getDetail?product_id='+this.product_id)
				.then(response => {
					this.detail = response.data[0];
				})
			this.detail.price = this.detail.price.toLocaleString('en-US', { style: 'currency', currency: 'VND' });
			this.getBrand();
			this.getListSize();
		},
		getListSize(){
			axios.get('/api/storage/getSize?product_id='+this.product_id)
				.then(response => {
					response.data.forEach(data => {
						if(data.quantity > 0){
							this.listSize.push(data);
						}
					});
				})
		},
		getBrand(){
			axios.get('/api/brand/getFromId?brand_id='+this.detail.brand_id)
				.then(response => {
					this.brand = response.data;
				})
		},
		addToCart() {
			if(this.size){
				let ss_storage ={
					id: this.product_id,
					image: this.detail.image,
					name: this.detail.product_name,
					price: this.detail.price,
					size: this.size.size,
					quantity: this.quantity
				}
				if(this.$session.has(this.detail.product_name + '(' + this.size.size + ')')){
					ss_storage.quantity = this.$session.get(this.detail.product_name + '(' + this.size.size + ')').quantity + this.quantity;
					this.$session.set(this.detail.product_name + '(' + this.size.size + ')', ss_storage);
				} else{
					this.$session.set(this.detail.product_name + '(' + this.size.size + ')', ss_storage);
					this.cartCount++;
				}
				this.$session.set('cartCount', this.cartCount);
				this.$bus.emit('updateCart', this.$session.get('cartCount'));
				document.getElementById('success').style.display = 'block';
				setTimeout(function() {
					$('#success').fadeOut(1000)
				}, 3000)
			}
			else{
				document.getElementById('failed').style.display = 'block';
				setTimeout(function() {
					$('#failed').fadeOut(1000)
				}, 3000)
			}
		},
		getCartCount(){
			let count = 0;
			if(this.$session.exists()){
				Object.keys(this.$session.getAll()).forEach(function(key) {
					if(key != 'session-id' && key != 'cartCount')
						count++;
				});
			}
			this.cartCount = count;
		},
		chooseSize(item){
			this.size = item;
		}
	},
	beforeMount(){
		this.getCartCount();
		this.loadQuery();
		this.loadProductDetail();
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