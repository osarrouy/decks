import type { MdsvexOptions } from "mdsvex";

export function svxDeckMarkdownPreprocess(): {
  name: string;
  markup(input: {
    content: string;
    filename?: string;
  }): { code: string } | undefined;
};

export function svxDeckMdsvexOptions(options?: MdsvexOptions): MdsvexOptions;
export function remarkLayoutDirectives(): unknown;
export function remarkPandocAttributes(): unknown;
