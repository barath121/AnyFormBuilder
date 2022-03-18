<template>
  <router-view></router-view>
</template>
<script>
import FormPreview from "./components/FormPreview.vue";``
import FormBuilder from "./components/FromBuilder.vue";

export default {
  name:"App",
  components :{
    FormBuilder,
    FormPreview
  }
}
</script>