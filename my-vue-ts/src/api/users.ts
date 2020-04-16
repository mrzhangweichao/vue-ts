import request from '@/utils/request'

export const login = (data: any) => {
    console.log('666',data)
    request({
        url: '/api/authenticate/mobile_number',
        method: 'post',
        data
    })
}