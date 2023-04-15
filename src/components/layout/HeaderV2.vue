<template>
  <div>
    <div
      class="mx-auto expand-menu"
      :class="dropdownShowing ? 'active-menu' : ''"
    >
      <div class="menu-card">
        <div
          class="menu-content"
          :class="dropdownShowing ? 'active-content' : ''"
        >
          <div>
            <div class="pa-3">
              <h3 class="text-center" v-if="isAuthenticated">
                Welcome, {{ user.nickname }}!
              </h3>
              <div
                class="d-flex menu-item"
                style="align-items: center"
                v-for="(item, index) in mobileMenuTabs"
                @click="handleMobileMenuClick(item)"
              >
                <div style="width: 2rem">
                  <font-awesome-icon
                    style="font-size: 1.2rem"
                    :icon="item.icon"
                  />
                </div>
                <h2>{{ item.label }}</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-toggle">
          <v-btn theme="dark" @click="toggleDropDown"
            ><font-awesome-icon
              style="color: white"
              :icon="dropdownShowing ? 'fa-solid fa-x' : 'fa-solid fa-bars'"
            ></font-awesome-icon
          ></v-btn>

          <!-- <p style="font-size: 1rem" class="ml-4" v-if="isAuthenticated">
            Welcome, {{ user.nickname }}!
          </p> -->
          <strong
            ><p style="font-size: 1rem" class="ml-4 mr-2">UpNext</p></strong
          >
        </div>
      </div>
    </div>

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
<style lang="scss" scoped>
:root {
  --header-height: 64px;
}
.mobile-menu {
  bottom: 0;
}
.mobile-menu-toggle {
  position: fixed;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
  width: 50px;
  z-index: 3;
  display: flex;
}

.menu-overlay {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.649);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
.active {
  visibility: visible;
  //   opacity: 0.7;
}
.hidden {
  visibility: hidden;
}

.expand-menu {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2 !important;
  position: fixed !important;
  bottom: 10px;
  background-color: transparent;
  padding: 10px;
  transition: 0.3s;

  .menu-content {
    height: 0;
    overflow: hidden;
    border-radius: 10px;
    background-color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
    width: 90%;
    transition: 0.3s;
  }
}

.menu-item {
  padding: 10px;
}

.active-menu {
  transition: 0.3s;
}

.active-content {
  height: 300px !important;
  transition: 0.3s;
}

.menu-card {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
}

.menu-toggle {
  display: flex;
  width: fit-content;
  justify-self: center;
  justify-content: flex-start;
  align-items: center;
  height: 64px;
  padding: 10px;
  background-color: black;
  border: 1px solid white;
  color: white;
  border-radius: 10px;
}
</style>
