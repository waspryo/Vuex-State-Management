import axios from "axios";

const state = {
  todos: []
};
const getters = {
  allTodos: state => state.todos
};
const actions = {
    async fetchTodos({ commit }) {
        const res = await axios.get(
          'https://jsonplaceholder.typicode.com/todos'
        );
        commit('setTodos', res.data);
        console.log(res.data)
  }
};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};
