<script lang="ts" setup>
import SideBar from '@/components/SideBar.vue';
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div>
    <TopBar />
    <SideBar :style="{ width: '15%' }" />
    <Footer />
  </div>
</template>

<style scoped></style>
