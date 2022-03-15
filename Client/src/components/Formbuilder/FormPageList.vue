<template>
    <div class="flex flex-row borderBottom">
      <div class="flex flex-row">
        <div class="divpreview">
          <div class="h-60 w-64 rounded questionpage snap-center">
            <div
              class="flex flex-col h-full rounded justify-center items-center"
            >
              <h1 class="break-all overflow-auto">{{page.question}}</h1>
              <input  class="w-3/5 questionInput" disabled v-if="page.pageType=='Small Text'"/>
              <textarea
                disabled
                class="w-3/5 questionTextinput rounded resize-none"
                v-else-if="page.pageType=='Large Text'"
              ></textarea>
              <div 
                class="flex flex-col overflow-y-auto hidescroll"
                v-else-if="page.pageType=='Check Box'">
                <div v-for="(choice,index) in page.choices" :key="choice+index">
                  <input disabled type="checkbox" />
                  <label>{{choice}}</label>
                </div>
              </div>
              <div 
                class="flex flex-col overflow-y-auto hidescroll"
                v-else-if="page.pageType=='Radio Button'">
                <div v-for="(choice,index) in page.choices" :key="choice+index">
                  <input disabled id="rb1" type="radio" name="radiogrp" />
                  <label for="rb1">{{choice}}</label>
                </div>
              </div>
              <input disabled id="date" type="date" v-else-if="page.pageType=='Date'" />
              <input
                disabled
                id="file"
                class="w-3/5 fileinput rounded"
                type="file"
                v-else-if="page.pageType=='File'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    name :"FormPageList",
    props: ['page'],
  }
</script>