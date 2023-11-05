<template>
  <div class="stats">
    <h1>Stats</h1>
    <table class="table is-full-width">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of characters of all notes</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-autofocus
      class="input"
      type="text"
      placeholder="Do you have noteballs !!"
      v-model="loveNoteballs"
    />
  </div>
</template>
<script setup>
import { useStoreNotes } from "@/stores/storeNotes";
import { vAutofocus } from "@/directives/vAutofocus";
import { useWatchCharacters } from "@/use/useWatchCharacters";
import { ref } from "vue";

const storeNotes = useStoreNotes();
const loveNoteballs =ref('')
useWatchCharacters(loveNoteballs,50)
</script>
