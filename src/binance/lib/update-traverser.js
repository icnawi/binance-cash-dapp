import { indexToKey } from './merkle-tree.js';

export class UpdateTraverser {
  constructor(prefix, storage, hasher, element, zero_values) {
    this.prefix = prefix;
    this.current_element = element;
    this.zero_values = zero_values;
    this.storage = storage;
    this.hasher = hasher;
    this.key_values_to_put = [];
  }

  async handle_index(level, element_index, sibling_index) {
    if (level === 0) {
      this.original_element = await this.storage.getOrElement(
        indexToKey(this.prefix, level, element_index),
        this.zero_values[level],
      );
    }
    const sibling = await this.storage.getOrElement(
      indexToKey(this.prefix, level, sibling_index),
      this.zero_values[level],
    );
    let left, right;
    if (element_index % 2 === 0) {
      left = this.current_element;
      right = sibling;
    } else {
      left = sibling;
      right = this.current_element;
    }

    this.key_values_to_put.push({
      key: indexToKey(this.prefix, level, element_index),
      value: this.current_element,
    });
    this.current_element = this.hasher.hash(level, left, right);
  }
}
