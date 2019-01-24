import { loginByUsername, logout, getUserInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/libs/utils/auth';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/libs/utils';

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    menuList: getLocalStorage('menuList'),
    roles: [],
    btnRoles: [],
    setting: {
      articlePlatform: []
    }
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
    SET_MENU: (state, menuList) => {
      state.menuList = menuList;
      setLocalStorage('menuList', JSON.stringify(menuList));
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data;
          commit('SET_TOKEN', data.token);
          setToken(response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error');
          }
          const data = response.data;
          data.menuList = [
            {
              id: 1,
              path: '/userCenter',
              alwaysShow: true, // will always show the root menu
              name: 'userCenter',
              label: '用户中心',
              show: true,
              parentId: 9999,
              parentLabel: '顶级机构',
              parentType: 'org',
              type: 1,
              meta: {
                title: 'userCenter',
                icon: 'user'
              },
              children: [
                {
                  path: 'user',
                  name: 'user',
                  show: true,
                  parentId: 1,
                  parentLabel: '用户中心',
                  meta: {
                    title: 'user',
                    role: ['add', 'edit', 'import', 'export'] // 按钮权限
                  }
                },
                {
                  path: 'org',
                  name: 'org',
                  show: true,
                  parentId: 1,
                  parentLabel: '用户中心',
                  meta: {
                    title: 'org',
                    role: ['add', 'edit', 'import', 'export'] // 按钮权限
                  }
                },
                {
                  path: 'role',
                  name: 'role',
                  show: true,
                  parentId: 1,
                  parentLabel: '用户中心',
                  meta: {
                    title: 'role',
                    role: ['add', 'edit', 'import', 'export'] // 按钮权限
                  }
                }
              ]
            },
            {
              path: '/sysSettings',
              alwaysShow: true, // will always show the root menu
              meta: {
                title: 'sysSettings',
                icon: 'settings'
              },
              children: [
                {
                  path: 'resources',
                  name: 'resources',
                  meta: {
                    title: 'resources'
                  }
                },
                {
                  path: 'dictionary',
                  name: 'dictionary',
                  meta: {
                    title: 'dictionary'
                  }
                }
              ]
            },
            {
              path: '/map',
              meta: {
                title: 'map',
                icon: 'icon'
              },
              children: [
                {
                  path: 'map',
                  name: 'map',
                  meta: {
                    title: 'map',
                    icon: 'icon'
                  }
                }
              ]
            },
            {
              path: '/showDialog',
              meta: {
                title: 'showDialog',
                icon: 'icon'
              },
              children: [
                {
                  path: 'showDialog',
                  name: 'showDialog',
                  meta: {
                    title: 'showDialog',
                    icon: 'icon'
                  }
                }
              ]
            }
          ];
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles);
          } else {
            reject('getInfo: roles must be a non-null array !');
          }

          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          commit('SET_MENU', data.menuList);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

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
          removeLocalStorage('menuList');
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
        removeLocalStorage('menuList');
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
