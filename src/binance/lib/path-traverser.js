import { indexToKey } from './merkle-tree.js';

export class PathTraverser {
  constructor(prefix, storage, zero_values) {
    this.prefix = prefix;
    this.storage = storage;
    this.zero_values = zero_values;
    this.path_elements = [];
    this.path_index = [];
  }

  async handle_index(level, element_index, sibling_index) {
    const sibling = await this.storage.getOrElement(
      indexToKey(this.prefix, level, sibling_index),
      this.zero_values[level],
    );
    this.path_elements.push(sibling);
    this.path_index.push(element_index % 2);
  }
}
