<template>
  <h3 class="title font-weight-regular mr-5"><span class="lstick"></span>{{ title }}</h3>
</template>

<script>
export default {
  name: "BaseTitle",

  props: {
    title: {
      type: String
    }
  },

  computed: {}
};
</script>
