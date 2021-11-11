import { make } from "vuex-pathify";

const state = {
  Sidebar_drawer: null,
  Customizer_drawer: false,
  SidebarColor: "#1d2228", //Change Sidebar Color || 'white', | "#2b2b2b" | "rgb(44, 59, 164)" | "rgb(96, 44, 164)" | "rgb(151, 210, 219)" | "rgb(77, 86, 100)"
  SidebarBg: "",
  navbarColor: "#448AFF",
  locale: "ko",
  refreshCount: 180, // 화면을 새로고침할 시간간격 저장, 음수이면 카운트를 멈춤
  dashboardRefresh: 0, // 대시보드를 새로고침할 때 여기에 DT를 넣음
  pageRefresh: 0, // 페이지를 새로고침할 때 여기에 DT를 넣음
  randomValues: [],
  randomdata: [],
  newAlarms: [], //TODO:: 로그인시 값 리셋
  newEvents: [], //TODO:: 로그인시 값 리셋
  alertSeverity:"",
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
