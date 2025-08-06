// cwebp.ts

/**
 * Options for the cwebp command.
 */
export interface CWebPOptions {
  input: string;
  output?: string;
  lossless?: boolean;
  nearLossless?: number;
  q?: number;
  z?: number;
  alphaQ?: number;
  preset?: "default" | "photo" | "picture" | "drawing" | "icon" | "text";
  m?: number;
  crop?: [number, number, number, number];
  resize?: [number, number];
  resizeMode?: "down_only" | "up_only" | "always";
  mt?: boolean;
  lowMemory?: boolean;
  size?: number;
  psnr?: number;
  pass?: number;
  qrange?: [number, number];
  af?: boolean;
  jpegLike?: boolean;
  f?: number;
  sharpness?: number;
  strong?: boolean;
  nostrong?: boolean;
  sharpYUV?: boolean;
  sns?: number;
  segments?: number;
  partitionLimit?: number;
  quiet?: boolean;
  print_psnr?: boolean;
  print_ssim?: boolean;
  print_lsim?: boolean;
  progress?: boolean;
  short?: boolean;
  map?: number;
  exact?: boolean;
  noalpha?: boolean;
  hint?: "photo" | "picture" | "graph";
  metadata?: "all" | "none" | "exif" | "icc" | "xmp";
}

/**
 * Converts an image to WebP using the cwebp CLI.
 */
export async function convertToWebP(options: CWebPOptions): Promise<void> {
  const {
    input,
    output,
    lossless,
    nearLossless,
    q,
    z,
    alphaQ,
    preset,
    m,
    crop,
    resize,
    resizeMode,
    mt,
    lowMemory,
    size,
    psnr,
    pass,
    qrange,
    af,
    jpegLike,
    f,
    sharpness,
    strong,
    nostrong,
    sharpYUV,
    sns,
    segments,
    partitionLimit,
    quiet,
    print_psnr,
    print_ssim,
    print_lsim,
    progress,
    short,
    map,
    exact,
    noalpha,
    hint,
    metadata,
  } = options;

  const args: string[] = [];

  if (lossless) args.push("-lossless");
  if (nearLossless !== undefined) args.push("-near_lossless", nearLossless.toString());
  if (q !== undefined) args.push("-q", q.toString());
  if (z !== undefined) args.push("-z", z.toString());
  if (alphaQ !== undefined) args.push("-alpha_q", alphaQ.toString());
  if (preset) args.push("-preset", preset);
  if (m !== undefined) args.push("-m", m.toString());
  if (crop) args.push("-crop", ...crop.map(String));
  if (resize) args.push("-resize", ...resize.map(String));
  if (resizeMode) args.push("-resize_mode", resizeMode);
  if (mt) args.push("-mt");
  if (lowMemory) args.push("-low_memory");
  if (size !== undefined) args.push("-size", size.toString());
  if (psnr !== undefined) args.push("-psnr", psnr.toString());
  if (pass !== undefined) args.push("-pass", pass.toString());
  if (qrange) args.push("-qrange", ...qrange.map(String));
  if (af) args.push("-af");
  if (jpegLike) args.push("-jpeg_like");
  if (f !== undefined) args.push("-f", f.toString());
  if (sharpness !== undefined) args.push("-sharpness", sharpness.toString());
  if (strong) args.push("-strong");
  if (nostrong) args.push("-nostrong");
  if (sharpYUV) args.push("-sharp_yuv");
  if (sns !== undefined) args.push("-sns", sns.toString());
  if (segments !== undefined) args.push("-segments", segments.toString());
  if (partitionLimit !== undefined) args.push("-partition_limit", partitionLimit.toString());
  if (quiet) args.push("-quiet");
  if (print_psnr) args.push("-print_psnr");
  if (print_ssim) args.push("-print_ssim");
  if (print_lsim) args.push("-print_lsim");
  if (progress) args.push("-progress");
  if (short) args.push("-short");
  if (map !== undefined) args.push("-map", map.toString());
  if (exact) args.push("-exact");
  if (noalpha) args.push("-noalpha");
  if (hint) args.push("-hint", hint);
  if (metadata) args.push("-metadata", metadata);

  if (output) {
    args.push("-o", output);
  }

  // If input starts with "-", use "--" to avoid confusion with flags
  if (input.startsWith("-")) {
    args.push("--", input);
  } else {
    args.push(input);
  }

  const process = new Deno.Command("cwebp", {
    args,
    stdout: "inherit",
    stderr: "inherit",
  });

  const { code } = await process.output();
  if (code !== 0) {
    throw new Error(`cwebp failed with exit code ${code}`);
  }
}

