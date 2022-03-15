<template>
  <div
    class="flex flex-col questionpagepreview snap-center rounded justify-center items-center m-auto"
  >
    <h1 class="text-3xl break-all overflow-auto hidescroll">{{page.question}}</h1>
    <input
      disabled
      class="w-3/5 questionInput"
      v-if="page.pageType == 'Small Text'"
    />
    <textarea
      disabled
      class="w-3/5 questionTextinput rounded resize-none"
      v-else-if="page.pageType == 'Large Text'"
    ></textarea>
    <div
      class="flex flex-col overflow-y-auto hidescroll"
      v-else-if="page.pageType == 'Check Box'"
    >
      <div v-for="(choice, index) in page.choices" :key="choice + index">
        <input disabled type="checkbox" />
        <label class="overflow-auto hidescroll break-all">{{ choice }}</label>
      </div>
    </div>
    <div
      class="flex flex-col overflow-y-auto hidescroll"
      v-else-if="page.pageType == 'Radio Button'"
    >
      <div v-for="(choice, index) in page.choices" :key="choice + index">
        <input disabled id="rb1" type="radio" name="radiogrp" />
        <label class="overflow-auto hidescroll break-all">{{ choice }}</label>
      </div>
    </div>
    <input disabled id="date" type="date" v-else-if="page.pageType == 'Date'" />
    <input
      disabled
      id="file"
      class="w-3/5 fileinput rounded hidden"
      type="file"
      v-else-if="page.pageType == 'File'"
    />
    <button type="submit" class="buttonalt rounded p-1 m-4 growAnimation" v-if="isLastPage">Submit</button>
    <button type="button" class="buttonalt rounded p-1 m-4 growAnimation" v-else @click="goToNext($event)">Next</button>
  </div>
</template>
<script>
export default {
  props: ["page","isLastPage"],
  methods :{
      goToNext(event){
        event.target.parentElement.parentElement.nextSibling.firstChild.scrollIntoView({behavior: "smooth"})
      }
  }
};
</script>
