<template>
  <div
    class="flex flex-col questionpage snap-center rounded justify-center items-center mt-10 m-auto"
  >
    <h1 class="text-3xl break-all overflow-auto hidescroll">{{pages[selectedpage].question}}{{isRequired()}}</h1>
    <input
      disabled
      class="w-3/5 questionInput"
      v-if="pages[selectedpage].pageType == 'Small Text'"
    />
    <textarea
      disabled
      class="w-3/5 questionTextinput rounded resize-none"
      v-else-if="pages[selectedpage].pageType == 'Large Text'"
    ></textarea>
    <div
      class="flex flex-col overflow-y-auto hidescroll"
      v-else-if="pages[selectedpage].pageType == 'Check Box'"
    >
      <div v-for="(choice, index) in pages[selectedpage].choices" :key="choice + index">
        <input disabled type="checkbox" />
        <label class="overflow-auto hidescroll break-all">{{ choice }}</label>
      </div>
    </div>
    <div
      class="flex flex-col overflow-y-auto hidescroll"
      v-else-if="pages[selectedpage].pageType == 'Radio Button'"
    >
      <div v-for="(choice, index) in pages[selectedpage].choices" :key="choice + index">
        <input disabled id="rb1" type="radio" name="radiogrp" />
        <label class="overflow-auto hidescroll break-all">{{ choice }}</label>
      </div>
    </div>
    <input disabled id="date" type="date" v-else-if="pages[selectedpage].pageType == 'Date'" />
    <input
      disabled
      id="file"
      class="w-3/5 fileinput rounded"
      type="file"
      v-else-if="pages[selectedpage].pageType == 'File'"
    />
  </div>
</template>
<script>
export default {
  name :"FormPageFormBuilder",
  props: ["pages", "selectedpage"],
  methods : {
    isRequired(){
        return this.pages[this.selectedpage].isRequired?"*":"";
      }
  }
};
</script>
