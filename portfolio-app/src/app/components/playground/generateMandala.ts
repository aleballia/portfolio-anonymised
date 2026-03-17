export interface MandalaRegion {
  id: string;
  d: string;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function petalPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  sweepAngle: number
): string {
  const halfSweep = sweepAngle / 2;
  const midAngle = startAngle + halfSweep;

  const p1 = polarToCartesian(cx, cy, innerR, startAngle);
  const tip = polarToCartesian(cx, cy, outerR, midAngle);
  const p2 = polarToCartesian(cx, cy, innerR, startAngle + sweepAngle);

  const bulge = (outerR - innerR) * 0.55;
  const cp1 = polarToCartesian(cx, cy, innerR + bulge, startAngle + halfSweep * 0.3);
  const cp2 = polarToCartesian(cx, cy, innerR + bulge, startAngle + sweepAngle - halfSweep * 0.3);

  return [
    `M ${p1.x} ${p1.y}`,
    `Q ${cp1.x} ${cp1.y} ${tip.x} ${tip.y}`,
    `Q ${cp2.x} ${cp2.y} ${p2.x} ${p2.y}`,
    "Z",
  ].join(" ");
}

function arcSegmentPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  sweepAngle: number
): string {
  const endAngle = startAngle + sweepAngle;

  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);

  const largeArc = sweepAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function diamondPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  sweepAngle: number
): string {
  const midAngle = startAngle + sweepAngle / 2;
  const midR = (innerR + outerR) / 2;

  const top = polarToCartesian(cx, cy, outerR, midAngle);
  const right = polarToCartesian(cx, cy, midR, startAngle + sweepAngle);
  const bottom = polarToCartesian(cx, cy, innerR, midAngle);
  const left = polarToCartesian(cx, cy, midR, startAngle);

  return `M ${top.x} ${top.y} L ${right.x} ${right.y} L ${bottom.x} ${bottom.y} L ${left.x} ${left.y} Z`;
}

type ShapeType = "petal" | "arc" | "diamond";

const SHAPE_BUILDERS: Record<
  ShapeType,
  (cx: number, cy: number, iR: number, oR: number, startA: number, sweep: number) => string
> = {
  petal: petalPath,
  arc: arcSegmentPath,
  diamond: diamondPath,
};

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function generateMandala(seed?: number): MandalaRegion[] {
  const rng = seededRandom(seed ?? Math.floor(Math.random() * 2147483646) + 1);

  const cx = 500;
  const cy = 500;
  const maxRadius = 460;
  const ringCount = 3 + Math.floor(rng() * 3); // 3-5
  const foldCount = pick([6, 8, 10, 12], rng);
  const sweepAngle = 360 / foldCount;

  const regions: MandalaRegion[] = [];

  const ringRadii: number[] = [30];
  for (let i = 1; i <= ringCount; i++) {
    ringRadii.push(30 + ((maxRadius - 30) * i) / ringCount);
  }

  for (let ring = 0; ring < ringCount; ring++) {
    const innerR = ringRadii[ring];
    const outerR = ringRadii[ring + 1];
    const shape = pick<ShapeType>(["petal", "arc", "diamond"], rng);
    const builder = SHAPE_BUILDERS[shape];

    const subdivide = rng() > 0.5 && shape === "arc" ? 2 : 1;
    const subSweep = sweepAngle / subdivide;

    for (let seg = 0; seg < foldCount; seg++) {
      for (let sub = 0; sub < subdivide; sub++) {
        const startAngle = seg * sweepAngle + sub * subSweep;
        regions.push({
          id: `r${ring}-s${seg}-${sub}`,
          d: builder(cx, cy, innerR, outerR, startAngle, subSweep),
        });
      }
    }
  }

  // Center circle
  const centerR = ringRadii[0];
  regions.push({
    id: "center",
    d: [
      `M ${cx - centerR} ${cy}`,
      `A ${centerR} ${centerR} 0 1 1 ${cx + centerR} ${cy}`,
      `A ${centerR} ${centerR} 0 1 1 ${cx - centerR} ${cy}`,
      "Z",
    ].join(" "),
  });

  return regions;
}
