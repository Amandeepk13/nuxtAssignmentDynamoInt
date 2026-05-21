<script setup>
const loader = useGlobalLoader()
</script>

<template>
    <NuxtRouteAnnouncer />
    <appLoader v-if="loader" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
</template>




