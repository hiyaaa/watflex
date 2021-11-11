import { make } from "vuex-pathify";

const state = {
  account: {
    domain: "8b2081d5-9662-40d9-a3db-2a3cf4dde3f7",  //TODO:: 임시값
    loginTime:"" //TODO:: 로그인시 시간 대입
  }
};

const mutations = make.mutations(state);

const actions = {};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
