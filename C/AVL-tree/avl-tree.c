#include <stdlib.h>
#include <stdio.h>
#define COUNT 10

struct node {
  struct node* left;
  struct node* right;
  int data;
  int height;
};

// A utility function to get the height of the tree 
int height (struct node* node) { 
  if (node == NULL) 
    return 0; 
  return node->height; 
}

struct node* newNode(int data) {
  struct node* node = (struct node*)malloc(sizeof(struct node));
  node->data = data;
  node->left = NULL;
  node->right = NULL;
  node->height = 1;

  return (node);
}

// A utility function to get maximum of two integers 
int max(int a, int b) { 
  return (a > b) ? a : b; 
} 

struct node* leftRotate(struct node* x) {
  struct node *y = x->right; 
  struct node *T2 = y->left;

  // Perform rotation
  y->left = x;
  x->right = T2;

  // Update heights
  x->height = max(height(x->left), height(x->right))+1; 
  y->height = max(height(y->left), height(y->right))+1;

  // Return new root
  return y;
}

struct node* rightRotate(struct node* y) {
  struct node *x = y->left; 
  struct node *T2 = x->right;

  // Perform rotation
  x->right = y;
  y->left = T2;

  // Update heights
  x->height = max(height(x->left), height(x->right))+1; 
  y->height = max(height(y->left), height(y->right))+1;

  // Return new root
  return x;
}

int getBalance(struct node* node) { 
  if (node == NULL) {
    return 0;
  }
  return height(node->left) - height(node->right); 
} 

struct node* insert(struct node* node, int data) {
  if (node == NULL) {
    return (newNode(data));
  } else {

    if (data < node->data) {
      node->left = insert(node->left, data);
    } else if (data > node->data) {
      node->right = insert(node->right, data);
    } else { // Equal keys are not allowed in BST
      return node;
    }

    /* 2. Update height of this ancestor node */
    node->height = 1 + max(height(node->left), height(node->right));

    /* 3. Get the balance factor of this ancestor node
     * to check whether this node became unbalanced 
     */
    int balance_factor = getBalance(node); 

    /* if (balance_factor > 1) { // either in Left Left case or Left Right case } */
    /* if (balance_factor < -1) { // either in Right Right case or Right Left case } */

    // To check whether it is left left case or not, compare the newly 
    // inserted key with the key in left subtree root. 
    if (balance_factor > 1  && data < node->left->data) { // LL case
      return rightRotate(node);
    }

    // To check whether it is Right Right case or not, compare the newly 
    // inserted key with the key in right subtree root.
    if (balance_factor < -1 && data > node->right->data) { // RR case
      return leftRotate(node);
    }

    // LR case
    if (balance_factor > 1 && data > node->left->data) {
      node->left =  leftRotate(node->left); 
      return rightRotate(node);
    }

    // RL case 
    if (balance_factor < -1 && data < node->right->data) {
      node->right = rightRotate(node->right); 
      return leftRotate(node); 
    }
  }

  /* return the (unchanged) node pointer */
  return (node);
}

void print2D(struct node* node, int space) {
  if (node == NULL) {
    return;
  }

  space += COUNT;

  print2D(node->right, space);

  printf("\n");
  for (int i = COUNT; i < space; i++) {
    printf(" ");
  } 
  printf("%d\n", node->data);

  print2D(node->left, space);
}

void printInorder(struct node* node) {
  if (node == NULL) {
    return;
  } else {

    printInorder(node->left);
    printf("%d ", node->data);
    printInorder(node->right);
  }
}

int main() {
  struct node* root = NULL;

  root = insert(root, 6);
  root = insert(root, 11);
  root = insert(root, 32);
  root = insert(root, 44);
  root = insert(root, 9);
  root = insert(root, 8);
  root = insert(root, 2);
  root = insert(root, 4);
  root = insert(root, 1);

  printInorder(root);
  print2D(root, 0);

  return 0;
}
