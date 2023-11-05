<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      ref="addEditNoteRef"
      placeholder="Add a new note"
    >
      <template #buttons>
        <button
          :disabled="!newNote"
          class="button is-link has-background-success"
          @click="addNote"
        >
          Add New Note
        </button>
      </template>
    </AddEditNote>
    <progress
      v-if="!storeNotes.notesLoaded"
      class="progress is-large is-success"
      max="100"
    />

    <template v-else>
      <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
      <div
        v-if="!storeNotes.notes.length"
        class="is-size-4 has-text-centered has-text-grey-right is-family-monospace"
      >
        No notes here yet...
      </div>
    </template>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import Note from "@/components/Notes/Note.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useWatchCharacters } from "@/use/useWatchCharacters";
const newNote = ref("");
const newNoteRef = ref(null);
const storeNotes = useStoreNotes();
const addEditNoteRef = ref(null);
const addNote = () => {
  storeNotes.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value.focusTextarea();
};
// onMounted(() => {
//   storeNotes.init();
// });
useWatchCharacters(newNote, 50);
</script>
