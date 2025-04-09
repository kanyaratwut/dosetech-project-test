import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formData: {
      firstName: "",
      lastName: "",
      email: "test@gmail.com",
      password: "test1234",
      mobileNo: "",
      day: 1,
      month: 1,
      year: 2,
      gender: 2,
    },
  },
  getters: {
    getFormData: (state) => state.formData,
  },
  mutations: {
    updateFormData(state, payload) {
      state.formData = { ...state.formData, ...payload };
    },
  },
  actions: {
    updateFormData({ commit }, payload) {
      commit("updateFormData", payload);
    },
  },
  modules: {},
});
