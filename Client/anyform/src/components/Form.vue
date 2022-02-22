<script setup>
import FormNav from "./FormNav.vue";
import FormPagesContainer from "./FormPagesContainer.vue";
import FormOptions from "./FormOptions.vue";
import FormPreview from "./FormPreview.vue";
</script>
<template>
    <div class="flex flex-col h-screen">
        <FormNav/>
        <div class="flex flex-row h-full ">
            <FormPreview/>
            <FormPagesContainer/>
            <FormOptions/>
        </div>
    </div>
    </template>
