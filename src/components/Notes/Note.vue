<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ props.note.content }}
        <div class="columns is-mobile has-text-grey-light">
          <small class="column">Date: {{ dateFormatted }}</small>
          <small class="column has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink class="card-footer-item" :to="`/editNote/${note.id}`"
        >Edit</RouterLink
      >
      <a
        href="#"
        class="card-footer-item"
        @click.prevent="modals.deleteNote = true"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="props.note.id"
    />
  </div>
</template>
<script setup>
import { computed, reactive } from "vue";
import { useStoreNotes } from "@/stores/storeNotes";
import ModalDeleteNote from "@/components/Notes/ModalDeleteNote.vue";
import { useDateFormat } from "@vueuse/core";
const storeNotes = useStoreNotes();

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date));
  let formated = useDateFormat(date, "MM-DD-YYYY @ HH:mm:ss");
  return formated.value;
});

const characterLength = computed(() => {
  if (props.note && props.note.content) {
    let description =
      props.note.content.length > 1 ? "characters" : "character";
    return `${props.note.content.length} ${description}`;
  }
});

const modals = reactive({
  deleteNote: false,
});
</script>
