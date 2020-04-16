import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { getToken, setToken, removeToken } from '@/utils/cookies'
import { login } from '@/api/users' // 调用api方法
import store from  '@/store';

// 声明user模块的state变量类型
export interface IUserState {
    id_token: string
}
@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public id_token = '';

    @Mutation
    private SET_TOKEN(token: string) {
        // 同步存储id_token变量
        this.id_token = token;
    }

    @Action
    public ResetToken() { // 清楚token
        removeToken()
        this.SET_TOKEN('')
        location.reload()
    }

    @Action
    public async Login(params: any) { // 登录保存token
        console.log('test',params)
        let { mobilePhone, password, router } = params
        mobilePhone = mobilePhone.trim()
        // const { data }:any = await login({ mobilePhone, password })
        const data: any = {id_token: 'my-vue-ts-token'}
        console.log(`Bearer ${data.id_token}`)
        setToken(`Bearer ${data.id_token}`)
        this.SET_TOKEN(`Bearer ${data.id_token}`)
        router.push('/')
    }
}
export const UserModule = getModule(User)
