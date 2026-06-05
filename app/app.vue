<script setup>
const loader = useGlobalLoader()
</script>

<template>
    <NuxtRouteAnnouncer />
    <AppLoader v-if="loader" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
</template>




