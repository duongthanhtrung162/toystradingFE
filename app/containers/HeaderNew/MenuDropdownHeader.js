import routesLinks from '../../containers/App/routesLinks'

export const menuUserLogin = [
    {
        title : 'Thông tin tài khoản' ,
        path : `${routesLinks.userProfile}/profile`
    },
    {
        title : 'Đăng xuất' ,
        path : ''
    }
]

export const menuUserLogout = [
    {
        title : 'Đăng nhập' ,
        path : routesLinks.login
    },
    {
        title : 'Đăng ký tài khoản' ,
        path : routesLinks.register
    }
]
// export const dropdownNavCategory = [
//     {
//         title : 'Đồ chơi vận động' ,
//         path : routesLinks.login
//     },
//     {
//         title : 'Đăng ký tài khoản' ,
//         path : routesLinks.register
//     }
// ]
export const dropdownNavCity = [
    {
        title : 'Hồ Chí Minh' ,
        value : 'HCM' ,
    },
    {
        title : 'Hà Nội' ,
        value : 'HN' 
    },
    {
        title : 'Cần Thơ' ,
        value : 'CT' 
    },
    {
        title : 'Hải Phòng' ,
        value : 'HP' 
    },
    {
        title : 'Đà Nẵng' ,
        value : 'DN' 
    },
]
    
export const dropdownNavSex = [
    {
        title : 'Bé trai' ,
        value : 'trai' 
    },
    {
        title : 'Bé gái' ,
        value : 'gai' 
    }
]
export const dropdownNavAge = [
    {
        title : '0-12 tháng' ,
        value : '0' 
    },
    {
        title : '1-3 tuổi' ,
        value : '13' 
    },
    {
        title : '4-6 tuổi' ,
        value : '46' 
    },
    {
        title : '6-11 tuổi' ,
        value : '611'
    },
    {
        title : '12 tuổi trở lên' ,
        value : '12'
    }
]