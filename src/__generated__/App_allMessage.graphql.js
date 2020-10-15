/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type App_allMessage$ref: FragmentReference;
declare export opaque type App_allMessage$fragmentType: App_allMessage$ref;
export type App_allMessage = {|
  +list: ?$ReadOnlyArray<?{|
    +id: ?string,
    +title: ?string,
    +content: ?string,
  |}>,
  +$refType: App_allMessage$ref,
|};
export type App_allMessage$data = App_allMessage;
export type App_allMessage$key = {
  +$data?: App_allMessage$data,
  +$fragmentRefs: App_allMessage$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "App_allMessage",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Message",
      "kind": "LinkedField",
      "name": "list",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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
  ],
  "type": "Messages",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'afd952d7747375c3853311a8c97e9b55';

module.exports = node;
