<template>
  <div class="virtual-list">
    <lite-virtual-list type="fixed" :size="174" :remain="10" :data="goodList" :screen="[2, 2]" :interval="5" :distance="100">
      <div slot-scope="{ item }">
        <!-- <div>{{ item.id }}</div> -->
        <GoodItem :goods="item" />
      </div>
    </lite-virtual-list>
  </div>
</template>

<script>
import GoodItem from './components/GoodItem.vue'
let i = 1
const goodList = []
while (i < 2000) {
  goodList.push({ id: i, checked: false, name: '二级造价师-建设工程计量与计价实务（土木建筑工程）' + i })
  i++
}
Object.freeze(goodList)
export default {

  components: { GoodItem },
  data() {
    return {
      goodList
    }
  },

  computed: {},

  created() {

  },

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
