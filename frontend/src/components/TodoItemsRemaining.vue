<template>
  <b-col cols="6">
    <span class="text-danger">{{ remaining }}</span>
    {{ remaining | pluralize('item') }} left
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TodoItemsRemaining',
  filters: {
    pluralize: (n, w) => (n === 1 ? w : w + 's')
  },
  computed: {
    ...mapGetters(['remaining'])
  }
}
</script>
