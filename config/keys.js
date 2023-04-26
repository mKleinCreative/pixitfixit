import * as production from "./prod.js";
import * as development from "./dev.js";

let accessString;

if (process.env.NODE_ENV === "production") {
  accessString = production;
} else {
  accessString = development;
}

export default accessString;
