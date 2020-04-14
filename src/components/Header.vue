<template>
  <div>
		<header class="header1">
			<!-- Header desktop -->
			<div class="container-menu-header">

				<div class="wrap_header">
					<!-- Logo -->
					<router-link to="/" class="logo">
						<img src="images/icons/logo.png" alt="IMG-LOGO">
					</router-link>

					<!-- Menu -->
					<div class="wrap_menu">
						<nav class="menu">
							<ul class="main_menu">
								<li><router-link to="/">Trang chủ</router-link></li>
								<li><router-link to="/shop">Cửa hàng</router-link></li>
								<li><router-link to="/about">Giới thiệu</router-link></li>
								<li><router-link to="/contact">Liên hệ</router-link></li>
							</ul>
						</nav>
					</div>

					<div class="search-product pos-relative bo4 of-hidden">
						<input class="s-text7 size6 p-l-23 p-r-50" type="text" name="search-product" placeholder="Tìm kiếm sản phẩm..." v-model="search">

						<button class="flex-c-m size5 ab-r-m color2 color0-hov trans-0-4" @click="submitSearch">
							<i class="fs-12 fa fa-search" aria-hidden="true"></i>
						</button>
					</div>

					<!-- Header Icon -->
					<div class="header-icons">
						<div v-if="Object.keys(user).length >0">
							<router-link to='/user' class="user">
								{{user.username}}
							</router-link> |
							<span class="user cs-pointer" @click="logout">
								Đăng xuất <i class="fas fa-sign-out-alt"></i>
							</span>
						</div>
						<router-link to="/login" v-else>
							<img src="images/icons/icon-header-01.png" class="header-icon1" alt="ICON">
						</router-link>

						<span class="linedivide1"></span>

						<router-link to="/cart">
							<img src="images/icons/icon-header-02.png" class="header-icon1 js-show-header-dropdown" alt="ICON">
							<span class="header-icons-noti">{{cartCount}}</span>
						</router-link>
					</div>

				</div>
			</div>
		</header>
	</div>
</template>

<script>
export default {
	name:'header_bar',
	data(){
		return {
			cartCount: 0,
			search: '',
			user: {}
		}
	},
	created(){
		this.$bus.on('updateCart', value=>{
			this.cartCount = value
		}),
		this.$bus.on('login', value=>{
			this.user = value
		})
	},
	beforeMount(){
		this.cartCount = (this.$session.get('cartCount')) ? this.$session.get('cartCount') : 0;
		this.loadCookie();
	},
	methods:{
		submitSearch(){
			if(this.search){
				this.$bus.emit('search',this.search);
			}
		},
		loadCookie () {
			if(this.$cookies.get('user')){
				this.user = this.$cookies.get('user')
			}
		},
		logout () {
			this.$cookies.remove('user');
			this.user = {};
			this.$router.push('/')
		}
	}
}
</script>

<style scoped>
.header1{
	height: 20px;
}
.logo>img{
	max-height: 100px;
}
.search-product{
	margin-right: -170px; 
	margin-left: 75px;
	height: 35px;
}
.search-product>input{
	height: 35px;
}
.user:hover {
	text-decoration: underline;
	color: black;
}
</style>