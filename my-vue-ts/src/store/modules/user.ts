import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { getToken, setToken, removeToken, getUserName, setUserName, removeUserName } from '@/utils/cookies'
import { login } from '@/api/users' // 调用api方法
import store from  '@/store';

// 声明user模块的state变量类型
export interface IUserState {
    id_token: string
    roles: string[]
    userName: string
}
@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public id_token = getToken() || ''
    public roles: string[] = []
    public userName: string = getUserName() || ''

    @Mutation
    private SET_TOKEN(token: string) {
        // 同步存储id_token变量
        this.id_token = token;
    }

    @Mutation
    private SET_ROLES(roles: string[]) {
        this.roles = roles
    }

    @Mutation
    private SET_USERNAME(userName: string) {
        this.userName = userName
    }

    @Action
    public ResetToken() { // 清除token
        removeToken()
        this.SET_TOKEN('')
        location.reload()
    }

    @Action
    public ResetUserName() {
        removeUserName()
        this.SET_USERNAME('')
        location.reload()
    }

    @Action
    public async Login(params: any) { // 登录保存token
        let { mobilePhone, password, router } = params
        mobilePhone = mobilePhone.trim()
        // const { data }:any = await login({ mobilePhone, password })
        const data: any = {id_token: 'my-vue-ts-token',username: mobilePhone}
        setToken(`Bearer ${data.id_token}`)
        this.SET_TOKEN(`Bearer ${data.id_token}`)
        setUserName(`${data.username}`)
        this.SET_USERNAME(`${data.username}`)
        router.push('/')
    }

    @Action
    public async GetUserInfo() {
        if (this.id_token === '') {
            throw Error('GetUserInfo: token is undefined!')
        }
        // const { data } = await getUserInfo()
        console.log('sss',this.userName)
        const data = this.userName === 'super_admin' ?
        {
            authorities: [
                'super_admin',
            ]
        } :
        {
            authorities: [
                'admin',
            ]
        }

        if (!data) {
            throw Error('Verification failed, please Login again.')
        }
        const { authorities } = data
        if (!authorities || authorities.length <= 0) {
            throw Error('GetUserInfo: roles must be a non-null array!')
        }
        this.SET_ROLES(authorities)
    }
}
export const UserModule = getModule(User)
