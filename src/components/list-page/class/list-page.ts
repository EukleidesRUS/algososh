import { ElementStates } from "../../../types/element-states";
import { ILinkedList } from "../../../types/list";

export class Node<T> {
  element: T;
  next: Node<T> | null;

  constructor(item: T, next: Node<T> | null = null) {
    this.element = item;
    this.next = next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  array: Node<T | any>[] = [];
  head: Node<T> | null = null;
  tail: Node<T> | null = null;

  constructor(items: T[]) {
    items.forEach((item) => {
      this.append(item);
    });
  }

  append(item: T) {
    const node = new Node<T>(item);
    this.array.push(node);
    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  prepend(item: T) {
    const node = new Node(item);
    this.array.unshift(node);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
  }

  addByIndex(index: number, item: T) {
    const node = new Node(item);
    if (this.array[index] === this.head) {
      node.next = this.head;
      this.head = node;
    }

    this.array.splice(index, 0, node);
  }

  deleteHead() {
    if (!this.head || this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.array = [];
    } else {
      this.head = this.head?.next;
      this.array.shift();
    }
  }

  deleteTail() {
    if (!this.head || this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.array = [];
    } else {
      let current = this.head;
      while (current.next) {
        if (!current.next.next) {
          current.next = null;
        } else {
          current = current.next;
        }
      }
      this.tail = current;
      this.array.pop();
    }
  }

  deleteByIndex(index: number) {
    if (!this.head || this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.array = [];
      return;
    }

    if (this.array[index] === this.head) {
      this.deleteHead();
    } else if (this.array[index] === this.tail) {
      this.deleteTail();
    } else {
      this.array.splice(index, 1);
    }
  }

  changeState(index: number, state: ElementStates) {
    this.array[index].element.state = state;
  }

  changeValue(index: number, value: string = "") {
      this.array[index].element.value = value;
  }

  getData() {
    const array = this.array;
    const tail = this.tail;
    const head = this.head;
    return { array, tail, head };
  }
}
