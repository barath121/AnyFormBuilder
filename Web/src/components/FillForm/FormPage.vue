<template>
  <div
    class="flex flex-col questionpagepreview leafbackground snap-center rounded justify-center items-center m-auto"
  >
    <h1 class="text-3xl break-all overflow-auto hidescroll mb-6">{{page.question}}{{isRequired()}}</h1>
    <input
      class="w-3/5 questionInput mb-4"
      v-if="page.pageType == 'Small Text'"
      :name="page.fieldName"
      :maxlength="page.maxCharacters"
      :id="page.fieldName"
      :required="page.isRequired"
    />
    <textarea
      class="w-3/5 questionTextinput rounded resize-none p-2 mb-4"
      v-else-if="page.pageType == 'Large Text'"
      :name="page.fieldName"
      :maxlength="page.maxCharacters"
      :id="page.fieldName"
      :required="page.isRequired"
    ></textarea>
    <div
      class="flex flex-col overflow-y-auto hidescroll"
      v-else-if="page.pageType == 'Check Box'"
    >
      <div v-for="(choice, index) in page.choices" :key="choice + index" class="p-1">
       <input  type="checkbox" :name="page.fieldName" :value="choice" :id="page.fieldName+index"/>
        <label class="overflow-auto hidescroll break-all">{{ choice }}</label>
      </div>
    </div>
    <div
      class="flex flex-col overflow-y-auto hidescroll"
      v-else-if="page.pageType == 'Radio Button'"
    >
      <div v-for="(choice, index) in page.choices" :key="choice + index" class="p-1">
        <input  type="radio" :name="page.fieldName" :value="choice" :id="page.fieldName+index" v-if="index==0"  :required="page.isRequired"/>
        <input  type="radio" :name="page.fieldName"  :value="choice" :id="page.fieldName+index" v-else/>
        <label class="overflow-auto hidescroll break-all">{{ choice }}</label>
      </div>
    </div>
    <input type="date" v-else-if="page.pageType == 'Date'" :name="page.fieldName" :id="page.fieldName" :required="page.isRequired" class="mb-4"/>
    <input
      class="w-3/5 fileinput rounded mb-4"
      type="file"
      v-else-if="page.pageType == 'File'"
      :name="page.fieldName"
      :id="page.fieldName"
      :required="page.isRequired"
    />
    <button type="submit" class="buttonalt rounded  m-4 growAnimation" v-if="isLastPage" >Submit</button>
    <button type="button" class="buttonalt rounded  m-4 growAnimation" v-else @click="goToNext($event)">Next</button>
  </div>
</template>
<script>
export default {
	name : 'FormPage',
	props: ['page','isLastPage','formFilled'],
	methods :{
		goToNext(event){
			event.target.parentElement.parentElement.nextSibling.firstChild.scrollIntoView({behavior: 'smooth'})
		},
		isRequired(){
			return this.page.isRequired?'*':''
		}
	}
}
</script>
