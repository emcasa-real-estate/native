export default class OperationQueue {
  queue = []

  enqueue(entry) {
    this.queue.push(entry)
  }

  dispatch() {
    this.queue.forEach(({operation, forward, observer}) => {
      operation.setContext({queue: this})
      forward(operation).subscribe(observer)
    })
    this.queue = []
  }
}
