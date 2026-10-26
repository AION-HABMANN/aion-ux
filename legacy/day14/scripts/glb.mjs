// Minimal, dependency-free binary glTF (.glb) writer.
//
// Everything the playground renders in 3D is generated from code here, so the
// repository never needs to download an asset from a CDN and every learner
// loads byte-identical geometry. Only flat-shaded boxes and cylinders are
// supported — that is all the low-poly teaching objects require.

const F32 = 5126;
const U16 = 5123;
const ARRAY_BUFFER = 34962;
const ELEMENT_ARRAY_BUFFER = 34963;

export function box({ size, position = [0, 0, 0], color, metallic = 0.1, roughness = 0.75 }) {
  const [sx, sy, sz] = size;
  const [px, py, pz] = position;
  const hx = sx / 2;
  const hy = sy / 2;
  const hz = sz / 2;

  // Six flat-shaded faces -> 24 vertices, so normals stay crisp on low-poly art.
  const faces = [
    { n: [0, 0, 1], v: [[-hx, -hy, hz], [hx, -hy, hz], [hx, hy, hz], [-hx, hy, hz]] },
    { n: [0, 0, -1], v: [[hx, -hy, -hz], [-hx, -hy, -hz], [-hx, hy, -hz], [hx, hy, -hz]] },
    { n: [1, 0, 0], v: [[hx, -hy, hz], [hx, -hy, -hz], [hx, hy, -hz], [hx, hy, hz]] },
    { n: [-1, 0, 0], v: [[-hx, -hy, -hz], [-hx, -hy, hz], [-hx, hy, hz], [-hx, hy, -hz]] },
    { n: [0, 1, 0], v: [[-hx, hy, hz], [hx, hy, hz], [hx, hy, -hz], [-hx, hy, -hz]] },
    { n: [0, -1, 0], v: [[-hx, -hy, -hz], [hx, -hy, -hz], [hx, -hy, hz], [-hx, -hy, hz]] },
  ];

  const positions = [];
  const normals = [];
  const indices = [];
  faces.forEach((face, f) => {
    face.v.forEach((v) => {
      positions.push(v[0] + px, v[1] + py, v[2] + pz);
      normals.push(...face.n);
    });
    const b = f * 4;
    indices.push(b, b + 1, b + 2, b, b + 2, b + 3);
  });

  return { positions, normals, indices, color, metallic, roughness };
}

export function cylinder({
  radius,
  height,
  position = [0, 0, 0],
  segments = 16,
  axis = 'y',
  color,
  metallic = 0.1,
  roughness = 0.75,
}) {
  const positions = [];
  const normals = [];
  const indices = [];
  const half = height / 2;

  // Build along +Y, then remap onto the requested axis.
  const place = (x, y, z) => {
    if (axis === 'y') return [x, y, z];
    if (axis === 'x') return [y, x, z];
    return [x, z, y];
  };
  const [px, py, pz] = position;
  const push = (p, n) => {
    const [x, y, z] = place(p[0], p[1], p[2]);
    const [nx, ny, nz] = place(n[0], n[1], n[2]);
    positions.push(x + px, y + py, z + pz);
    normals.push(nx, ny, nz);
  };

  for (let i = 0; i < segments; i += 1) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    const c0 = Math.cos(a0);
    const s0 = Math.sin(a0);
    const c1 = Math.cos(a1);
    const s1 = Math.sin(a1);
    const base = positions.length / 3;

    push([c0 * radius, -half, s0 * radius], [c0, 0, s0]);
    push([c1 * radius, -half, s1 * radius], [c1, 0, s1]);
    push([c1 * radius, half, s1 * radius], [c1, 0, s1]);
    push([c0 * radius, half, s0 * radius], [c0, 0, s0]);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);

    const top = positions.length / 3;
    push([0, half, 0], [0, 1, 0]);
    push([c0 * radius, half, s0 * radius], [0, 1, 0]);
    push([c1 * radius, half, s1 * radius], [0, 1, 0]);
    indices.push(top, top + 1, top + 2);

    const bottom = positions.length / 3;
    push([0, -half, 0], [0, -1, 0]);
    push([c1 * radius, -half, s1 * radius], [0, -1, 0]);
    push([c0 * radius, -half, s0 * radius], [0, -1, 0]);
    indices.push(bottom, bottom + 1, bottom + 2);
  }

  return { positions, normals, indices, color, metallic, roughness };
}

function pad4(n) {
  return (4 - (n % 4)) % 4;
}

export function writeGlb(parts) {
  const json = {
    asset: { version: '2.0', generator: 'aion-ux-playground-asset-generator' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [{ primitives: [] }],
    materials: [],
    accessors: [],
    bufferViews: [],
    buffers: [],
  };

  const chunks = [];
  let offset = 0;
  const appendBuffer = (buf, target) => {
    const padding = pad4(offset);
    if (padding) {
      chunks.push(Buffer.alloc(padding));
      offset += padding;
    }
    const view = { buffer: 0, byteOffset: offset, byteLength: buf.length };
    if (target) view.target = target;
    json.bufferViews.push(view);
    chunks.push(buf);
    offset += buf.length;
    return json.bufferViews.length - 1;
  };

  parts.forEach((part) => {
    const pos = Float32Array.from(part.positions);
    const nor = Float32Array.from(part.normals);
    const idx = Uint16Array.from(part.indices);

    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < pos.length; i += 3) {
      for (let k = 0; k < 3; k += 1) {
        min[k] = Math.min(min[k], pos[i + k]);
        max[k] = Math.max(max[k], pos[i + k]);
      }
    }

    const posView = appendBuffer(Buffer.from(pos.buffer, pos.byteOffset, pos.byteLength), ARRAY_BUFFER);
    const norView = appendBuffer(Buffer.from(nor.buffer, nor.byteOffset, nor.byteLength), ARRAY_BUFFER);
    const idxView = appendBuffer(
      Buffer.from(idx.buffer, idx.byteOffset, idx.byteLength),
      ELEMENT_ARRAY_BUFFER,
    );

    json.accessors.push({
      bufferView: posView,
      componentType: F32,
      count: pos.length / 3,
      type: 'VEC3',
      min,
      max,
    });
    const posAccessor = json.accessors.length - 1;

    json.accessors.push({
      bufferView: norView,
      componentType: F32,
      count: nor.length / 3,
      type: 'VEC3',
    });
    const norAccessor = json.accessors.length - 1;

    json.accessors.push({
      bufferView: idxView,
      componentType: U16,
      count: idx.length,
      type: 'SCALAR',
    });
    const idxAccessor = json.accessors.length - 1;

    json.materials.push({
      pbrMetallicRoughness: {
        baseColorFactor: part.color,
        metallicFactor: part.metallic,
        roughnessFactor: part.roughness,
      },
      doubleSided: false,
    });

    json.meshes[0].primitives.push({
      attributes: { POSITION: posAccessor, NORMAL: norAccessor },
      indices: idxAccessor,
      material: json.materials.length - 1,
    });
  });

  const bin = Buffer.concat(chunks);
  json.buffers.push({ byteLength: bin.length });

  const jsonBuf = Buffer.from(JSON.stringify(json), 'utf8');
  const jsonPad = Buffer.alloc(pad4(jsonBuf.length), 0x20);
  const binPad = Buffer.alloc(pad4(bin.length), 0);

  const jsonChunk = Buffer.concat([jsonBuf, jsonPad]);
  const binChunk = Buffer.concat([bin, binPad]);

  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0); // "glTF"
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + jsonChunk.length + 8 + binChunk.length, 8);

  const jsonHeader = Buffer.alloc(8);
  jsonHeader.writeUInt32LE(jsonChunk.length, 0);
  jsonHeader.writeUInt32LE(0x4e4f534a, 4); // "JSON"

  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(binChunk.length, 0);
  binHeader.writeUInt32LE(0x004e4942, 4); // "BIN"

  return Buffer.concat([header, jsonHeader, jsonChunk, binHeader, binChunk]);
}
