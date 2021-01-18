import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		cueLight:'', 
	},
    mutations: {
		changeCueLight(state,data){
			state.cueLight = data;
		}
	},
    actions: {}
})
export default store