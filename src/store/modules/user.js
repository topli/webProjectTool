import { loginByUsername, logout } from '@/api/login';
import { getUserInfo } from '@/views/login/service';
import { getToken, setToken, removeToken } from '@/libs/utils/auth';
import { setStorage, getStorage } from '@/libs/utils';

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    btnRoles: [],
    setting: {
      articlePlatform: []
    },
    menuList: JSON.parse(getStorage('menuList')) || []
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_BTN_ROLES: (state, btnRoles) => {
      state.btnRoles = btnRoles;
    },
    SET_MENU_LIST: (state, menuList) => {
      state.menuList = menuList;
    }
  },

  actions: {
    // 登录之后的操作
    loginIn ({ commit }, token) {
      commit('SET_TOKEN', token);
      setToken(token); // set Cookies
    },
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(info => {
          if (info.code !== 200) {
            reject('error');
          }
          const menuList = ['userManage1', 'dictionary', 'orgManage', 'resources'];
          // 菜单、按钮权限数据存入localStore
          commit('SET_MENU_LIST', menuList);
          setStorage('menuList', menuList);
          resolve({ roles: menuList });
        });
      });
    },
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          // 登录 获取用户信息
          const data = response.data;
          commit('SET_TOKEN', data.token); // set store
          setToken(response.data.token); // set Cookies
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token).then(response => {
    //       if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
    //         reject('error');
    //       }
    //       const data = response.data;
    //
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles);
    //       } else {
    //         reject('getInfo: roles must be a non-null array !');
    //       }
    //
    //       commit('SET_NAME', data.name);
    //       commit('SET_AVATAR', data.avatar);
    //       commit('SET_INTRODUCTION', data.introduction);
    //       resolve(response);
    //     }).catch(error => {
    //       reject(error);
    //     });
    //   });
    // },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role);
        setToken(role);
        getUserInfo(role).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.roles);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          resolve();
        });
      });
    },

    // 动态修改按钮权限
    ChangeBtnRoles({ commit }, btnRole) {
      commit('SET_BTN_ROLES', btnRole);
    }
  }
};

export default user;
