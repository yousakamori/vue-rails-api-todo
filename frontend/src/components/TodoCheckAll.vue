<template>
  <b-col cols="6">
    <b-form-checkbox :checked="completedAll" @change="checkAll"
      >Check All</b-form-checkbox
    >
  </b-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TodoCheckAll',
  computed: {
    ...mapGetters(['completedAll'])
  },
  methods: {
    ...mapActions(['checkAll'])
  }
}
</script>
