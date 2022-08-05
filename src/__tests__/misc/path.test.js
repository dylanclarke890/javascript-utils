import {
  basename,
  dirname,
  filenameExtension,
  getPathExtension,
  pathInfo,
} from "../../modules/misc/path";

test("basename returns the base path from a string", () => {
  expect(basename("somepath")).toBe("somepath");
  expect(basename("somepath/test")).toBe("test");
  expect(basename("somepath/test/path/long")).toBe("long");
});

test("getPathExtension returns expected extension", () => {
  expect(getPathExtension("untitled.png")).toBe("png");
  expect(getPathExtension("longpath/tofile/untitled.jpeg")).toBe("jpeg");
  expect(getPathExtension("longpath/tofile/untitled")).toBe("");
});

test("pathInfo returns the expected object", () => {
  expect(pathInfo("untitled.png")).toStrictEqual({
    basename: "untitled.png",
    dirname: ".",
    extension: "png",
    filename: "untitled",
  });
  expect(pathInfo("longpath/tofile/untitled.jpeg")).toStrictEqual({
    basename: "untitled.jpeg",
    dirname: "longpath/tofile",
    extension: "jpeg",
    filename: "untitled",
  });
  expect(pathInfo("/www/index.html")).toStrictEqual({
    basename: "index.html",
    dirname: "/www",
    extension: "html",
    filename: "index",
  });
});

test("fileExtension returns the expected extension", () => {
  expect(filenameExtension("untitled.png")).toBe("png");
  expect(filenameExtension("index.html")).toBe("html");
  expect(filenameExtension("blah.jpeg")).toBe("jpeg");
  expect(filenameExtension("asd.mp4")).toBe("mp4");
  expect(filenameExtension("fgdf.slfpas")).toBe("slfpas");
});

test("dirname returns the expected string", () => {
  expect(dirname("/www/index.html")).toBe("/www");
});
