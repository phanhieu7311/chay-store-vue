<template>
  <div class="col-sm-12 col-md-6 col-lg-4 p-b-50">
		<!-- Block2 -->
		<router-link :to="{path:'/product-detail', query: {product_id: this.data.id}}">
		<div class="block2">
			<div class="block2-img wrap-pic-w of-hidden pos-relative">
				<img :src="'images/'+data.image" alt="IMG-PRODUCT">

				<div class="block2-overlay trans-0-4">

					<div class="block2-btn-addcart w-size1 trans-0-4">
						<!-- Button -->
						<router-link :to="{path:'/product-detail', query: {product_id: this.data.id}}">
						<button class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
							Chi tiết sản phẩm
						</button>
						</router-link>
					</div>
				</div>
			</div>

			<div class="block2-txt p-t-20">
				<a class="block2-name dis-block s-text3 p-b-5">
					{{data.product_name}}
				</a>

				<span class="block2-price m-text6 p-r-5">
					{{data.price}}
				</span>
			</div>
		</div>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'product',
	props: ['data'],
	methods: {
		formatPrice(){
			this.data.price = this.data.price.toLocaleString('en-US', { style: 'currency', currency: 'VND' });
		}
	},
	beforeMount(){
		this.formatPrice();
	}
}
</script>