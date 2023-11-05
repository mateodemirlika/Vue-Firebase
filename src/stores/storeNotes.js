// stores/counter.js
import { defineStore } from "pinia";
import { db } from "@/js/firebase";
import { useStoreAuth } from "@/stores/storeAuth";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";

let notesCollectionRef;
let notesCollectionQuery;
let getNotesSnapshot = null;
export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [],
      notesLoaded: false,
    };
  },
  actions: {
    async getNotes() {
      this.notesLoaded = false;
      if(getNotesSnapshot) getNotesSnapshot()
      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          };
          notes.push(note);
        });
        this.notes = notes;
        this.notesLoaded = true;
      });
    },
    clearNotes() {
      this.notes = [];
      if(getNotesSnapshot) getNotesSnapshot()

    },
    init() {
      const storeAuth = useStoreAuth();
      console.log(storeAuth.user);
      notesCollectionRef = collection(db, "users", storeAuth.user.id, "notes");
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
      this.getNotes();
    },
    async addNote(content) {
      let currentDate = new Date().getTime();
      let date = currentDate.toString();

      await addDoc(notesCollectionRef, {
        content: content,
        date: date,
      });
    },

    async deleteNote(id) {
      await deleteDoc(doc(notesCollectionRef, id));
    },
    async updateNote(id, content) {
      const washingtonRef = doc(notesCollectionRef, id);

      await updateDoc(washingtonRef, {
        content,
      });
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter((note) => {
          return note.id === id;
        })[0].content;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach((note) => {
        count += note.content.length;
      });
      return count;
    },
  },
});
