<template>
  <FormPreview/>
</template>

<script>
import FormBuilder from "./components/Frombuilder.vue";
import FormPreview from "./components/FormPreview.vue";
export default {
  name:"App",
  components :{
    FormBuilder,
    FormPreview
  }
}
</script>