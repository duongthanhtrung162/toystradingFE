import axios from 'axios';
import config from '../../config.dev.json';
import { getAuthToken, setAuthToken, setLocalStorage } from '../../utils/helper';
import { saveAs } from 'file-saver';
import { clearAllLocalStorage, setCookieDefaultTheme } from '../../utils/helper';
import history from '../../utils/history';

// if (getAuthToken() && getAuthToken() != '') {
//   const token = getAuthToken();
//   debugger
//     axios.defaults.headers['access_token'] =  getAuthToken();
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
//   }
axios.interceptors.request.use(
  config => {
    console.log('config',config);
    if (getAuthToken() && getAuthToken() != '') {
      config.headers.authorization = 'Bearer ' + getAuthToken();

      return config;
    }else{
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  }
  
);
// Add a response interceptor
axios.interceptors.response.use(function(response) {
  return response;
}, async function(error) {
  
  if (error.response.data.code === 70 || error.response.data.code === 4178) {
    await clearAllLocalStorage();
    
    history.push('/login'); //relative tgetProductListo domain
  }
  return Promise.reject(error);
});


const apiRequests = {
  //api url
  //s3Host: `${config.inventory.s3Host}`,
  user: `${config.toystrading.host}${config.toystrading.api.user}`,
  categoryAuth: `${config.toystrading.host}${config.toystrading.api.categoryAuth}`,
  tagAuth: `${config.toystrading.host}${config.toystrading.api.tagAuth}`,
  userAuth: `${config.toystrading.host}${config.toystrading.api.userAuth}`,

  category: `${config.toystrading.host}${config.toystrading.api.category}`,
  tag: `${config.toystrading.host}${config.toystrading.api.tag}`,
  toy: `${config.toystrading.host}${config.toystrading.api.toy}`,
  toyRelated: `${config.toystrading.host}${config.toystrading.api.toyRelated}`,
  addToy: `${config.toystrading.host}${config.toystrading.api.addToy}`,
  restartPassword: `${config.toystrading.host}${config.toystrading.api.restartPassword}`,


  
  login: async (data) =>
    new Promise((resolve, reject) => {
      const loginUrl = `${config.toystrading.host}${config.toystrading.api.login}`;
      axios
        .post(loginUrl, data)
        .then(response => {
          if (response.code) {
            reject(response.message);
          } else {
              
             let { data } = response;
             const token = data.data.token;
             setAuthToken(token);
             //axios.defaults.headers['access_token'] =  token;
             resolve(response);
          }
        })
        .catch(err => {
            
          reject(err);
        });
    }),
//   confirmOTP: async (code, macAddress, data) =>
//     new Promise((resolve, reject) => {
//       const confirmOTPUrl = `${config.inventory.host}${config.inventory.api.confirmOTP}?code=${code}&deviceAddress=${macAddress}`;
//       axios
//         .post(confirmOTPUrl, data)
//         .then(response => {
//           console.log('res1', response);
//           let { data } = response;
//           if (data.errors) {
//             reject(data.errors[0].message);
//           } else {
//             const token = data.data.data.jwt.accessToken;
//             setAuthToken(token);
//             setCookieDefaultTheme(data.data.data.user.theme);
//             setCookieDefaultLocale(data.data.data.user.language);
//             axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
//             resolve(response);
//           }
//         })
//         .catch(err => {
//           reject(err);
//         });
//     }),
  postRequest: async (apiUrl, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(apiUrl, data)
        .then(response => {
            if (response.code) {
                reject(response.message);
              } else {
                 resolve(response);
              }
        })
        .catch(err => {
          reject(err);
        });
       
    }),
  getRequest: async (apiUrl, data) =>
    new Promise((resolve, reject) => {

      axios
        .get(apiUrl, {params: data})
        .then(response => {
            if (response.code) {
                reject(response.message);
              } else {
                 resolve(response);
              }
        })
        .catch(err => {
          reject(err);
        });
    }),
  deleteRequest: async (apiUrl, data) =>
    new Promise((resolve, reject) => {
      axios
        .delete(apiUrl, data)
        .then(response => {
            if (response.code) {
                reject(response.message);
              } else {
                 resolve(response);
              }
        })
        .catch(err => {
          reject(err);
        });
    }),
  putRequest: async (apiUrl, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(apiUrl, data)
        .then(response => {
            if (response.code) {
                reject(response.message);
              } else {
                 resolve(response);
              }
        })
        .catch(err => {
          reject(err);
        });
    }),
//   postRequestAndDownloadFile: async (apiUrl, data) =>
//     new Promise((resolve, reject) => {
//       axios
//         .post(apiUrl, data, {
//           responseType: 'arraybuffer',
//         })
//         .then(response => {
//           const blob = new Blob([response.data]);
//           saveAs(blob, `product-list-${new Date().getTime()}.xlsx`);
//         })
//         .catch(err => {
//           reject(err);
//         });
//     }),
};

export default apiRequests;
