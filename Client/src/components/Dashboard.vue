<template>
  <div>
    <vue-final-modal
      v-model="isModalActive"
      classes="modal-container"
      content-class="modal-content"
    >
      <button class="modal__close" @click="closeModal()">X</button>
      <div v-if="renameFormModal">
        <span class="modal__title">Rename Form Title</span>
        <div class="modal__content flex flex-col">
          <input type="text" class="rounded p-1" v-model="currentTitle" />
          <button
            type="button"
            class="button rounded my-2"
            @click="renameFormTitle()"
          >
            Rename
          </button>
        </div>
      </div>
      <div v-if="createFormModal">
        <span class="modal__title">Create Form</span>
        <div class="modal__content flex flex-col">
          <input type="text" class="rounded p-1" v-model="newFormTitle" />
          <button
            type="button"
            class="button rounded my-2"
            @Click="createForm()"
          >
            Create
          </button>
        </div>
      </div>
    </vue-final-modal>
  </div>
  <div class="flex flex-col my-2">
    <div class="flex borderBottom place-content-between">
      <div class="ml-2">
        <a href="./dashboard.html"><h1>AnyFormBuilder</h1></a>
      </div>
    </div>
  </div>
  <div class="flex flex-row place-content-evenly p-3 borderBottom">
    <div>
      <label for="">Title:</label>
      <input type="text" class="ml-1 p-1 shadow focus:outline-none" />
    </div>
    <div>
      <label for="">Sort By</label>
      <select class="rounded p-1 ml-1">
        <option>Last Modified</option>
        <option>Created On</option>
        <option>Title</option>
      </select>
    </div>
    <button class="button rounded">Search</button>
  </div>
  <div class="items-center mx-4">
    <table class="w-full">
      <thead class="text-left">
        <tr>
          <th>No.</th>
          <th>Title</th>
          <th>Created On</th>
          <th>Last Modified</th>
          <th><font-awesome-icon
              icon="square-plus"
              class="text-2xl my-auto icon growAnimation"
              @click="createFormModalBox()"
            /></th>
        </tr>
      </thead>
      <tr
        v-for="(form, index) in forms"
        :key="index + form.title"
        @contextmenu="onContextMenu($event, index)"
      >
        <td>{{ index + 1 }}</td>
        <td>
          <div class="truncate w-64">{{ form.title }}</div>
        </td>
        <td>{{ toDateWithTime(form.createdOn) }}</td>
        <td>{{ toDateWithTime(form.modifiedOn) }}</td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
@import url("./../assets/CSS/modal.css");
</style>
<script>
import ContextMenu from "@imengyu/vue3-context-menu";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { useToast } from "vue-toastification";
export default {
  name: "Dashboard",
  components: {
    ContextMenu,
    VueFinalModal,
    ModalsContainer,
  },
  data() {
    return {
      isModalActive : false,
      renameFormModal: false,
      createFormModal : false,
      newFormTitle : "",
      currentTitle: "",
      toast : useToast(),
      selectedIndex: 0,
      forms: [
        {
          title: "Hello There",
          createdOn: new Date(),
          modifiedOn: new Date(),
        },
        {
          title: "Hello There1",
          createdOn: new Date(),
          modifiedOn: new Date(),
        },
        {
          title: "Hello There2",
          createdOn: new Date(),
          modifiedOn: new Date(),
        },
      ],
    };
  },
  methods: {
    closeModal(){
      this.renameFormModal = false,
      this.createFormModal = false,
      this.isModalActive = false;
    },
    createForm(){
      if(this.newFormTitle.length){
       let form =  {
          title: this.newFormTitle,
          createdOn: new Date(),
          modifiedOn: new Date(),
        }
        this.forms.push(form);
        this.displayToast("success","Form Has Been Created");
      }
      else{
        this.displayToast("warning","Add a title before creating");
      }
    },
    displayToast(toastType,toastMessage){
        this.toast[toastType](toastMessage);
    },
    toDateWithTime(date) {
      return (
        new Date(date).toLocaleTimeString() +
        ", " +
        new Date(date).toDateString()
      );
    },
    renameTitleModalBox(index) {
      this.selectedIndex = index;
      this.currentTitle = this.forms[index].title;
      this.renameFormModal = true;
      this.isModalActive = true;
    },
    createFormModalBox() {
      this.createFormModal = true;
      this.isModalActive = true;
    },
    renameFormTitle(){
      if(this.currentTitle == this.forms[this.selectedIndex].title)
        this.displayToast("warning","The Form Title is already "+ this.currentTitle)
      else{
        this.forms[this.selectedIndex].title = this.currentTitle;
        this.displayToast("success","The Form Title has Been Changed")
      }
    },
    deleteForm(index){
      this.forms.splice(index,1);
    },
    onContextMenu(e, index) {
      e.preventDefault();
      this.$contextmenu({
        x: e.x,
        y: e.y,
        items: [
          {
            label: "Rename",
            onClick: () => {
              this.renameTitleModalBox(index);
            },
          },
          {
            label: "Delete",
            onClick: () => {
               this.deleteForm(index);
            },
          },
        ],
      });
    },
  },
};
</script>
