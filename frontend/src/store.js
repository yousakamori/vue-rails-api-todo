import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const http = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '/',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
})

export default new Vuex.Store({
  state: {
    filter: 'all',
    todos: []
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    completedAll(state, getters) {
      return getters.remaining === 0
    },
    todosFiltered(state) {
      if (state.filter === 'all') {
        return state.todos
      } else if (state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      })
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => {
        todo.completed = checked
      })
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(todo => todo.id === id)
      state.todos.splice(index, 1)
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id)

      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      })
    },
    retrieveTodos(state, todos) {
      state.todos = todos
    }
  },
  actions: {
    retrieveTodos({ commit }) {
      http
        .get('/api/v1/todos')
        .then(response => {
          commit('retrieveTodos', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addTodo({ commit }, todo) {
      http
        .post('/api/v1/todos', {
          title: todo.title,
          completed: false
        })
        .then(response => {
          commit('addTodo', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    clearCompleted({ commit }) {
      http
        .delete('/api/v1/delete_completed')
        .then(response => {
          commit('clearCompleted', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkAll({ commit }, checked) {
      http
        .patch('/api/v1/check_all', {
          checked
        })
        .then(() => {
          commit('checkAll', checked)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteTodo({ commit }, id) {
      http
        .delete(`/api/v1/todos/${id}`)
        .then(response => {
          commit('deleteTodo', response.data.id)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateTodo({ commit }, todo) {
      http
        .patch(`/api/v1/todos/${todo.id}`, {
          title: todo.title,
          completed: todo.completed
        })
        .then(response => {
          commit('updateTodo', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
