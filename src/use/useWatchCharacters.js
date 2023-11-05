import { watch } from "vue";

export function useWatchCharacters(value,maxChars) {
  watch(value, (newValue) => {
    if (newValue.length === maxChars) {
      alert(`Only ${maxChars} characters alowed gosh darnit!!`);
    }
  });
}
