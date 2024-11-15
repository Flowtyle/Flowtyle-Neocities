module.exports = function (eleventyConfig) {

    // This will stop the default behaviour of foo.html being turned into foo/index.html
    eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

    // This will copy this folder to the output without modifying it at all
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/styles");
    eleventyConfig.addPassthroughCopy("src/scripts");
  
    return {
      dir: {
        input: "src",
        output: "public",
      },
    };
  };