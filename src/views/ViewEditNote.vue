<template>
  <div class="edit-note">
    <h1>Edit Notew with an id of: {{ $route.params.id }}</h1>
    <AddEditNote
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="link"
      label="Edit note"
      placeholder="Edit note"
    >
      <template #buttons>
        <button @click="$router.back()" class="button is-link is-light">
          Cancel
        </button>
        <button
          @click="handleSaveClicked"
          :disabled="!noteContent"
          class="button is-link has-background-success"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>
<script setup>
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const router = useRouter();
const storeNotes = useStoreNotes();
const noteContent = ref("");
noteContent.value = storeNotes.getNoteContent(route.params.id);

const handleSaveClicked = () => {
  storeNotes.updateNote(route.params.id, noteContent.value);
  router.push("/");
};
</script>
