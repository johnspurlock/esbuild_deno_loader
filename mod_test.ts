import { denoPlugin } from "./mod.ts";
import { esbuild } from "./test_deps.ts";
import { assert, assertEquals } from "./test_deps.ts";

const ALL = ["native", "portable"] as const;

function test(
  name: string,
  loaders: readonly ("native" | "portable")[],
  fn: (loader: "native" | "portable") => Promise<void>,
) {
  for (const loader of loaders) {
    Deno.test(`[${loader}] ${name}`, async () => {
      try {
        await esbuild.initialize({});
        await fn(loader);
      } finally {
        esbuild.stop();
      }
    });
  }
}

test("remote ts", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    entryPoints: ["https://deno.land/std@0.173.0/collections/without_all.ts"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const { withoutAll } = await import(dataURL);
  assertEquals(withoutAll([1, 2, 3], [2, 3, 4]), [1]);
});

test("local ts", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    entryPoints: ["./testdata/mod.ts"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const { bool } = await import(dataURL);
  assertEquals(bool, "asd2");
});

test("remote mts", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    entryPoints: [
      "https://gist.githubusercontent.com/lucacasonato/4ad57db57ee8d44e4ec08d6a912e93a7/raw/f33e698b4445a7243d72dbfe95afe2d004c7ffc6/mod.mts",
    ],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const { bool } = await import(dataURL);
  assertEquals(bool, "asd2");
});

test("local mts", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    entryPoints: ["./testdata/mod.mts"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const { bool } = await import(dataURL);
  assertEquals(bool, "asd2");
});

test("remote js", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    entryPoints: ["https://crux.land/266TSp"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const { bool } = await import(dataURL);
  assertEquals(bool, "asd");
});

test("local js", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    entryPoints: ["./testdata/mod.js"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const { bool } = await import(dataURL);
  assertEquals(bool, "asd");
});

test("remote mjs", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    entryPoints: [
      "https://gist.githubusercontent.com/lucacasonato/4ad57db57ee8d44e4ec08d6a912e93a7/raw/f33e698b4445a7243d72dbfe95afe2d004c7ffc6/mod.mjs",
    ],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const { bool } = await import(dataURL);
  assertEquals(bool, "asd");
});

test("local mjs", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    entryPoints: ["./testdata/mod.mjs"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const { bool } = await import(dataURL);
  assertEquals(bool, "asd");
});

test("remote jsx", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    entryPoints: ["https://crux.land/GeaWJ"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const m = await import(dataURL);
  assertEquals(m.default, "foo");
});

test("local jsx", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    entryPoints: ["./testdata/mod.jsx"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const m = await import(dataURL);
  assertEquals(m.default, "foo");
});

test("remote tsx", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    entryPoints: ["https://crux.land/2Qjyo7"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const m = await import(dataURL);
  assertEquals(m.default, "foo");
});

test("local tsx", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    entryPoints: ["./testdata/mod.tsx"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const m = await import(dataURL);
  assertEquals(m.default, "foo");
});

test("bundle remote imports", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    bundle: true,
    platform: "neutral",
    entryPoints: ["https://deno.land/std@0.173.0/uuid/mod.ts"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const { v1 } = await import(dataURL);
  assert(v1.validate(v1.generate()));
});

const importMapURL = new URL("./testdata/importmap.json", import.meta.url);

test("bundle import map", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [
      denoPlugin({ importMapURL, loader }),
    ],
    write: false,
    bundle: true,
    platform: "neutral",
    entryPoints: ["./testdata/importmap.js"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const { bool } = await import(dataURL);
  assertEquals(bool, "asd2");
});

test("local json", ALL, async (loader) => {
  const res = await esbuild.build({
    plugins: [denoPlugin({ loader })],
    write: false,
    format: "esm",
    entryPoints: ["./testdata/data.json"],
  });
  assertEquals(res.warnings, []);
  assertEquals(res.outputFiles.length, 1);
  const output = res.outputFiles[0];
  assertEquals(output.path, "<stdout>");
  const dataURL = `data:application/javascript;base64,${btoa(output.text)}`;
  const { default: data } = await import(dataURL);
  assertEquals(data, {
    "hello": "world",
    ["__proto__"]: {
      "sky": "universe",
    },
  });
});
