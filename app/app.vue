<script setup>
/**
 * @file app.vue
 * @description Root component of Nuxt Project. 
 * Handles global page configurations, layouts, and global loaders.
 */

// Initialize global loader
const loader = useGlobalLoader()

// Global SEO tags configuration
// Title management for pages...
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Merge Token` : 'Merge Token'
  }
})

</script>

<template>
  <div class="app-root">
    <NuxtRouteAnnouncer />
    
    <AppLoader v-if="loader" />
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
    
</template>



