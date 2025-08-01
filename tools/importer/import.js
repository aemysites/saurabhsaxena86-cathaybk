/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import columns9Parser from './parsers/columns9.js';
import columns1Parser from './parsers/columns1.js';
import cards3Parser from './parsers/cards3.js';
import hero11Parser from './parsers/hero11.js';
import cards16Parser from './parsers/cards16.js';
import carousel12Parser from './parsers/carousel12.js';
import tabs6Parser from './parsers/tabs6.js';
import cards5Parser from './parsers/cards5.js';
import accordion19Parser from './parsers/accordion19.js';
import columns2Parser from './parsers/columns2.js';
import accordion22Parser from './parsers/accordion22.js';
import cards21Parser from './parsers/cards21.js';
import cards23Parser from './parsers/cards23.js';
import columns17Parser from './parsers/columns17.js';
import search8Parser from './parsers/search8.js';
import cards10Parser from './parsers/cards10.js';
import accordion27Parser from './parsers/accordion27.js';
import tableNoHeader26Parser from './parsers/tableNoHeader26.js';
import hero34Parser from './parsers/hero34.js';
import accordion28Parser from './parsers/accordion28.js';
import hero35Parser from './parsers/hero35.js';
import cards37Parser from './parsers/cards37.js';
import columns15Parser from './parsers/columns15.js';
import columns13Parser from './parsers/columns13.js';
import cards40Parser from './parsers/cards40.js';
import tabs39Parser from './parsers/tabs39.js';
import cards18Parser from './parsers/cards18.js';
import cards41Parser from './parsers/cards41.js';
import table43Parser from './parsers/table43.js';
import columns45Parser from './parsers/columns45.js';
import columns46Parser from './parsers/columns46.js';
import columns48Parser from './parsers/columns48.js';
import cards47Parser from './parsers/cards47.js';
import cards20Parser from './parsers/cards20.js';
import cards50Parser from './parsers/cards50.js';
import tabs49Parser from './parsers/tabs49.js';
import columns42Parser from './parsers/columns42.js';
import columns53Parser from './parsers/columns53.js';
import cards52Parser from './parsers/cards52.js';
import columns25Parser from './parsers/columns25.js';
import columns51Parser from './parsers/columns51.js';
import accordion57Parser from './parsers/accordion57.js';
import tableStripedBordered44Parser from './parsers/tableStripedBordered44.js';
import columns56Parser from './parsers/columns56.js';
import cards58Parser from './parsers/cards58.js';
import tableStriped32Parser from './parsers/tableStriped32.js';
import cards63Parser from './parsers/cards63.js';
import hero59Parser from './parsers/hero59.js';
import columns65Parser from './parsers/columns65.js';
import cards64Parser from './parsers/cards64.js';
import columns54Parser from './parsers/columns54.js';
import columns69Parser from './parsers/columns69.js';
import columns29Parser from './parsers/columns29.js';
import columns67Parser from './parsers/columns67.js';
import cards70Parser from './parsers/cards70.js';
import columns60Parser from './parsers/columns60.js';
import tabs24Parser from './parsers/tabs24.js';
import columns61Parser from './parsers/columns61.js';
import carousel76Parser from './parsers/carousel76.js';
import accordion78Parser from './parsers/accordion78.js';
import columns73Parser from './parsers/columns73.js';
import cards79Parser from './parsers/cards79.js';
import cards72Parser from './parsers/cards72.js';
import columns81Parser from './parsers/columns81.js';
import accordion83Parser from './parsers/accordion83.js';
import columns82Parser from './parsers/columns82.js';
import columns66Parser from './parsers/columns66.js';
import columns55Parser from './parsers/columns55.js';
import columns68Parser from './parsers/columns68.js';
import columns74Parser from './parsers/columns74.js';
import tabs71Parser from './parsers/tabs71.js';
import columns77Parser from './parsers/columns77.js';
import cards36Parser from './parsers/cards36.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import sectionsTransformer from './transformers/sections.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  columns9: columns9Parser,
  columns1: columns1Parser,
  cards3: cards3Parser,
  hero11: hero11Parser,
  cards16: cards16Parser,
  carousel12: carousel12Parser,
  tabs6: tabs6Parser,
  cards5: cards5Parser,
  accordion19: accordion19Parser,
  columns2: columns2Parser,
  accordion22: accordion22Parser,
  cards21: cards21Parser,
  cards23: cards23Parser,
  columns17: columns17Parser,
  search8: search8Parser,
  cards10: cards10Parser,
  accordion27: accordion27Parser,
  tableNoHeader26: tableNoHeader26Parser,
  hero34: hero34Parser,
  accordion28: accordion28Parser,
  hero35: hero35Parser,
  cards37: cards37Parser,
  columns15: columns15Parser,
  columns13: columns13Parser,
  cards40: cards40Parser,
  tabs39: tabs39Parser,
  cards18: cards18Parser,
  cards41: cards41Parser,
  table43: table43Parser,
  columns45: columns45Parser,
  columns46: columns46Parser,
  columns48: columns48Parser,
  cards47: cards47Parser,
  cards20: cards20Parser,
  cards50: cards50Parser,
  tabs49: tabs49Parser,
  columns42: columns42Parser,
  columns53: columns53Parser,
  cards52: cards52Parser,
  columns25: columns25Parser,
  columns51: columns51Parser,
  accordion57: accordion57Parser,
  tableStripedBordered44: tableStripedBordered44Parser,
  columns56: columns56Parser,
  cards58: cards58Parser,
  tableStriped32: tableStriped32Parser,
  cards63: cards63Parser,
  hero59: hero59Parser,
  columns65: columns65Parser,
  cards64: cards64Parser,
  columns54: columns54Parser,
  columns69: columns69Parser,
  columns29: columns29Parser,
  columns67: columns67Parser,
  cards70: cards70Parser,
  columns60: columns60Parser,
  tabs24: tabs24Parser,
  columns61: columns61Parser,
  carousel76: carousel76Parser,
  accordion78: accordion78Parser,
  columns73: columns73Parser,
  cards79: cards79Parser,
  cards72: cards72Parser,
  columns81: columns81Parser,
  accordion83: accordion83Parser,
  columns82: columns82Parser,
  columns66: columns66Parser,
  columns55: columns55Parser,
  columns68: columns68Parser,
  columns74: columns74Parser,
  tabs71: tabs71Parser,
  columns77: columns77Parser,
  cards36: cards36Parser,
  ...customParsers,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
  sections: sectionsTransformer,
  ...customTransformers,
};

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.values(transformers).forEach((transformerFn) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        uuid: instance.uuid,
        section: instance.section,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  const defaultContentElements = inventory.outliers
    .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
    .map((instance) => ({
      ...instance,
      element: WebImporter.Import.getElementByXPath(document, instance.xpath),
    }));

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all elements using parsers
  [...defaultContentElements, ...blockElements, ...pageElements]
    // sort elements by order in the page
    .sort((a, b) => (a.uuid ? parseInt(a.uuid.split('-')[1], 10) - parseInt(b.uuid.split('-')[1], 10) : 999))
    // filter out fragment elements
    .filter((item) => !fragmentElements.includes(item.element))
    .forEach((item, idx, arr) => {
      const { element = main, ...pageBlock } = item;
      const parserName = WebImporter.Import.getParserName(pageBlock);
      const parserFn = parsers[parserName];
      try {
        let parserElement = element;
        if (typeof parserElement === 'string') {
          parserElement = main.querySelector(parserElement);
        }
        // before parse hook
        WebImporter.Import.transform(
          TransformHook.beforeParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
            nextEl: arr[idx + 1],
          },
        );
        // parse the element
        if (parserFn) {
          parserFn.call(this, parserElement, { ...source });
        }
        // after parse hook
        WebImporter.Import.transform(
          TransformHook.afterParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
          },
        );
      } catch (e) {
        console.warn(`Failed to parse block: ${parserName}`, e);
      }
    });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
