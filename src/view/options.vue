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
  <div class="w-1024 mx-auto flex py-4 h-screen">
    <div class="w-32">
      <div
        v-for="(menu, index) in menuList"
        :key="index"
        class="h-10 bg-zinc-100 text-center"
        :class="{ active: index == currentPage }"
        @click="currentPage = index"
      >
        {{ menu.name }}
      </div>
    </div>
    <div class="flex-1 bg-white bg-opacity-40 h-full">
      <component
        :is="menuList[currentPage]?.component"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
// .menu {
//   width: 1024px;
//   height: 100vh;
//   margin: 0 auto;
//   display: flex;
//   font-size: 14px;
//   box-sizing: border-box;

//   &-header {
//     width: 200px;

//     &-item {
//       padding: 15px;
//       cursor: pointer;

//       &.active, &:hover {
//         background: rgba(255,255,255,0.6);
//       }
//     }
//   }

//   &-content {
//     flex: 1;
//     background: rgba(255,255,255,0.6);
//   }
// }
</style>
