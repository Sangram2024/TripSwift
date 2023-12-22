import axios from "axios";
import { store } from "./../redux/store";

export async function fetchProperties() {
  const { accessToken } = store.getState().authReducer;

  console.log({ accessToken });

  const { data } = await axios.get("http://localhost:8040/api/v1/property/me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const { properties, draftProperties } = data.data;

  return { properties, draftProperties };
}
