import { defineStore } from "pinia";
import { auth } from "@/js/firebase";
import { useStoreNotes } from "@/stores/storeNotes";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      user: {},
    };
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push("/");
          storeNotes.init();
        } else {
          this.user = {};
          this.router.replace("/auth");
          storeNotes.clearNotes();
        }
      });
    },
    registerUser(credintials) {
      createUserWithEmailAndPassword(
        auth,
        credintials.email,
        credintials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          //   console.log("error.message: ", error.message);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          //   console.log("signed out");
        })
        .catch((error) => {
          // An error happened.
          //   console.log("signed out error: " + error);
        });
    },
    loginUser(credintials) {
      signInWithEmailAndPassword(auth, credintials.email, credintials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          //   console.log("user " + user);
        })
        .catch((error) => {
          //   console.log("error " + error);
        });
    },
  },
});
