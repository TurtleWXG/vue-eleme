<template>
  <div class="tab">
    <cube-tab-bar v-model="selectedLabelDefault" ref="tabBar" :show-slider="true" :useTransition="false" :data="tabs"> </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        ref="slide"
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="index"
        :options="options"
        @change="onSlideChange"
        @scroll="onSlideScroll"
      >
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data" ref="component" />
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      },
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      index: this.initialIndex,
      options: {
        listenScroll: true,
        probeType: 3,
        eventPassthrough: 'vertical',
      },
    }
  },
  computed: {
    selectedLabelDefault: {
      get() {
        return this.tabs[this.index].label
      },
      set(newVal) {
        this.index = this.tabs.findIndex(value => {
          return value.label === newVal
        })
      },
    },
  },
  mounted() {
    this.onSlideChange(this.index)
  },
  methods: {
    onSlideChange(index) {
      this.index = index
      const component = this.$refs.component[index]
      component.fetch && component.fetch()
    },
    onSlideScroll(pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = (-pos.x / slideWidth) * tabBarWidth
      this.$refs.tabBar.setSliderTransform(transform)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.tab
  >>> .cube-tab
    padding 10px 0
  display flex
  flex-direction column
  height 100%
  .slide-wrapper
    flex 1
    overflow hidden
</style>
