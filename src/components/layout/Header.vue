<template>
  <div>
    <v-app-bar elevation="0" color="black">
      <v-app-bar-title @click="$router.push('/')">UpNext</v-app-bar-title>
      <!-- <v-spacer></v-spacer> -->

      <span class="pr-4" v-if="isAuthenticated"
        >Welcome, {{ user.nickname }}!</span
      >

      <!-- <v-btn @click="test" variant="outlined">User</v-btn> -->
      <!-- <v-btn @click="searchModal = true" variant="outlined">Search</v-btn>
      <v-btn @click="navModal = true" variant="outlined">More</v-btn> -->
      <!-- <v-btn class="mr-2" href="/" variant="outlined">Up Next</v-btn> -->
      <!-- <v-btn
        class="mr-2"
        href="/profile"
        v-if="isAuthenticated"
        variant="outlined"
        >Profile</v-btn
      > -->
      <!-- <LogoutBtn class="mr-2" v-if="isAuthenticated" />
      <LoginBtn class="mr-2" v-if="!isAuthenticated" /> -->
      <!-- <SignupBtn class="mr-2" v-if="!isAuthenticated"></SignupBtn> -->
      <!-- <v-app-bar-nav-icon
        theme="dark"
        @click="toggleDropDown"
      ></v-app-bar-nav-icon> -->
    </v-app-bar>

    <!-- Start Nav modal -->
    <!-- <v-dialog v-model="navModal">
      <v-card class="pa-3">
        <div style="display: flex; flex-direction: column">
          <v-btn href="/" variant="text">Home</v-btn>
          <v-btn href="/profile" variant="text">Profile</v-btn>
        </div>
      </v-card>
    </v-dialog> -->

    <v-expand-transition @click:outside="toggleDropDown">
      <v-card v-show="dropdownShowing" class="mx-auto expand-menu">
        <v-list>
          <v-list-item
            @click="handleMobileMenuClick(item)"
            v-for="(item, index) in mobileMenuTabs"
            :key="index"
          >
            <template v-slot:prepend>
              <div style="width: 2rem">
                <font-awesome-icon :icon="item.icon" />
              </div>
            </template>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-expand-transition>
    <!-- End Nav modal -->

    <v-btn
      rounded="xl"
      theme="dark"
      class="mobile-menu-toggle"
      @click="toggleDropDown"
      ><font-awesome-icon
        style="color: white"
        icon="fa-solid fa-bars"
      ></font-awesome-icon
    ></v-btn>

    <div
      @click="toggleDropDown"
      class="menu-overlay"
      :class="dropdownShowing ? 'active' : 'hidden'"
    ></div>

    <!-- Start Search Modal -->
    <v-dialog v-model="searchModal">
      <v-card class="pa-3">
        <v-card-title>Search</v-card-title>
        <v-text-field
          variant="outlined"
          label="Search"
          @keydown.enter="startSearch"
          :autofocus="true"
          v-model="searchText"
        ></v-text-field>
        <v-btn @click="startSearch">Go</v-btn>
      </v-card>
    </v-dialog>
    <!-- End Search Modal -->
    <!-- 
    <v-dialog content-class="mobile-menu" v-model="dropdownShowing">
      <v-card>
        <v-list>
          <v-list-item
            @click="handleMobileMenuClick(item)"
            v-for="(item, index) in mobileMenuTabs"
            :key="index"
          >
            <template v-slot:prepend>
              <div style="width: 2rem">
                <font-awesome-icon :icon="item.icon" />
              </div>
            </template>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog> -->
  </div>
</template>
<script>
import LoginBtn from "@/components/LoginBtn.vue";
import LogoutBtn from "@/components/LogoutBtn.vue";
import SignupBtn from "@/components/SignupBtn.vue";
export default {
  data() {
    return {
      navModal: false,
      searchModal: false,
      searchText: "",
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      dropdownShowing: false,
    };
  },
  components: { LoginBtn, LogoutBtn, SignupBtn },
  computed: {
    mobileMenuTabs() {
      if (this.isAuthenticated) {
        return [
          { label: "Home", route: "/", icon: "fa-solid fa-house" },
          { label: "Lists", route: "/lists", icon: "fa-solid fa-list" },
          { label: "Profile", route: "/profile", icon: "fa-solid fa-user" },
          {
            label: "Logout",
            route: "/logout",
            icon: "fa-solid fa-right-from-bracket",
          },
        ];
      } else {
        return [
          { label: "Home", route: "/", icon: "fa-solid fa-house" },
          {
            label: "Login",
            route: "/login",
            icon: "fa-solid fa-right-from-bracket",
          },
        ];
      }
    },
  },
  methods: {
    handleMobileMenuClick(item) {
      console.log(item);
      switch (item.route) {
        case "/login":
          this.login();
          break;
        case "/logout":
          this.logout();
          break;
        default:
          this.$router.push(item.route);
      }
      this.dropdownShowing = false;
    },
    toggleDropDown() {
      this.dropdownShowing = !this.dropdownShowing;
    },
    test() {
      console.log(this.isAuthenticated);
      if (this.isAuthenticated) {
        console.log(this.user, "user");
      }
    },
    login() {
      this.$auth0.loginWithRedirect({
        appState: {
          target: "/profile",
        },
      });
    },
    logout() {
      this.$auth0.logout({
        returnTo: window.location.origin,
      });
    },
    startSearch() {
      this.searchModal = false;
      console.log(this.searchText, "searching...");

      this.axios
        .get(
          import.meta.env.VITE_APP_MOVIE_API +
            `/search/multi?api_key=${
              import.meta.env.VITE_APP_MOVIE_API_KEY
            }&query=${this.searchText}`
        )
        .then((resp) => {
          console.log(resp, "SEARCHED");
        })
        .catch((error) => {
          console.log(error, "error");
        });
    },
  },
};
</script>
<style lang="scss">
.mobile-menu {
  // border: 2px solid red;
  bottom: 0;
}
.mobile-menu-toggle {
  // border: 2px solid red;
  position: fixed;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
  width: 50px;
  z-index: 3;
}

.menu-overlay {
  height: 100%;
  width: 100%;
  // visibility: hidden;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  // opacity: 0;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
  transition: opacity 0.3s linear, visibility 0s;
}

.active {
  opacity: 0.8;
  visibility: visible;
  transition: visibility 0s, opacity 0.3s linear;
}
.hidden {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s linear, visibility 0.3s;
}

.expand-menu {
  // outline: 2px solid red !important;
  height: 30vh;
  width: 100vw;
  z-index: 2 !important;
  position: fixed !important;
  bottom: 0;
}
</style>
