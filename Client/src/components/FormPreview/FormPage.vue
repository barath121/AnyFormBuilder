<template>
  <div
    class="flex flex-col questionpagepreview snap-center rounded justify-center items-center m-auto"
  >
    <h1 class="text-3xl break-all overflow-auto hidescroll">{{page.question}}{{isRequired()}}</h1>
    <input
      disabled
      class="w-3/5 questionInput"
      v-if="page.pageType == 'Small Text'"
      :name="page.fieldName"
      :pattern="page.regex"
      :maxlength="page.maxCharacters"
    />
    <textarea
      disabled
      class="w-3/5 questionTextinput rounded resize-none"
      v-else-if="page.pageType == 'Large Text'"
      :name="page.fieldName"
      :maxlength="page.maxCharacters"
    ></textarea>
    <div
      class="flex flex-col overflow-y-auto hidescroll"
      v-else-if="page.pageType == 'Check Box'"
    >
      <div v-for="(choice, index) in page.choices" :key="choice + index">
        <input disabled type="checkbox" :name="page.fieldName" :value="choice"/>
        <label class="overflow-auto hidescroll break-all">{{ choice }}</label>
      </div>
    </div>
    <div
      class="flex flex-col overflow-y-auto hidescroll"
      v-else-if="page.pageType == 'Radio Button'"
    >
      <div v-for="(choice, index) in page.choices" :key="choice + index">
        <input disabled id="rb1" type="radio" :name="page.fieldName" :value="choice"/>
        <label class="overflow-auto hidescroll break-all">{{ choice }}</label>
      </div>
    </div>
    <input disabled id="date" type="date" v-else-if="page.pageType == 'Date'" :name="page.fieldName"/>
    <input
      disabled
      id="file"
      class="w-3/5 fileinput rounded hidden"
      type="file"
      v-else-if="page.pageType == 'File'"
      :name="page.fieldName"
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
      },
      isRequired(){
        return this.page.isRequired?"*":"";
      }
  }
};
</script>
