const markdownIt = require("markdown-it");
const md = markdownIt({ html: true, breaks: true, linkify: true });

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // Add an id and class to the first <h1> in an HTML string
  eleventyConfig.addFilter("addH1Id", (html, id) => {
    if (!html || !id) return html || "";
    return html.replace(/<h1([^>]*)>/, `<h1$1 id="${id}" class="text-primary">`);
  });

  // Extract the plain text of the first <h1> from an HTML string (used in nav)
  eleventyConfig.addFilter("extractH1Text", (html) => {
    if (!html) return "";
    const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    return match ? match[1].replace(/<[^>]+>/g, "").trim() : "";
  });

  // Transform question Markdown HTML into <details>/<summary> accordions.
  // Strips the <h1> (rendered separately) and wraps each <h2> + following
  // content into a <details> block.
  eleventyConfig.addFilter("questionsHtml", (html) => {
    if (!html) return "";
    const noH1 = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, "");
    return noH1.replace(
      /<h2[^>]*>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2|$)/g,
      (_, title, body) => `<details><summary>${title}</summary>\n${body.trim()}\n</details>\n`
    );
  });

  // Sorted, locale-filtered collections
  const byOrder = (a, b) => (a.data.order ?? 0) - (b.data.order ?? 0);

  eleventyConfig.addCollection("topics_ru", (api) =>
    api.getFilteredByTag("topic").filter((i) => i.data.locale === "ru").sort(byOrder)
  );
  eleventyConfig.addCollection("topics_en", (api) =>
    api.getFilteredByTag("topic").filter((i) => i.data.locale === "en").sort(byOrder)
  );
  eleventyConfig.addCollection("questions_ru", (api) =>
    api.getFilteredByTag("question").filter((i) => i.data.locale === "ru").sort(byOrder)
  );
  eleventyConfig.addCollection("questions_en", (api) =>
    api.getFilteredByTag("question").filter((i) => i.data.locale === "en").sort(byOrder)
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
