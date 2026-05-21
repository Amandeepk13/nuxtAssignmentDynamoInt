export const useAuth = () => {

  const { fetch: refreshSession } = useUserSession()

  const login = async (name, email, picture) => {
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        name,
        email,
        picture
      },
    });
    await refreshSession();
    
    
    if(res.role === 'admin'){
      await navigateTo('/admin')
    } else {
      await navigateTo('/')
    }

  };

  return { login };
};
