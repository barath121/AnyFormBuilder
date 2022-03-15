<template>
     <div class="borderTop colorWhite h-screen overflow-y-scroll snap-y snap-mandatory">
        <div class="" v-for="(page,index) in pages" :key="page.id" >
                <Formpage  :page="page" :isLastPage="isLastPage(index)"/>
        </div>
    </div>
</template>
<style>
@import "./../assets/CSS/formbuilder.css";
@import "./../assets/CSS/index.css";
</style>
<script>
import Formpage from "./FormPreview/FormPage.vue";
export default {
  name: "FormBuilder",
  components: {
    Formpage
  },
  props: {
    page : {
      pageType: { required: true, type: String },
      question: { default: false, type: String },
      choices: [{ required: true, type: String }],
      isRequired : { required: true, type: Boolean },
      id : {required : true , type : Boolean}
    }
  },
  data() {
    return {
      pages: [
          {
            pageType: "Small Text",
            question: "What is your name",
            choices: [],
            isRequired: true,
            maxCharacters : 5,
            id: 1,
          },
          {
            pageType: "Radio Button",
            question: "What is your name1",
            choices: ["Ramesh", "Suresh", "Ram"],
            isRequired: false,
            id: 2,
          },
          {
            pageType: "Large Text",
            question: "What is your name2",
            choices: [],
            isRequired: false,
            regex: "/123/",
            id: 3,
          },
        ]
    };
  },
  methods: {
      isLastPage(index){
          return this.pages.length -1 == index
      }
  },
};
</script>
