'use strict';

var stdIn = require('../../../input');

var mergeSort = Object.create(stdIn);

mergeSort.init = async function init() {
  this.inputArr = await this.input();
  // To sort the entire sequence A =: A[1], A[2], .... , A[n]
  // make the initial call MERGE-SORT(A, 1, A.length)
  /* ZERO based index confusion */
  // In CLRS: this.merge_sort(1, this.inputArr.length);
  this.merge_sort(0, this.inputArr.length - 1);
  console.log(this.inputArr);
}

mergeSort.input = async function input() {
  return await this.createInputArr();
}

/* Suppose we have two piles of cards face up on a table. Each pile is
 * sorted, with the smallest cards on top. We wish to merge the two piles into a single
 * sorted output pile, which is to be face down on the table. (Two finger algo) Our basic 
 * step consists of choosing the smaller of the two cards on top of the face-up piles, removing it
 * from its pile (which exposes a new top card), and placing this card face down ontothe output pile.
 * We repeat this step until one input pile is empty, at which time
 * we just take the remaining input pile and place it face down onto the output pile.
 * Computationally, each basic step takes constant time, since we are comparing just
 * the two top cards. Since we perform at most n basic steps, merging takes ? time. */

mergeSort.merge = function merge(p, q, r) {
  let arrL = []; // array L
  let arrR = []; // array R

  // computes the length lenL of the subarray A[p..q]
  let lenL = q - p + 1; // n1
  // computes the length lenR of the subarray A[q + 1..r]
  let lenR = r - q; // n2

  // copies the subarray A[p..q] into L[1..n1]
  for (let i = 0; i < lenL; i++) {
    /* ZERO based index confusion */
    // In CLRS: arrL.push(this.inputArr[p + i - 1]);
    arrL[i] = this.inputArr[p + i];
  }

  // copies the subarray A[q + 1..r] into R[1..n2]
  for (let i = 0; i < lenR; i++) {
    /* ZERO based index confusion */
    // In CLRS: arrR.push(this.inputArr[q + i]);
    arrR[i] = this.inputArr[q + i + 1];
  }

  /* An additional twist that avoids having to check whether either pile is empty in each basic step.
   * We place on the bottom of each pile a sentinel card, which contains a special value
   * that we use to simplify our code. Here, we use INFINITY as the sentinel value, so that
   * whenever a card with INFINITY is exposed, it cannot be the smaller card unless both piles
   * have their sentinel cards exposed. But once that happens, all the nonsentinel cards
   * have already been placed onto the output pile. Since we know in advance that
   * exactly r - p + 1 cards will be placed onto the output pile, we can stop once we
   * have performed that many basic steps. */
  // put the sentinels at the ends of the arrays L and R.
  arrL.push(Number.POSITIVE_INFINITY);
  arrR.push(Number.POSITIVE_INFINITY);

  // Two finger algo: MIT-Intro to Algo, Lec-3
  let idxL = 0;
  let idxR = 0;


  // Perform the r - p + 1 basic steps by maintaining the following
  // loop invariant:
  /* At the start of each iteration of the for loop of lines, the subarray
   * A[p..k - 1] contains the k - p smallest elements of L[1..n1 + 1] and
   * R[1..n2 + 1], in sorted order. Moreover, L[i] and R[j]  are the smallest
   * elements of their arrays that have not been copied back into A. */
  for (let k = p; k <= r; k++) {
    if (arrL[idxL] <= arrR[idxR]) {
      this.inputArr[k] = arrL[idxL]
      idxL++;
    } else {
      this.inputArr[k] = arrR[idxR];
      idxR++;
    }
  }
}

mergeSort.merge_sort = function merge_sort(p, r) {
  // If p >= r, the subarray has at most one element and is therefore
  // already sorted.
  if (p < r) { 
    let q = Math.floor((p + r) / 2);

    this.merge_sort(p, q);
    this.merge_sort(q + 1, r);
    this.merge(p, q, r);
  }
}

mergeSort.init();
