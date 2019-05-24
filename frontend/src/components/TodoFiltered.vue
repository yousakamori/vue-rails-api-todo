<template>
  <b-col cols="6">
    <b-form-radio-group
      v-model="selected"
      :options="options"
      buttons
      button-variant="outline-primary"
      name="radio-btn-outline"
      @change="updateFilter"
    ></b-form-radio-group>
  </b-col>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TodoFiltered',
  data() {
    return {
      selected: 'all',
      options: [
        { text: 'All', value: 'all' },
        { text: 'Active', value: 'active' },
        { text: 'Completed', value: 'completed' }
      ]
    }
  },
  computed: {
    ...mapState(['filter'])
  },
  methods: {
    ...mapMutations(['updateFilter'])
  }
}
</script>
