<script setup>
/**
 * @file pages/dashboard.vue
 * @description Display the default page after login 
 * different ui based on the user's role
 */


//fetch currently authenticated user from session
const { user } = useUserSession()


// Check if user is an admin or normal user
  const isAdmin = computed(() => {
    return user.value?.role === 'admin'; 
  });
  
// dynamic page title based on user
useHead({
  title: () => isAdmin.value ? 'Admin Dashboard' : 'Dashboard'
})



</script>

<template>
  <div :class="['dashboardWrapper', { 'adminDashboard': isAdmin, 'normalUserDashboard': !isAdmin }]">
    <DashboardContent />
  </div>
</template>



<style lang="scss" scoped>

// shared dashboard wrapper
.dashboardWrapper {
  width: 100%;

  // normal user dashboard spacing
  &.normalUserDashboard {
    padding: 10px 30px;
  }
}

.adminDashboard{
  display:flex;
  align-items:center;
  justify-content:center;
  padding:4px;

}

</style>

