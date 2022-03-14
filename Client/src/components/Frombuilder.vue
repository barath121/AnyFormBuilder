<template>
  <div class="flex flex-col h-screen">
    <Navbar />
    <div class="flex flex-row h-full">
      <div class="flex border" id="formPagesListHolder">
        <Formpagelist />
      </div>
      <div
        class="h-full borderTop colorWhite basis-11/12 overflow-y-scroll snap-y snap-mandatory hidescroll"
        id="formPagesHolder"
      >
        <Formpage />
      </div>
      <Optionsbar />
    </div>
  </div>
</template>
<style>
@import "./../assets/CSS/formbuilder.css";
</style>
<script>
import Navbar from "./Formbuilder/Navbar.vue";
import Formpage from "./Formbuilder/FormPage.vue";
import Formpagelist from "./Formbuilder/FormPageList.vue";
import Optionsbar from "./Formbuilder/OptionsBar.vue";
export default {
  name: "FormBuilder",
  components: {
    Navbar,
    Formpage,
    Formpagelist,
    Optionsbar,
  },
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean },
    id: { required: true, type: String },
  },
  data() {
    return {
      pages: [
        [
          {
            pageType: "Small Text",
            question: "What is your name",
            choices: [],
            isRequired: true,
            _id: {
              $oid: "622f54f78ecbfeeab3baa37c",
            },
          },
          {
            pageType: "Check Box",
            question: "What is your name",
            choices: ["Ramesh", "Suresh", "Ram"],
            isRequired: true,
            _id: {
              $oid: "622f54f78ecbfeeab3baa37d",
            },
          },
          {
            pageType: "Small Text",
            question: "What is your name",
            choices: [],
            isRequired: false,
            regex: "/123/",
            _id: {
              $oid: "622f54f78ecbfeeab3baa37e",
            },
          },
        ],
      ],
    };
  },
};
</script>
