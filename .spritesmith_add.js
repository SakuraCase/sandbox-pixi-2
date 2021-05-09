const fs = require('fs');

// アニメーション対象を含むjson
const animationsPath = "./assets/animations/";
const animationsJson = fs.readdirSync(animationsPath).map((name) => {
  return `./dist/assets/animations/${name}.json`;
});
const targetPath = [
  ...animationsJson
];

// アニメーション対象をまとめる
targetPath.forEach((path) => {
  const json = JSON.parse(fs.readFileSync(path, "utf-8"));
  frames = Object.keys(json.frames);

  animations = {};
  names = frames.forEach((value) => {
    const name = value.split("_")[0];
    if (!animations[name]) {
      animations[name] = [];
    }
    animations[name].push(value);
  });
  json["animations"] = animations;

  fs.writeFileSync(path, JSON.stringify(json));
});