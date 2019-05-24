<template>
  <b-col cols="6">
    <div>
      <b-button
        v-if="showClearCompletedButton"
        variant="outline-primary"
        @click="clearCompleted"
        >Clear Completed</b-button
      >
    </div>
  </b-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TodoClearCompleted',
  computed: {
    ...mapGetters(['showClearCompletedButton'])
  },
  methods: {
    ...mapActions(['clearCompleted'])
  }
}
</script>
