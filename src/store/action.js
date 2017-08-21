import {
	getUser,
	getAddressList
} from '../service/getData'
import {
	GET_USERINFO,
	SAVE_ADDRESS
} from './mutation-types.js'

export default {
	// 获取用户信息
	async getUserInfo({
		commit,
		state
	}) {
		let res = await getUser();
		commit(GET_USERINFO, res)
	},
	// 保存地址
	async saveAddress({
		commit,
		state
	}) {

		if(state.removeAddress.length > 0) return;

		let addres = await getAddressList(state.userInfo.user_id);
		commit(SAVE_ADDRESS, addres);	
	},
}