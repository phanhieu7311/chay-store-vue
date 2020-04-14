<template>
	<div class="shop">
		<!-- Title Page -->
		<section class="bg-title-page p-t-40 p-b-50 flex-col-c-m" style="background-image: url(images/heading.png);">
		</section>
		<!-- Content page -->
		<section class="bgwhite p-t-55 p-b-65">
		<div class="container">
			<div class="row">
				<div class="col-sm-6 col-md-4 col-lg-3 p-b-50">
					<div class="leftbar p-r-20 p-r-0-sm">
						<!--  -->
						<h4 class="m-text14 p-b-7">
							Thương hiệu
						</h4>

						<ul class="p-b-54">
							<li class="p-t-4">
								<router-link to='/shop'>
									<a href="#" class="s-text13 active1" @click="loadBrand()">
										Tất cả
									</a>
								</router-link>
							</li>

							<li class="p-t-4" 
							v-for="brand in listBrand"
							:key = brand.key>
								<router-link to='/shop'>
								<a href="#" class="s-text13" @click="loadBrand(brand.id)">
									{{brand.brand_name}}
								</a>
								</router-link>
							</li>
						</ul>

					</div>
				</div>

				<div class="col-sm-6 col-md-8 col-lg-9 p-b-50">
					<!--  -->
					<div class="flex-sb-m flex-w p-b-35">
						<div class="flex-w">
							<div class="rs2-select2 bo4 of-hidden w-size12 m-t-5 m-b-5 m-r-10">
								<select class="selection-2" name="sorting" v-model="price">
									<option value="">Tất cả</option>
									<option>Dưới 1 triệu</option>
									<option>Từ 1 triệu đến 2 triệu</option>
									<option>Trên 2 triệu</option>
								</select>
							</div>

							<div class="rs2-select2 bo4 of-hidden w-size12 m-t-5 m-b-5 m-r-10">
								<select class="selection-2" name="sorting">
									<option>--- Sắp xếp ---</option>
									<option>Mới nhất</option>
									<option>Cũ nhất</option>
									<option>Giá thấp đến cao</option>
									<option>Giá cao đến thấp</option>

								</select>
							</div>
						</div>

						<span class="s-text8 p-t-5 p-b-5" v-if="listProd.length!=0">
							Showing 1–{{listProd.length}} of {{allProd}} results
						</span>
						<div class="notFound" v-else>
							<h4>Không có sản phẩm</h4>
						</div>
					</div>

					<!-- Product -->
					<div class="row">
						<Product v-for="item in listProd"
							:key = "item.key"
							:data="item">
						</Product>
					</div>

					<!-- Pagination -->
					<div class="pagination flex-m flex-w p-t-26">
						<span href="#" class="item-pagination flex-c-m trans-0-4 cs-pointer" v-for="item in allPage" :key="item"
						@click="choosePage(item)" :class="[(item == page) ? 'active-pagination' : '']">
							{{item}}
						</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	</div>
</template>

<script>
import Product from '../components/Product';
import axios from '../axios';
export default {
	name:'shop',
	data(){
		return {
			brand_id: null,
			listProd: [],
			allProd: 0,
			listBrand: [],
			page: 1,
			allPage: 0,
			price: '',
		}
	},
	components: {
		Product
	},
	methods:{
		loadBrand(id = null){
			this.brand_id = id;
		},
		async getProduct(){
			if(!this.brand_id){
				await axios.get('/api/product/getAll?page='+this.page)
					.then(response => {
						this.listProd = response.data.products;
						this.allProd = response.data.allProd;
					})
			} else if (this.brand_id != -1) {
				this.page = 1;
				await axios.get('/api/product/getFromBrand?brand_id='+this.brand_id+'&page='+this.page)
					.then(response => {
						this.listProd = response.data.products;
						this.allProd = response.data.allProd;
					})
			}
			this.getAllPage(this.allProd);
		},
		getBrand(){
			axios.get('/api/brand/getAll')
				.then(response => {
					this.listBrand = response.data.listBrand;
				})
		},
		getAllPage(allProd){
			let page = Math.floor(allProd / 9);
			if(allProd % 9 > 0){
				page ++;
			}
			this.allPage = page;
		},
		choosePage(page){
			this.page = page;
			this.getProduct();
		},
		
	},
	watch:{
		brand_id(){
			this.getProduct();
		}
	},
	beforeMount(){
		this.getProduct();
		this.getBrand();
	},
	created(){
		this.$bus.on('search',value => {
			axios.post('/api/product/search',{
				'prod_name': value,
			}).then(respone => {
				this.brand_id = -1;
				this.listProd = respone.data.products;
				this.allProd = respone.data.allProd;
				this.getAllPage(this.allProd);
			})
		})
	}
}
</script>

<style scoped>
.selection-2{
	border: none;
	height: 42px;
	width: 198px;
}
.notFound{
	position: fixed;
	top: 450px;
}
</style>
