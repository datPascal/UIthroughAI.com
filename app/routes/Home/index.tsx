import NewUI from "./newUI";
import type {
  MetaFunction,
} from "@remix-run/node";


export const meta: MetaFunction = () => {
  return { title: "Homescreen Therapyflow" };
};

export default function index() {

  return (
    <NewUI></NewUI>
  );
}