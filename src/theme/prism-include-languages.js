/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment"
import siteConfig from "@generated/docusaurus.config"

const prismIncludeLanguages = PrismObject => {
  if (ExecutionEnvironment.canUseDOM) {
    const {
      themeConfig: {
        prism: { additionalLanguages = [], magicComments = [] } = {},
      },
    } = siteConfig
    window.Prism = PrismObject
    additionalLanguages.forEach(lang => {
      require(`prismjs/components/prism-${lang}`) // eslint-disable-line
    })
    magicComments.push({
      className: "docusaurus-highlight-removed-code-lines",
      line: "Next line is removed",
      block: { start: "Removed lines start", end: "Removed lines end" },
    })
    magicComments.push({
      className: "docusaurus-highlight-added-code-lines",
      line: "Next line is added",
      block: { start: "Added lines start", end: "Added lines end" },
    })

    require("prismjs/components/prism-kotlin")
    require("prismjs/components/prism-swift")
    require("prismjs/components/prism-java")
    require("prismjs/components/prism-dart")
    require("prismjs/components/prism-groovy")
    require("prismjs/components/prism-ruby")
    require("prismjs/components/prism-go")
    delete window.Prism
  }
}

export default prismIncludeLanguages
