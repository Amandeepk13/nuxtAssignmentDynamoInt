<template>
  <div class="loaderOverlay">
    <div
      class="spinner-border text-dark"
      style="width: 3.5rem; height: 3.5rem;"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loaderOverlay {
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,0.75);
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999999;
}
</style>