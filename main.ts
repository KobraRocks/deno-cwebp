import { convertToWebP } from "./mod.ts";

await convertToWebP({
  input: "example.jpg",
  output: "example.webp",
  q: 80,
  resize: [800, 0],
  mt: true,
  quiet: true,
});

