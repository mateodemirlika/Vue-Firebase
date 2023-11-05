<template>
  <div class="car p-4 mb-5" :class="`has-background-${bgColor}-dark`">
    <label v-if="label" class="label has-text-white">{{ label }}</label>
    <div class="field">
      <div class="control">
        <textarea
          v-model="modelValue"
          @input="$emit('update:modelValue', modelValue)"
          class="textarea"
          :placeholder="placeholder"
          ref="texareaRef"
          v-autofocus=""
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import {vAutofocus} from '@/directives/vAutofocus'
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "success",
  },
  placeholder: {
    type: String,
    default: "Type something...",
  },
  label: {
    type: String,
  },
});

let modelValue = props.modelValue;
/*
emit
*/
const emit = defineEmits(["update:modelValue"]);
/*
focusTextarea
*/
const texareaRef = ref(null);
const focusTextarea = () => {
  modelValue = "";
  texareaRef.value.focus();
};
defineExpose({
  focusTextarea,
});



</script>
