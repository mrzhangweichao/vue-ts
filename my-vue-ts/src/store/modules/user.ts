import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { getToken, setToken, removeToken } from '@/utils/cookies'
import { login } from '@/api/users' // 调用api方法
import store from  '@/store';

// 声明user模块的state变量类型
export interface IUserState {
    id_token: string
    roles: string[]
}
@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public id_token = getToken() || ''
    public roles: string[] = []

    @Mutation
    private SET_TOKEN(token: string) {
        // 同步存储id_token变量
        this.id_token = token;
    }

    @Mutation
    private SET_ROLES(roles: string[]) {
        this.roles = roles
    }

    @Action
    public ResetToken() { // 清楚token
        removeToken()
        this.SET_TOKEN('')
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
        router.push('/')
    }

    @Action
    public async GetUserInfo() {
        if (this.id_token === '') {
            throw Error('GetUserInfo: token is undefined!')
        }
        // const { data } = await getUserInfo()
        const data = {
            authorities: [
                'admin',
                // {
                //     path: '/pages1',
                //     name: 'pages1',
                //     children:  [
                //         {
                //             path: 'pages11',
                //             name: 'pages11'
                //         }
                //     ]
                // },
                // {
                //     path: '/pages2',
                //     name: 'pages2',
                //     children: [
                //         {
                //             path: 'pages2',
                //             name: 'pages22'
                //         }
                //     ]
                // },
                // {
                //     path: '/pages1',
                //     name: 'pages1',
                //     meta: ['1','2']
                // },
                // {
                //     path: 'pages11',
                //     name: 'pages11',
                //     meta: ['1']
                // },
                // {
                //     path: 'pages11',
                //     name: 'pages12',
                //     meta: ['2']
                // },
                // {
                //     path: '/pages2',
                //     name: 'pages2',
                //     meta: ['1','2']
                // },
                // {
                //     path: 'pages2',
                //     name: 'pages21',
                //     meta: ['2']
                // },
                // {
                //     path: 'pages2',
                //     name: 'pages22',
                //     meta: ['1']
                // }
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
