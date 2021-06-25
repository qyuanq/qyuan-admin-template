<template>
  <div class="editor">
    <tinymce v-model="content" :height="300" />
    <div class="html" v-html="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {

  components: {
    Tinymce
  },
  data() {
    return {
      content: ''
    }
  },

  computed: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
