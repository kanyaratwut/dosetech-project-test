<template>
  <div class="home-container">
    <div class="header-info">
      <div class="d-flex justify-content-end gap-2">
        <UserIcon class="user-icon" />
        <div>{{ name }}</div>
      </div>
    </div>
    <div class="header mb-3">
      <HeaderLine :title="'บัญชีผู้ใช้'" />
    </div>
    <div class="content mt-2">
      <NavigationBar :tabs="tabs" />
    </div>
  </div>
</template>

<script>
import HeaderLine from "@/components/HeaderLine.vue";
import NavigationBar from "@/components/NavigationBar.vue";

import UserIcon from "@/assets/image/svg/UserIcon.vue";

import { mapState } from 'vuex';

export default {
  name: "HomeView",
  components: {
    HeaderLine,
    NavigationBar,

    UserIcon,
  },
  data() {
    return {
      tabs: [
        {
          label: "บัญชีของฉัน",
          component: "InfoView",
          icon: "UserIcon",
        },
        {
          label: "เปลี่ยนรหัสผ่าน",
          component: "ChangePassword",
          icon: "ChangePasswordIcon",
        },
        {
          label: "ที่อยู่จัดส่ง",
          component: "AddressView",
          icon: "ContactIcon",
        },
        {
          label: "ออกจากระบบ",
          component: "LoginView",
          icon: "LockOutIcon",
          router: "/login",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      name: state => state.formData.firstName && state.formData.lastName ? `${state.formData.firstName} ${state.formData.lastName}` : state.formData.email.split('@')[0] 
    })
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  padding: 0px 30px;
  background-color: #fff;
  .header-info {
    padding: 10px 50px;

    .user-icon {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
