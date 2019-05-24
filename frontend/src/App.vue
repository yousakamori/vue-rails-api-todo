<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png" class="logo" />
    <h1>VueTODO</h1>
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style lang="scss" scoped>
.logo {
  margin: 0 auto;
  display: block;
}
</style>
