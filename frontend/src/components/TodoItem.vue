<template>
  <b-list-group-item
    class="flex-wrap d-flex justify-content-around align-items-center todo-item"
  >
    <b-col cols="2">
      <b-form-checkbox v-model="completed" @input="doneEdit"></b-form-checkbox>
    </b-col>

    <b-col cols="8">
      <label
        v-if="!editing"
        :class="{ completed: completed }"
        @dblclick="editing = true"
        >{{ title }}</label
      >
      <b-form-input
        v-else
        v-model="title"
        v-focus
        type="text"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.escape="cancelEdit"
      />
    </b-col>

    <b-col cols="2">
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="deleteTodo(todo.id)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </b-col>
  </b-list-group-item>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'TodoItem',
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: false
    }
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed
    }
  },
  methods: {
    ...mapActions(['deleteTodo', 'updateTodo']),
    doneEdit() {
      this.editing = false

      this.updateTodo({
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      })
    },
    cancelEdit() {
      this.title = this.todo.title
      this.editing = false
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  animation-duration: 0.3s;
}

.completed {
  text-decoration: line-through;
  color: grey;
}
</style>
