module.exports = function (eleventyConfig) {

    // This will stop the default behaviour of foo.html being turned into foo/index.html
    eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

    // This will copy this folder to the output without modifying it at all
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/styles");
    eleventyConfig.addPassthroughCopy("src/scripts");
    eleventyConfig.addPassthroughCopy("src/posts/blogimages");
  
    // Tells Eleventy to look for Luxon
    const { DateTime } = require('luxon');

    // Adds Next & Previous links to the bottom of our blog posts
    eleventyConfig.addCollection("posts", function(collection) {
      const coll = collection.getFilteredByTag("posts");    
      for(let i = 0; i < coll.length ; i++) {
        const prevPost = coll[i-1];
        const nextPost = coll[i + 1];      
        coll[i].data["prevPost"] = prevPost;
        coll[i].data["nextPost"] = nextPost;
      }
      return coll;
    });

    // Add the filter "readableDate" to simplify the way blog dates are presented in the Archives page
    eleventyConfig.addFilter('readableDate', (dateObj) => {
      return DateTime.fromJSDate(dateObj, { zone: 'utc+9' }).toFormat(
        'yyyy-LL-dd'
      );
    });

    // Add the filter "topDate" to simplify the way blog dates are presented at the top of blog posts
    eleventyConfig.addFilter('topDate', (dateObj) => {
      return DateTime.fromJSDate(dateObj, { zone: 'utc+9' }).toFormat(
        'yyyy LLLL dd'
      );
    });

    return {
      dir: {
        input: "src",
        output: "public",
      },
    };
  };