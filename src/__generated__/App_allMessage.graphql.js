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
  +id: ?string,
  +title: ?string,
  +content: ?string,
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
  "type": "Message",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '8b0744edfa6f7b888b34b25718b102e8';

module.exports = node;
