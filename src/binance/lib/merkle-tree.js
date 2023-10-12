import { MimcSpongeHasher } from './mimc.js';
import { PathTraverser } from './path-traverser.js';
import { JsStorage } from './storage.js';
import { UpdateTraverser } from './update-traverser.js';

export function indexToKey(prefix, level, index) {
  return `${prefix}_tree_${level}_${index}`;
}

export class MerkleTree {
  constructor(n_levels, defaultElements, prefix, storage, hasher) {
    this.prefix = prefix;
    this.storage = storage || new JsStorage();
    this.hasher = hasher || new MimcSpongeHasher();
    this.n_levels = n_levels;
    this.zero_values = [];
    this.totalElements = 0;

    let current_zero_value =
      '21663839004416932945382355908790599225266501822907911457504978515578255421292';
    this.zero_values.push(current_zero_value);
    for (let i = 0; i < n_levels; i++) {
      current_zero_value = this.hasher.hash(i, current_zero_value, current_zero_value);
      this.zero_values.push(current_zero_value.toString());
    }
    if (defaultElements) {
      let level = 0;
      this.totalElements = defaultElements.length;
      defaultElements.forEach((element, i) => {
        this.storage.put(indexToKey(prefix, level, i), element);
      });
      level++;
      let numberOfElementsInLevel = Math.ceil(defaultElements.length / 2);
      for (level; level <= this.n_levels; level++) {
        for (let i = 0; i < numberOfElementsInLevel; i++) {
          const leftKey = indexToKey(prefix, level - 1, 2 * i);
          const rightKey = indexToKey(prefix, level - 1, 2 * i + 1);

          const left = this.storage.get(leftKey);
          const right = this.storage.getOrElement(rightKey, this.zero_values[level - 1]);

          const subRoot = this.hasher.hash(null, left, right);
          this.storage.put(indexToKey(prefix, level, i), subRoot);
        }
        numberOfElementsInLevel = Math.ceil(numberOfElementsInLevel / 2);
      }
    }
  }

  async root() {
    return await this.storage.getOrElement(
      indexToKey(this.prefix, this.n_levels, 0),
      this.zero_values[this.n_levels],
    );
  }

  async path(index) {
    index = Number(index);
    let traverser = new PathTraverser(this.prefix, this.storage, this.zero_values);
    const root = await this.storage.getOrElement(
      indexToKey(this.prefix, this.n_levels, 0),
      this.zero_values[this.n_levels],
    );

    const element = await this.storage.getOrElement(
      indexToKey(this.prefix, 0, index),
      this.zero_values[0],
    );

    await this.traverse(index, traverser);
    return {
      root,
      pathElements: traverser.path_elements,
      pathIndex: traverser.path_index,
      element,
    };
  }

  async update(index, element, insert = false) {
    if (!insert && index >= this.totalElements) {
      throw Error('Use insert method for new elements.');
    } else if (insert && index < this.totalElements) {
      throw Error('Use update method for existing elements.');
    }
    try {
      let traverser = new UpdateTraverser(
        this.prefix,
        this.storage,
        this.hasher,
        element,
        this.zero_values,
      );

      await this.traverse(index, traverser);
      traverser.key_values_to_put.push({
        key: indexToKey(this.prefix, this.n_levels, 0),
        value: traverser.current_element,
      });

      await this.storage.putBatch(traverser.key_values_to_put);
    } catch (e) {
      console.error(e);
    }
  }

  async insert(element) {
    const index = this.totalElements;
    await this.update(index, element, true);
    this.totalElements++;
  }

  async traverse(index, handler) {
    let current_index = index;
    for (let i = 0; i < this.n_levels; i++) {
      let sibling_index = current_index;
      if (current_index % 2 === 0) {
        sibling_index += 1;
      } else {
        sibling_index -= 1;
      }
      await handler.handle_index(i, current_index, sibling_index);
      current_index = Math.floor(current_index / 2);
    }
  }

  getIndexByElement(element) {
    for (let i = this.totalElements - 1; i >= 0; i--) {
      const elementFromTree = this.storage.get(indexToKey(this.prefix, 0, i));
      if (elementFromTree === element) {
        return i;
      }
    }
    return false;
  }
}
