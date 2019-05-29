/* "The will to win means nothing without the will to prepare." - Juma Ikangaa, marathoner */

/* Preparation material ->  http://cslibrary.stanford.edu/ */

/*
 * All of the linked list code in this implementation uses the "classic" singly linked list structure.
 * A single head pointer points to the first node in the list.
 * Each node contains a single .next pointer to the next node.
 * The .next pointer of the last node is NULL.
 * The empty list is represented by a NULL head pointer.
 * All of the nodes are allocated in the heap.
 */

#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

struct node {
  int data;
  struct node* next;
};

int length(struct node* head) {
  int count = 0;
  struct node* current = head;

  while (current != NULL) {
    count++;
    current = current->next;
  }

  return count;
}

/* Takes a list and a data value.
 * Creates a new link with the given data and pushes
 * it onto the front of the list.
 * The list is not passed in by its head pointer.
 * Instead the list is passed in as a "reference" pointer
 * to the head pointer -- this allows us
 * to modify the caller's memory.
 */

void push(struct node** head_ref, int data) {
  struct node* new_node = malloc(sizeof(struct node));

  new_node->data = data;
  new_node->next = *head_ref; // The '*' to dereferences back to the real head

  *head_ref = new_node;
}

/* Given a list and an int, return the number of times that int occurs
 * in the list.
 */
int count(struct node* head, int data) {
  struct node* current = head;

  int count = 0;

  while (current != NULL) {
    if (current->data == data) {
      count++;
    }
    current = current->next;
  }

  return count;
}

/* GetNth() function that takes a linked list and an integer index and returns the data
 * value stored in the node at that index position. GetNth() uses the C numbering convention
 * that the first node is index 0, the second is index 1, ... and so on. So for the list 
 * {42, 13, 666} GetNth() with index 1 should return 13. The index should be in the range [0..length1].
 * If it is not, GetNth() should assert() fail . */ 

int getNth(struct node *head, int idx) {
  struct node* current = head; 
  int pos = 0;

  while (current != NULL) {
    if (pos == idx) {
      return current->data;
    }
    pos++;
    current = current->next;
  }
  return 0;
}

/* DeleteList() just needs to call free() once for each node and
 * set the head pointer to NULL.
 */
void deleteList(struct node** head_ref) {
  struct node* current = *head_ref; // deref head_ref to get the real head
  struct node* next;

  //  careful not to access the .next field in each node after
  //  the node has been deallocated.
  while (current != NULL) {
    next = current->next;
    free(current);
    current = next;
  }

  *head_ref = NULL; // Again, deref headRef to affect the real head back
  // in the caller.
}

/* The opposite of Push(). Takes a non-empty list
 * and removes the front node, and returns the data
 * which was in that node.
 */
int pop(struct node** head_ref) {
  /* Implementation taken from practice material */
  struct node* head;
  int result;
  head = *head_ref;

  /* If expression evaluates to 0 (false), then the expression, sourcecode filename, 
   * and line number are sent to the standard error, and then abort() function is called.
   */
  assert(head != NULL);

  result = head->data; // pull out the data before the node is deleted
  *head_ref = head->next; // unlink the head node for the caller
  // Note the * -- uses a reference-pointer
  // just like Push() and DeleteList().
  
  free(head); // free the head node
  return(result); // don't forget to return the data from the link

  
  /* My implementation */
  //struct node* pfree_el = *head_ref;
  //*head_ref = (*head_ref)->next;
  //int pop_data = pfree_el->data;
  //free(pfree_el);
  //return pop_data;
}

void insertNth(struct node** head_ref, int idx, int data) {

  /* delegate to push, if insertion at head (index == 0) */
  if (idx == 0) {
    push(head_ref, data); 
  } else {
    struct node* current = *head_ref;
    int pos = 0;

    while (pos < idx - 1) {
      assert(current != NULL); // if this fails, index was too big
      current = current->next;
      pos++;
    }

    assert(current != NULL); // tricky: you have to check one last time

    // Tricky use of push() --
    // The pointer being pushed on is not in the stack. But actually this works
    // fine -- push() works for any node pointer.
    push(&(current->next), data);
  }
}

void print(struct node* head) {
  struct node* current = head;

  while (current != NULL) {
    printf("%d -> ", current->data);
    current = current->next;
  }
}

int main() {
  struct node* head = NULL;

  push(&head, 4);
  push(&head, 2);
  push(&head, 8);

  print(head);

  printf("key 2 occurs %d times in the list\n", count(head, 2));

  int nth_val = getNth(head, -2);
  if (nth_val) {
    printf("Nth value : %d\n", nth_val);
  } else {
    printf("Position does not exist\n");
  }

  //deleteList(&head);
  //if (!head) {
  //  printf("Delete List routine successful\n");
  //} else {
  //  printf("Delete List routine unsuccessful\n");
  //}

  printf("Popped element value is %d\nNew head set to %d\n", pop(&head), head->data);

  insertNth(&head, 0, 22);
  print(head); 

  return 0;
}
