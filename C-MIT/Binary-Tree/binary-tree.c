#include <stdio.h>
#include <stdlib.h>
#define COUNT 10

struct node {
  int data;
  struct node* left;
  struct node* right;
};


struct node* newNode(int data) {
  struct node* node = (struct node*) malloc(sizeof(struct node));
  node->data = data;
  node->left = NULL;
  node->right = NULL;

  return (node);
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


/* Give a binary search tree and a number, inserts a new node
 * with the given number in the correct place in the tree.
 * Returns the new root pointer which the caller should
 * then use (the standard trick to avoid using reference
 * parameters).
 */
struct node* recursiveInsert(struct node* node, int data) {
  // 1. If the tree is empty, return a new, single node.
  if (node == NULL) {
    return (newNode(data));
  } else {
    // 2. Otherwise, recur down the tree.
    if (data <= node->data) {
      node->left = recursiveInsert(node->left, data);
    } else {
      node->right = recursiveInsert(node->right, data);
    }
    return (node);  // return the (unchanged) node pointer.
  }
}


void print2D(struct node* node, int space) {
  // Base case
  if (node == NULL) {
    return;
  } else {
    // Increase distance between levels
    space += COUNT;

    // Process right child first
    print2D(node->right, space);

    // Print current node after space count
    printf("\n");
    for (int i = COUNT; i < space; i++) {
      printf(" "); 
    }
    printf("%d\n", node->data); 

    // Process left child
    print2D(node->left, space);
  }
}

/* Given a non-empty binary search tree,
 * return the minimum data value found in that tree.
 * Note that the entire tree does not need to be searched.
 */
int recursiveMinValue(struct node* node) {
  if (node->left == NULL) {
    return node->data;
  } else {
    return recursiveMinValue(node->left);
  }
}

int iterativeMinValue(struct node* node) {
  struct node* current = node;

  while (current->left != NULL) {
    current = current->left;
  }

  return (current->data);
}


int iterativeMaxValue(struct node* node) {
  struct node* current = node;

  while (current->right != NULL) {
    current = current->right;
  }

  return (current->data);
}


/* Given a binary search tree, print out
 * its data elements in increasing sorted order.
 */
void printPostOrder(struct node* node) {
  if (node == NULL) {
    return;
  } else {
    // first recur on both subtrees
    printPostOrder(node->left);
    printPostOrder(node->right);

    // then deal with the node
    printf("%d ", node->data);
  }
}

/* Compute the "maxDepth" of a tree -- the number of nodes along
 * the longest path from the root node down to the farthest leaf node.
 */
int maxDepth(struct node* node) {
  if (node == NULL) {
    return (0);
  } else {
    // compute the depth of each subtree
    int l_depth = maxDepth(node->left);
    int r_depth = maxDepth(node->right);

    // use the larger one
    if (l_depth > r_depth) {
      return (l_depth + 1);
    } else {
      return (r_depth + 1);
    }
  }
}


/* Given a tree and a sum, return true if there is a path from the root
 * down to a leaf, such that adding up all the values along the path
 * equals the given sum.
 */
int hasPathSum(struct node* node, int sum) {
  // return true if we run out of tree and sum==0
  if (node == NULL) {
    return (sum == 0);
  } else {
    int sub_sum = sum - node->data;
    return (hasPathSum(node->left, sub_sum) ||
    hasPathSum(node->right, sub_sum));
  }
}


void printArray(int arr[], int  len) {
  int i = 0;

  for(;i < len; i++) {
    printf("%d ", arr[i]);
  }

  printf("\n");
}


/* Recursive helper function -- given a node, and an array containing
 * the path from the root node up to but not including this node,
 * print out all the root-leaf paths.
 */
void printPathsRecur(struct node* node, int path[], int path_len) {
  if (node == NULL) {
    return;
  }

  // append this node to the path array
  path[path_len] = node->data;
  path_len++;

  if (node->left == NULL && node->right == NULL) {
    printArray(path, path_len);
  } else {
    printPathsRecur(node->left, path, path_len);
    printPathsRecur(node->right, path, path_len);
  }
}


/* Given a binary tree, print out all of its root-to-leaf
 * paths, one per line. Uses a recursive helper to do the work.
 */
void printPaths(struct node* node) {
  int path[1000]; 

  printPathsRecur(node, path, 0);
}


/* Change a tree so that the roles of the
 * left and right pointers are swapped at every node.
 */
void mirror(struct node* node) {
  if (node == NULL) {
    return;
  } else {
    struct node* temp;

    // do the sub trees
    mirror(node->left);
    mirror(node->right);

    // swap the pointers in this node
    temp = node->left;
    node->left = node->right;
    node->right = temp;
  }
}


 /* For each node in a binary search tree,
  * create a new duplicate node, and insert
  * the duplicate as the left child of the original node.
  * The resulting tree should still be a binary search tree.
  */
void doubleTree(struct node* node) {
  struct node* old_left;

  if (node == NULL) {
    return;
  } else {
    doubleTree(node->left);
    doubleTree(node->right);

    old_left = node->left;
    node->left = newNode(node->data);
    node->left->left = old_left;
  }
}


int sameTree(struct node* a, struct node* b) {
  // 1. both empty -> true
  if (a == NULL && b == NULL) {
    return (1);
  }

  // 2. both non-empty -> compare them
  else if (a != NULL && b != NULL) {
    return (
        a->data == b->data &&
        sameTree(a->left, b->left) &&
        sameTree(a->right, b->right)
        );
  }

  // 3. one empty, one not -> false
  else {
    return (0);
  }
}

/* A less efficient version for checking BST property */
int isBST(struct node* node) { 
  if (node == NULL) {
    return 1;
  }

  // false if the min of left is > than node
  if (node->left != NULL && iterativeMinValue(node->left) > node->data) {
    return 0;
  }

  // false if the max of the right is <= node
  if (node->right != NULL && iterativeMaxValue(node->right) <= node->data) {
    return 0;
  }

  // false if, recursively, the left or right is not BST
  if (!isBST(node->left) || !isBST(node->right)) {
    return 0;
  }

  // passing all that, it's a BST
  return 1;
}

int main() {
  struct node* root = NULL;
  root = recursiveInsert(root, 2);
  root = recursiveInsert(root, 1);
  root = recursiveInsert(root, 4);
  root = recursiveInsert(root, 3);
  root = recursiveInsert(root, 5);
  root = recursiveInsert(root, 6);
  root = recursiveInsert(root, 7);
  root = recursiveInsert(root, 13);
  print2D(root, 0);
  printf("\nRoot : %d\n", root->data);

  printInorder(root);
  int max_depth = maxDepth(root);
  printf("\nMax-Depth: %d", max_depth);

  int min_value = recursiveMinValue(root);
  printf("\nMin Value : %d", min_value);
  int iterative_min_value = iterativeMinValue(root);
  printf("\nMin Value : %d", iterative_min_value);

  printf("\nPost order : ");  
  printPostOrder(root);

  printf("\nHas Sum Path : %d\n", hasPathSum(root, 3));

  printPaths(root);

  //mirror(root);
  printInorder(root);

  printf("\nIs BST? : %d", isBST(root));
}
