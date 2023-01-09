<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import VarList from '@/components/var-list/index.vue'
import Settings from '@/components/settings/index.vue'

const menuList = ref([
  {
    name: '变量列表',
    component: computed(() => VarList),
  },
  {
    name: '设置',
    component: computed(() => Settings),
  },
])
const currentPage = ref(0)
</script>

<template>
  <div class="menu">
    <div class="menu-header">
      <div
        v-for="(menu, index) in menuList"
        :key="index"
        class="menu-header-item"
        :class="{ active: index == currentPage }"
        @click="currentPage = index"
      >
        {{ menu.name }}
      </div>
    </div>
    <div class="menu-content">
      <component
        :is="menuList[currentPage]?.component"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.menu {
  width: 1024px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  padding: 20px 0;
  font-size: 14px;
  box-sizing: border-box;

  &-header {
    width: 200px;

    &-item {
      padding: 15px;
      cursor: pointer;

      &.active, &:hover {
        background: rgba(255,255,255,0.6);
      }
    }
  }

  &-content {
    flex: 1;
    background: rgba(255,255,255,0.6);
  }
}
</style>
