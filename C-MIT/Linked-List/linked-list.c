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


void appendNode(struct node** head_ref, int data) {
  if (*head_ref == NULL) {
    push(head_ref, data);
  } else {
    struct node* new_node = malloc(sizeof(struct node));
    struct node* current = *head_ref;

    while (current->next != NULL) {
      current = current->next;
    }

    new_node->data = data;
    new_node->next = current->next; // essentially set to NULL
    current->next = new_node;
  }
}


void append(struct node** list_a_ref, struct node ** list_b_ref) {
  if (*list_a_ref == NULL) {
    *list_a_ref = *list_b_ref;
  } else {
    struct node* current = *list_a_ref;
    while (current->next != NULL) {
      current = current->next;
    }
    
    current->next = *list_b_ref;
  }

  *list_b_ref = NULL;
}


//void sortedInsert(struct node** head_ref, struct node* new_node) {
//
//  if (*head_ref == NULL || (*head_ref)->data >= new_node->data) {
//    new_node->next = *head_ref;
//    *head_ref = new_node;
//  } else {
//    struct node* current = *head_ref;
//
//    while (current->next != NULL && current->next->data < new_node->data) {
//      current = current->next;
//    }
//
//    new_node->next = current->next;
//    current->next = new_node;
//  }
//}


void sortedInsert(struct node** head_ref, int data) {

  // Special case for the head end
  if (*head_ref == NULL || (*head_ref)->data >= data) {
    push(head_ref, data);
  } else {
    struct node* current = *head_ref;

    // Locate the node before the point of insertion
    while (current->next != NULL && current->next->data < data) {
      current = current->next;
    }

    // The pointer being pushed on is not in the stack. But actually this works
    // fine -- push() works for any node pointer.
    push(&(current->next), data);
  }
}


void insertSort(struct node** head_ref) {
  struct node* result = NULL;
  struct node* current = *head_ref;
  struct node* next;

  while (current != NULL) {
    next = current->next;
    sortedInsert(&result, current->data);
    current = next;
  }

  *head_ref = result;
}


void frontBackSplit(struct node* source, struct node** front_ref, struct node** back_ref) {
  struct node* fast;
  struct node* slow;

  if (source == NULL || source->next == NULL) { // length < 2 cases
    *front_ref = source;
    *back_ref = NULL;
  } else {
    slow = source;
    fast = source->next;

    // Advance 'fast' two nodes, and advance 'slow' one node
    while (fast != NULL) {
      fast = fast->next;

      if (fast != NULL) {
        slow = slow->next;
        fast = fast->next;
      }
    }

    /* for list of size 8 (even) slow stops at position 4,
     * and for list of size 9 (odd), slow stops at position 5.
     */

    // 'slow' is before the midpoint in the list, so split it in two
    // at that point.
    *front_ref = source;
    *back_ref = slow->next;
    slow->next = NULL;
  }
}


/* Remove duplicates from a sorted list. */
void removeDuplicates(struct node* head) {
  if (head == NULL || head->next == NULL) {
    return; // do nothing if the list is empty or if it contains a single element
  } else {
    struct node* current = head;
    struct node* nextNext;
    while (current->next != NULL) {
      // Compare current node with next node
      if (current->data == current->next->data) {
          nextNext = current->next->next;
          free(current->next);
          current->next = nextNext;
      } else {
        current = current->next; // only advance if no deletion
      }
    }
  }
}


/* moveNode() */
/* This is a variant on Push(). Instead of creating a new node and pushing it onto the given
 * list, MoveNode() takes two lists, removes the front node from the second list and pushes
 * it onto the front of the first.
 */

/* Take the node from the front of the source, and move it to
   the front of the dest.
   It is an error to call this with the source list empty.
*/
void moveNode(struct node** dest_ref, struct node** source_ref) {
  struct node* new_node = *source_ref;
  assert(new_node != NULL);

  *source_ref = new_node->next; // Advance the source pointer

  new_node->next = *dest_ref; // Link the old dest off the new node
  *dest_ref = new_node; // Move dest to point to the new node
}


/* Given the source list, split its nodes into two shorter lists.
 * If we number the elements 0, 1, 2, ... then all the even elements
 * should go in the first list, and all the odd elements in the second.
 * The elements in the new lists may be in any order.
 */
/* alternating split w/o keep track of position parity */
void alternatingSplit(struct node* source, struct node** list_a_ref, struct node** list_b_ref) {
  struct node* current = source;

  while (current != NULL) {
    moveNode(list_a_ref, &current);
    if (current != NULL) {
      moveNode(list_b_ref, &current);
    }
  }
}


//void alternatingSplit(struct node** source, struct node** list_a_ref, struct node** list_b_ref) {
//  struct node* current = *source;
//  int data;
//
//  while (current != NULL) {
//    data = pop(source);
//    push(list_a_ref, data);
//    current = current->next;
//    if (current != NULL) {
//      data = pop(source);
//      push(list_b_ref, data);
//      current = current->next;
//    }
//  }
//}


//void alternatingSplit(struct node* source, struct node** list_a_ref, struct node** list_b_ref) {
//  struct node* current = source;
//  int even_elem_flag = 1;
//
//  while (current != NULL) {
//    if (even_elem_flag) {
//      push(list_a_ref, current->data);
//      even_elem_flag--; 
//    } else {
//      push(list_b_ref, current->data);
//      even_elem_flag++; 
//    }
//    current = current->next;
//  }
//}


/* Merge the nodes of the two lists into a single list taking a node
 * alternately from each list, and return the new list.
 */
struct node* shuffleMerge(struct node* a, struct node* b) {
  struct node* result = NULL;
  struct node** last_ptr_ref = &result;

  while (1) {
    if (a == NULL) {
      *last_ptr_ref = b;  
      break;
    } else if (b == NULL) {
      *last_ptr_ref = a;
      break;
    } else {
        moveNode(last_ptr_ref, &a);  
        last_ptr_ref = &((*last_ptr_ref)->next);
        moveNode(last_ptr_ref, &b);
        last_ptr_ref = &((*last_ptr_ref)->next);
    }
  }

  return (result);
}


/* Takes two lists sorted in increasing order, and
 * splices their nodes together to make one big
 * sorted list which is returned.
 */
struct node* sortedMerge(struct node* a, struct node* b) {
    
}


void print(struct node* head) {
  struct node* current = head;

  while (current != NULL) {
    printf("%d -> ", current->data);
    current = current->next;
  }

  printf("\n");
}


int main() {
  struct node* head = NULL;

  push(&head, 4);
  push(&head, 2);
  push(&head, 12);
 // push(&head, 5);
 // push(&head, 21);
 // push(&head, 24);
 // push(&head, 3);

  //print(head);

  //printf("key 2 occurs %d times in the list\n", count(head, 2));

  //int nth_val = getNth(head, -2);
  //if (nth_val) {
  //  printf("Nth value : %d\n", nth_val);
  //} else {
  //  printf("Position does not exist\n");
  //}

  ////deleteList(&head);
  ////if (!head) {
  ////  printf("Delete List routine successful\n");
  ////} else {
  ////  printf("Delete List routine unsuccessful\n");
  ////}

  //printf("Popped element value is %d\nNew head set to %d\n", pop(&head), head->data);

  //insertNth(&head, 0, 22);
  //print(head); 

  //struct node* node1 = malloc(sizeof(struct node));
  //node1->data = 3;

  //struct node* node2 = malloc(sizeof(struct node));
  //node2->data = 5;

  //struct node* node3 = malloc(sizeof(struct node));
  //node3->data = 2;

  //struct node* node4 = malloc(sizeof(struct node));
  //node4->data = 4;

  //sortedInsert(&head, node1);
  //sortedInsert(&head, node2);
  //sortedInsert(&head, node3);
  //sortedInsert(&head, node4);
  
  //sortedInsert(&head, 3);
  //sortedInsert(&head, 5);
  //sortedInsert(&head, 2);
  //sortedInsert(&head, 4);

  insertSort(&head);

  //appendNode(&head, 2206);
  //appendNode(&head, 1992);

  //struct node* list_b = NULL;
  //push(&list_b, 4);
  //push(&list_b, 2);
  //push(&list_b, 12);
  //push(&list_b, 5);
  //push(&list_b, 21);
  //push(&list_b, 24);
  //push(&list_b, 3);

  //append(&head, &list_b);

  //struct node* front_list = NULL;
  //struct node* back_list = NULL;

  //print(head);
  //frontBackSplit(head, &front_list, &back_list);
  //printf("\nfront split : ");
  //print(front_list);
  //printf("\nback split : ");
  //print(back_list);

  //push(&head, 2);
  //appendNode(&head, 2206);
  //insertNth(&head, 5, 5);
  //insertNth(&head, 5, 5);
  //insertNth(&head, 5, 5);
  //insertSort(&head);
  //print(head);

  //removeDuplicates(head);
  //printf("\nList after duplicates have been removed : ");
  //print(head);


  //struct node* list_b = NULL;
  //push(&list_b, 4);
  //push(&list_b, 2);
  //push(&list_b, 12);
  //push(&list_b, 5);
  //push(&list_b, 21);
  //push(&list_b, 24);
  //push(&list_b, 3);

  //print(head);
  //printf("\nDestination list before move node: ");
  //print(list_b);
  //moveNode(&list_b, &head);
  //printf("\nSource list after move node: ");
  //print(head);
  //printf("\nList after move node: ");
  //print(list_b);
  
 // struct node* list_a = NULL;
 // struct node* list_b = NULL;

 // print(head);
 // alternatingSplit(head, &list_a, &list_b);
 // print(head);
 // print(list_a); 
 // print(list_b); 
 
  struct node* list_a = NULL;
  push(&list_a, 4);
  push(&list_a, 2);
  push(&list_a, 12);

  struct node* list_b = NULL;
  push(&list_b, 5);
  push(&list_b, 21);
  push(&list_b, 24);
  push(&list_b, 3);

  struct node* result = shuffleMerge(list_a, list_b);
  print(result);
  
  return 0;
}
