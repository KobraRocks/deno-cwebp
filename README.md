# deno-cwebp

🖼️ A Deno wrapper for the `cwebp` CLI tool to convert images to WebP format.

## Features

- Supports all `cwebp` options via a clean TypeScript API
- Handles file input/output and flag parsing
- Supports resizing, quality control, lossless/lossy, multithreading, and more

## Installation

Ensure `cwebp` is installed on your system:

```bash
# macOS
brew install webp

# Archlinux
sudo pacman -S libwebp

# Ubuntu/Debian
sudo apt install webp

# Windows
choco install webp
````

Import in your Deno project:

```ts
import { convertToWebP } from "https://deno.land/x/cwebp/mod.ts";
```

## Usage

```ts
import { convertToWebP } from "https://deno.land/x/cwebp/mod.ts";

await convertToWebP({
  input: "example.jpg",
  output: "example.webp",
  q: 80,
  resize: [800, 0], // Resize keeping aspect ratio
  mt: true,
  quiet: true,
});
```

## API

### `convertToWebP(options: CWebPOptions): Promise<void>`

Converts an image to WebP using the `cwebp` binary.

### `CWebPOptions` interface

See full options in [`cwebp.ts`](./cwebp.ts) or [`man cwebp`](https://developers.google.com/speed/webp/docs/cwebp).

---

## License

MIT


