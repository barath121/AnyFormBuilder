<template>
  <div class="flex flex-col h-screen">
    <Navbar/>
    <div class="flex flex-row h-full">
      <div class="flex border" id="formPagesListHolder">
        <div class="flex flex-col">
          <div class="flex text-center justify-between p-2 borderBottom">
            <h1>Questions</h1>
            <font-awesome-icon
              icon="square-plus"
              class="text-2xl my-auto icon growAnimation"
              @click="addPage()"
            />
          </div>
          <div class="flex flex-col overflow-y-auto colorWhite cursor-pointer">
            <div class="" v-for="page in pages" :key="page.id">
              <Formpagelist
                :page="page"
                v-on:click="getSelectedPageIndex(page.id)"
                @contextmenu="onContextMenu($event, page.id)"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="h-full borderTop colorWhite basis-11/12 overflow-y-scroll snap-y snap-mandatory hidescroll"
        id="formPagesHolder"
      >
        <Formpage :pages="pages" :selectedpage="selectedpage" />
      </div>
      <Optionsbar
        :pages="pages"
        :selectedpage="selectedpage"
        @changePageType="pages[selectedpage].pageType = $event"
        @changeQuestion="pages[selectedpage].question = $event"
        @changeChoices="pages[selectedpage].choices = $event"
        @changeIsRequired="pages[selectedpage].isRequired = $event"
        @changeMaxCharacters="pages[selectedpage].maxCharacters = $event"
        @changeVerification="pages[selectedpage].regex = $event"
        @changeFieldName="pages[selectedpage].fieldName=$event"
      />
    </div>
  </div>
</template>
<style>
@import "./../assets/CSS/formbuilder.css";
@import "./../assets/CSS/index.css";
</style>
<script>
import Navbar from "./Formbuilder/Navbar.vue";
import Formpage from "./Formbuilder/FormPage.vue";
import Formpagelist from "./Formbuilder/FormPageList.vue";
import Optionsbar from "./Formbuilder/OptionsBar.vue";
import ContextMenu from "@imengyu/vue3-context-menu";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "vue-toastification";
export default {
  name: "FormBuilder",
  components: {
    Navbar,
    Formpage,
    Formpagelist,
    Optionsbar,
    ContextMenu,
  },
  props: {
    page: {
      pageType: { required: true, type: String },
      question: { default: false, type: String },
      choices: [{ required: true, type: String }],
      isRequired: { required: true, type: Boolean },
      id: { required: true, type: Boolean },
    },
  },
  data() {
    return {
      selectedpage: 0,
      toast : useToast(),
      pages: [
          {
            fieldName : "Name",
            pageType: "Small Text",
            question: "What is your name",
            choices: [],
            isRequired: true,
            maxCharacters : 5,
            id: 1,
          },
          {
            fieldName : "Name1",
            pageType: "Radio Button",
            question: "What is your name1",
            choices: ["Ramesh", "Suresh", "Ram"],
            isRequired: false,
            id: 2,
          },
          {
            fieldName : "Name2",
            pageType: "Large Text",
            question: "What is your name2",
            choices: [],
            isRequired: false,
            regex: "/123/",
            id: 3,
          },
        ],
    };
  },
  methods: {
    getSelectedPageIndex(id) {
      this.selectedpage = this.pages.findIndex((page) => page.id === id);
      console.log(this.selectedpage);
    },
    addPage() {
      let page = {
        pageType: "Small Text",
        question: "Add a Question",
        id: uuidv4(),
      };
      this.pages.push(page);
    },
    displayToast(toastType,toastMessage){
        this.toast[toastType](toastMessage);
    },
    duplicatePage(id){
    let selectedPage = this.pages.findIndex((page) => page.id === id);
    let tempPage = JSON.parse(
      JSON.stringify(this.pages[selectedPage])
    );
    tempPage.id = uuidv4();
    this.pages.push(tempPage);
    },
    deletePage(id){
      let selectedPage = this.pages.findIndex((page) => page.id === id);
      if (this.pages.length > 1) this.pages.splice(selectedPage, 1);
      else this.displayToast("error","Form must have atleast one page");
    },
    onContextMenu(e, id) {
      e.preventDefault();
      this.$contextmenu({
        x: e.x,
        y: e.y,
        items: [
          {
            label: "Delete",
            onClick: () => {
              this.deletePage(id);
            },
          },
          {
            label: "Duplicate",
            onClick: () => {
             this.duplicatePage(id);
            },
          },
        ]
      });
    },
  },
};
</script>
