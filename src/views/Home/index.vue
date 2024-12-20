<script lang="ts" setup>
import SideBar from '@/components/SideBar.vue';
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';
import StockTable from '@/components/StockTable.vue';
</script>

<template>
  <div>
    <TopBar />
    <SideBar />
    <div class='sideStock'>
      <StockTable />
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.sideStock {
  position: absolute;
  width: 87.7%;
  margin-left: 13.7%;
}
</style>
