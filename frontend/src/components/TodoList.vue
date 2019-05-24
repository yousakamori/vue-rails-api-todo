<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="12">
          <b-form @submit.prevent="addTodo">
            <b-form-group label="New todo" label-for="new-todo">
              <b-form-input
                id="new-todo"
                v-model="newTodo"
                placeholder="What needs to be done?"
              ></b-form-input>
            </b-form-group>
          </b-form>

          <b-list-group>
            <transition-group name="fade">
              <TodoItem
                v-for="(todo, index) in todosFiltered"
                :key="todo.id"
                :todo="todo"
                :index="index"
                class="todo-item"
                :check-all="completedAll"
              />
            </transition-group>
          </b-list-group>

          <b-list-group class="mt-4">
            <b-list-group-item
              class="flex-wrap d-flex justify-content-around align-items-center"
            >
              <TodoCheckAll />
              <TodoItemsRemaining />
            </b-list-group-item>
            <b-list-group-item
              class="flex-wrap d-flex justify-content-around align-items-center"
            >
              <TodoFiltered />
              <TodoClearCompleted />
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem'
import TodoItemsRemaining from '@/components/TodoItemsRemaining'
import TodoCheckAll from '@/components/TodoCheckAll'
import TodoFiltered from '@/components/TodoFiltered'
import TodoClearCompleted from '@/components/TodoClearCompleted'
import { mapGetters } from 'vuex'

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted
  },
  data() {
    return {
      newTodo: ''
    }
  },
  computed: {
    ...mapGetters(['completedAll', 'todosFiltered'])
  },
  created() {
    this.$store.dispatch('retrieveTodos')
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.$store.dispatch('addTodo', {
          id: this.idForTodo,
          title: this.newTodo
        })
      }
      this.newTodo = ''
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
