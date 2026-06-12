<script setup>

const {login} = useAuth()
const loader = useGlobalLoader()

const onSuccess = async(e) => {
  // console.log("user claims", e.claims)
  try{
    loader.value = true;

    await login(e.claims.name, e.claims.email, e.claims.picture)

  } finally {
      loader.value = false;
  }
  
};

const onError = (err) => {
  console.error(err);
};

</script>

<template>
  <div class="loginCard">
    <div class="mergeLogoContainer">
      <div class="mergelogo">
        <img src="../assets/img/git-mergeIcon.svg" alt="MergeApp Logo" class="logo-sign"/>
      </div>
    </div>


    <h1 class="title" tabindex="0">Merge Token</h1>
    <p class="subTitle" tabindex="0">Manage repository tokens and collaborate with your team </p>

  
      <ClientOnly>
        <GoogleLoginButton
          :options="{ theme: 'filled_black', size: 'large', text: 'signin_with'}"
          @success="onSuccess"
          @error="onError"
        />
      </ClientOnly>
    
    
  </div>
</template>

<style scoped lang="scss">

 .loginCard {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10%;
  width: 100%;
  max-width: 450px;
  text-align: center;
  padding: 20px;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow-primary; 
}

.mergeLogoContainer{
  padding:10px;
}

.mergelogo{
  width:80px;
  height:80px;
  background-color: rgb(17, 101, 245);
  border-radius:50%;
  color:white;
  display:flex;
  align-items:center;
  justify-content: center;
  

  .logo-sign{
    width:50px;
    height:50px;
  }
}

.title{
  font-size: $font-heading;
  
  margin: 10px;
  padding:8px;
}
.subTitle{
  font-size: 16px;
  
  color:gray;
  padding:8px;
}

</style>


