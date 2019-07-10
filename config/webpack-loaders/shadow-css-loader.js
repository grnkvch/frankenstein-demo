var loaderUtils = require("loader-utils");

module.exports = function () {};

module.exports.pitch = function(remainingRequest) {
  if (this.cacheable) this.cacheable();
  return `
      var result = require(${loaderUtils.stringifyRequest(this, "!!" + remainingRequest)});

      if (typeof result !== "string") {
          result = result.toString();
      }
      
      var regex = /html|body/gi;
      
      result = ":host{display:block}" +
      "" +
      result.replace(regex, ':host');
      
      module.exports = result;
  `;
};
