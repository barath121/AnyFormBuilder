<template>
  <router-view></router-view>
</template>
<script>
import FormBuilder from "./components/FromBuilder.vue";
import FormPreview from "./components/FormPreview.vue";
export default {
  name:"App",
  components :{
    FormBuilder,
    FormPreview
  }
}
</script>