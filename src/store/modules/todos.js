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
  },
// {{ commit }}のあとは変更したい値を入れる
  async addTodo({ commit }, title){
      const res = await axios.post('https://jsonplaceholder.typicode.com/todos',{title,
    completed: false})

    commit('newTodo', res.data)
  },
  // {{ commit }}のあとは変更したい値を入れる
//   storeで定義したら親のコンポーネントにactionを呼び出す
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

    commit('removeTodo', id)
  }
};
const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    // 同じidのコンテンツだけ消す(UI)の実装
};

export default {
  state,
  getters,
  actions,
  mutations
};
