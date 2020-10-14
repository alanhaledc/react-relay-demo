/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type srcQueryVariables = {|
  userId?: ?string
|};
export type srcQueryResponse = {|
  +allMessage: ?$ReadOnlyArray<?{|
    +title: ?string,
    +content: ?string,
  |}>
|};
export type srcQuery = {|
  variables: srcQueryVariables,
  response: srcQueryResponse,
|};
*/


/*
query srcQuery(
  $userId: String
) {
  allMessage(userId: $userId) {
    title
    content
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "Message",
    "kind": "LinkedField",
    "name": "allMessage",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "content",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "srcQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "srcQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8a03f6dcc29b8b9e2b3380765f6034b0",
    "id": null,
    "metadata": {},
    "name": "srcQuery",
    "operationKind": "query",
    "text": "query srcQuery(\n  $userId: String\n) {\n  allMessage(userId: $userId) {\n    title\n    content\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0a3e24d515d8b132c1c17a3cd0cc6f39';

module.exports = node;
