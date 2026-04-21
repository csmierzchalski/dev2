public class PriorityQueue implements IPriorityQueue {
    class Node {
        int priority;
        Node next;

        Node(int priority) {
            this.priority = priority;
            this.next = null;
        }
    } // Node

    private Node front;
    private Node dummyTrailer;

    public PriorityQueue() {
        dummyTrailer = new Node(Integer.MAX_VALUE);
        front = dummyTrailer;
    }

    // add element to correct position in a list
    // ordered on ascending priority
    // low numbers mean high priority
    public void enqueue(int priority) {
        Node newNode = new Node(priority);

        if (front == dummyTrailer || priority < front.priority) {
            newNode.next = front;
            front = newNode;
            return;
        }

        Node prev = front;
        Node current = front.next;

        // Insert after existing nodes with <= priority to keep stable order.
        while (current != null && current.priority <= priority) {
            prev = current;
            current = current.next;
        }

        newNode.next = current;
        prev.next = newNode;
    }

    // remove and return the element at the front of the queue.
    // assume queue not empty - use suitable assertion
    public int dequeue() {
        assert front != dummyTrailer : "Queue is empty";

        int result = front.priority;
        front = front.next;
        return result;
    }

    // return the number of elements in the queue
    public int getSize() {
        int size = 0;
        Node current = front;
        while (current != dummyTrailer) {
            size++;
            current = current.next;
        }
        return size;
    }

    // display the queue to System.out
    public void display() {
        Node current = front;
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        while (current != dummyTrailer) {
            sb.append(current.priority);
            current = current.next;
            if (current != dummyTrailer) {
                sb.append(", ");
            }
        }
        sb.append("]");
        System.out.println(sb.toString());
    }
}
