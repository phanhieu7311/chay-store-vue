import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartCount: 0
  },
  getters: {
    cartCount(state){
      return state.cartCount;
    }
  },
  mutations: {
    getCartCount(state, session){
			let count = 0;
			// if(this.$session.exists()){
			// 	Object.keys(this.$session.getAll()).forEach(function() {
			// 		count++;
			// 	});
      // }
      Object.keys(session).forEach(function() {
        count++;
      });
			state.cartCount = count - 1;
		}
  },
  actions: {
    getCartCount({commit}, session){
      commit('getCartCount', session)
    }
  }
})