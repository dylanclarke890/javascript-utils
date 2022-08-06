export * from "./DeferredPromise";
export * from "./LinkedQueue";
export * from "./StringBuilder";

import {
  ImmutableLinkedOrderedMap,
  ImmutableLinkedOrderedMapMode,
} from "./src/modules/data-types/ILOM/ImmutableLinkedOrderedMap";
import {
  map,
  lazyMap,
  lazyMapFactory,
} from "./src/modules/data-types/ILOM/shortcuts";

[
  ["lazyMap", lazyMap],
  ["map", map],
  ["lazyMapFactory", lazyMapFactory],
].map(([key, value]) => (ImmutableLinkedOrderedMap[key] = value));
export {
  ImmutableLinkedOrderedMap,
  ImmutableLinkedOrderedMapMode,
  lazyMap,
  lazyMapFactory,
};