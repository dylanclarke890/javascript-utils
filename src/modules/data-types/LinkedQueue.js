class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Push a value on the end.
   * @param {*} data the data to push.
   */
  enqueue(data) {
    const tmp = new Node(data);
    tmp.data = data;
    tmp.next = null;
    this.length++;
    if (this.head == null) {
      this.tail = this.head = tmp;
      return;
    }
    this.tail.next = tmp;
    this.tail = this.tail.next;
  }

  /**
   * Push an array of values on the end.
   * @param {*} data the array to push.
   */
  enqueueAll(list) {
    for (var i = 0; i < list.length; i++) this.enqueue(list[i]);
  }

  /**
   * Remove a value off the beginning.
   * @returns The removed value.
   */
  dequeue() {
    if (this.head == null) return null;
    this.length--;
    const data = this.head.data;
    const tmp = this.head;
    this.head = this.head.next;
    if (this.head == null) this.tail = null;
    tmp.next = null;
    return data;
  }

  /**
   * Remove all values off the beginning.
   * @param {Function} fn Each dequeued value will be called by fn(data) after dequeueing.
   */
  dequeueAll(fn) {
    while (this.head != null) fn(this.dequeue());
  }

  /**
   * Read the value at the beginning without removing it.
   */
  first() {
    return this.head != null ? this.head.data : null;
  }

  /**
   * Read the value at the end without removing it.
   */
  last() {
    return this.tail != null ? this.tail.data : null;
  }

  /**
   * @returns False if this contains no items.
   */
  isEmpty() {
    return this.length === 0;
  }

  /**
   * @returns Removes all entries.
   */
  clear() {
    if (this.head == null) return;
    let tmp = null;
    while (this.head != null) {
      tmp = this.head;
      this.head = this.head.next;
      tmp.next = null;
      this.length--;
    }
    this.tail = null;
  }

  forEach(fn) {
    let tmp = this.head;
    while (tmp != null) {
      fn(tmp.data);
      tmp = tmp.next;
    }
  }
}
