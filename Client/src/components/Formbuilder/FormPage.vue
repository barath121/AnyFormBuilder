<template>
  <div class="flex flex-col questionpage snap-center rounded justify-center items-center mt-10 m-auto">
    <h1 class="text-3xl">What is the question?</h1>
    <input disabled class="w-3/5 questionInput hidden" />
    <textarea
      disabled
      class="w-3/5 questionTextinput rounded resize-none hidden"
    ></textarea>
    <div class="flex flex-col overflow-y-auto hidescroll hidden">
      <div>
        <input disabled id="cb1" type="checkbox" />
        <label for="cb1">Option 1</label>
      </div>
      <div>
        <input disabled id="cb2" type="checkbox" />
        <label for="cb2">Option 2</label>
      </div>
      <div>
        <input disabled id="cb3" type="checkbox" />
        <label for="cb3">Option 3</label>
      </div>
      <div>
        <input disabled id="cb4" type="checkbox" />
        <label for="cb4">Option 4</label>
      </div>
    </div>
    <div class="flex flex-col overflow-y-auto hidescroll hidden">
      <div>
        <input disabled id="rb1" type="radio" name="radiogrp" />
        <label for="rb1">Option 1</label>
      </div>
      <div>
        <input disabled id="rb2" type="radio" name="radiogrp" />
        <label for="rb2">Option 2</label>
      </div>
      <div>
        <input disabled id="rb3" type="radio" name="radiogrp" />
        <label for="rb3">Option 3</label>
      </div>
      <div>
        <input disabled id="rb4" type="radio" name="radiogrp" />
        <label for="rb4">Option 4</label>
      </div>
    </div>
    <input disabled id="date" type="date" class="hidden" />
    <input
      disabled
      id="file"
      class="w-3/5 fileinput rounded hidden"
      type="file"
    />
  </div>
</template>
