// Import the Auth0 Vue SDK and the Auth store
// import { useAuth } from "@vueuse/auth"; // import the Auth0 Vue SDK
import { useAuth0 } from "@auth0/auth0-vue";
import { useAuthStore } from "@/stores/user"; // import the auth store
import { watchEffect } from "vue";

// Define a function for authentication guard
export async function customAuthGuard(to, from, next) {
  const { user } = useAuth0(); // use the Auth0 Vue SDK
  const authStore = useAuthStore(); // use the auth store

  watchEffect(() => {
    console.log(user, "user @ watch erffect");
  });
  // Check if the user is authenticated
  //   if (auth.isAuthenticated.value) {
  //     // User is authenticated, fetch user profile from Auth0
  //     try {
  //       const user = await auth.user.value; // get user profile from Auth0
  //       authStore.updateAuthStatus(true, user); // update the store with the new status and user
  //     } catch (error) {
  //       // Handle error if fetching user profile fails
  //       console.error("Failed to fetch user profile from Auth0:", error);
  //     }
  //   }

  // Allow access to the route
  next();
}
