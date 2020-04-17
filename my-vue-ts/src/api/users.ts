import request from '@/utils/request'

export const login = (data: any) => {
    request({
        url: '/api/logon/doLogon',
        method: 'post',
        data
    })
}

export const getUserInfo = () => {
    request({
        url: '/api/account',
        method: 'get'
    })
}