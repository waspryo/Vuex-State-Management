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
  },
  async filterTodos({ commit }, e) {

    // Get Selected Number
    const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
    const res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
        // ?_limit=${limit}と書くとそのフィルターに可変する
      );

    commit('setTodos', res.data)
  },
  async updateTodo({ commit }, updTodo) {
    // アップデートはPUTメソッド
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
      // 第二引数にパラメーターを渡す
      updTodo
    );

    commit('updateTodo', res.data);
  }
};
const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updateTodo:(state, updTodo) => {
      const index = state.todos.findIndex(todo => todo.id === updTodo.id);
      if(index !== -1) {
        state.todos.splice(index, 1, updTodo);
      }
    }
    // 同じidのコンテンツだけ消す(UI)の実装
};

export default {
  state,
  getters,
  actions,
  mutations
};
