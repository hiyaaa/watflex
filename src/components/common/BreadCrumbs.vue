<template>
  <div>
    <v-breadcrumbs :items="breadCrumbsItems" divider=">"> </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    breadCrumbsItems() {
      let rst = [];
      const route = this.$route;
      const matched = route.matched[1];
      if (!matched) return;
      const param = route.params ? route.params : null;

      // 상위 메뉴 추가하여 리턴
      const parentObj = this.getParent(matched, param);
      rst = rst.concat(parentObj);

      // 현재 메뉴 추가
      const obj = {
        text: matched.name,
        to: { name: matched.name, param },
        disabled: true,
        exact: true
      };
      rst.push(obj);
      return rst;
    }
  },
  methods: {
    getParent(route, param) {
      let rst = [];
      if (route.meta.parent) {
        const resolved = this.$router.resolve({ name: route.meta.parent }).resolved.matched[1];
        rst = this.getParent(resolved, param);
        const parentObj = {
          text: resolved.name,
          to: { name: resolved.name, param },
          disabled: false,
          exact: true
        };
        rst.push(parentObj);
      }
      return rst;
    }
  }
};
</script>

<style></style>
