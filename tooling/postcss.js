import postcssGlobalData from "@csstools/postcss-global-data";
import postcssCustomMedia from "postcss-custom-media";

export function uiPostcss(breakpoints) {
  return {
    plugins: [
      // Svelte processes each component stylesheet separately.
      postcssGlobalData({
        files: [breakpoints],
      }),
      postcssCustomMedia({ preserve: false }),
    ],
  };
}
