"use client";

import { useMotionValue } from "framer-motion";
import * as React from "react";
import {
  useEffect,
  useMemo,
  useRef,
} from "react";

const useIsStaticRenderer = () => false;

type GalleryImage = {
  src: string;
  srcSet?: string;
  alt?: string;
};

interface InfiniteGalleryProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  images?: GalleryImage[];
  density?: number;
  imageWidth?: number;
  imageHeight?: number;
  rounded?: number;
  dragSpeed?: number;
  driftAmount?: number;
  friction?: number;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

const DEFAULT_IMAGES: GalleryImage[] = [
  {
    src: "/images/gallery/photo-1.jpg",
    alt: "Wedding gallery photo 1",
  },
  {
    src: "/images/gallery/photo-2.jpg",
    alt: "Wedding gallery photo 2",
  },
  {
    src: "/images/gallery/photo-3.jpg",
    alt: "Wedding gallery photo 3",
  },
  {
    src: "/images/gallery/photo-4.jpg",
    alt: "Wedding gallery photo 4",
  },
  {
    src: "/images/gallery/photo-5.jpg",
    alt: "Wedding gallery photo 5",
  },
  {
    src: "/images/gallery/photo-6.jpg",
    alt: "Wedding gallery photo 6",
  },
];

function hash3(
  cx: number,
  cy: number,
  cz: number,
  salt: number,
) {
  let h = (cx | 0) * 0x8da6b343;

  h ^= Math.imul(
    cy | 0,
    0xd8163841,
  );

  h ^= Math.imul(
    cz | 0,
    0xcb1ab31f,
  );

  h ^= salt | 0;

  h ^= h >>> 16;

  h = Math.imul(
    h,
    0x7feb352d,
  );

  h ^= h >>> 15;

  h = Math.imul(
    h,
    0x846ca68b,
  );

  h ^= h >>> 16;

  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;

  return () => {
    a =
      (a + 0x6d2b79f5) >>>
      0;

    let t = a;

    t = Math.imul(
      t ^ (t >>> 15),
      t | 1,
    );

    t ^=
      t +
      Math.imul(
        t ^ (t >>> 7),
        t | 61,
      );

    return (
      ((t ^ (t >>> 14)) >>>
        0) /
      4294967296
    );
  };
}

function lerp(
  a: number,
  b: number,
  t: number,
) {
  return a + (b - a) * t;
}

type Tile = {
  wx: number;
  wy: number;

  cx: number;
  cy: number;

  slot: number;
  octave: number;

  imgIdx: number;

  w: number;
  h: number;

  rot: number;

  bakedScale: number;
};

const PX_PER_UNIT = 6;

const CELL_SIZE = 110;

const MAX_RANGE = 20;

export default function InfiniteGallery(
  props: InfiniteGalleryProps,
) {
  const mergedProps = {
    ...COMPONENT_DEFAULTS,
    ...props,
  };

  const {
    width,
    height,
    className,
    images,
    density,
    imageWidth,
    imageHeight,
    rounded,
    dragSpeed,
    driftAmount,
    friction,
    backgroundColor,
    style,
  } = mergedProps;

  const containerRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const sceneRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const isStatic =
    useIsStaticRenderer();

  const safeImages =
    Array.isArray(images) &&
    images.length > 0
      ? images
      : DEFAULT_IMAGES;

  const safeDensity = Math.max(
    1,
    Math.min(
      15,
      Math.floor(density || 5),
    ),
  );

  const safeImageWidth =
    Math.max(
      8,
      Math.min(
        4000,
        imageWidth || 220,
      ),
    );

  const safeImageHeight =
    Math.max(
      8,
      Math.min(
        4000,
        imageHeight || 280,
      ),
    );

  const safeRounded = Math.max(
    0,
    Math.min(
      20,
      rounded ?? 3,
    ),
  );

  const safeDragSpeed =
    Math.max(
      0.1,
      Math.min(
        5,
        (dragSpeed || 20) / 20,
      ),
    );

  const safeDriftAmount =
    Math.max(
      0,
      Math.min(
        20,
        driftAmount ?? 8,
      ),
    );

  const safeFriction =
    1 -
    (Math.max(
      1,
      Math.min(
        20,
        friction ?? 10,
      ),
    ) /
      20) *
      0.3;

  const targetX =
    useMotionValue(0);

  const targetY =
    useMotionValue(0);

  const camX =
    useMotionValue(0);

  const camY =
    useMotionValue(0);

  const velX =
    useMotionValue(0);

  const velY =
    useMotionValue(0);

  const targetLogZoom =
    useMotionValue(0);

  const logZoom =
    useMotionValue(0);

  const velLogZoom =
    useMotionValue(0);

  const driftTX =
    useMotionValue(0);

  const driftTY =
    useMotionValue(0);

  const driftX =
    useMotionValue(0);

  const driftY =
    useMotionValue(0);

  const subN = Math.max(
    1,
    Math.ceil(
      Math.sqrt(safeDensity),
    ),
  );

  const subSize =
    CELL_SIZE / subN;

  const SUBCELL_INNER_PAD =
    0.1;

  const effectivePerCell =
    Math.min(
      safeDensity,
      subN * subN,
    );

  const imagesCount =
    safeImages.length;

  const SCALE_MIN = 0.45;

  const SCALE_MAX = 1.6;

  const generateCell =
    useMemo(() => {
      return (
        gx: number,
        gy: number,
        octave: number,
      ): Tile[] => {
        const seed = hash3(
          gx,
          gy,
          octave | 0,
          0x9e3779b1,
        );

        const rand =
          mulberry32(seed);

        const totalSubs =
          subN * subN;

        const subs =
          new Array<number>(
            totalSubs,
          );

        for (
          let i = 0;
          i < totalSubs;
          i += 1
        ) {
          subs[i] = i;
        }

        for (
          let i =
            totalSubs - 1;
          i > 0;
          i -= 1
        ) {
          const j =
            Math.floor(
              rand() *
                (i + 1),
            );

          const temp =
            subs[i];

          subs[i] =
            subs[j];

          subs[j] =
            temp;
        }

        const tiles: Tile[] =
          [];

        const count =
          Math.min(
            effectivePerCell,
            totalSubs,
          );

        const pad =
          subSize *
          SUBCELL_INNER_PAD;

        const innerRange =
          Math.max(
            0,
            subSize -
              pad * 2,
          );

        const cellX0 =
          gx * CELL_SIZE;

        const cellY0 =
          gy * CELL_SIZE;

        const wWorld =
          safeImageWidth /
          PX_PER_UNIT;

        const hWorld =
          safeImageHeight /
          PX_PER_UNIT;

        for (
          let slot = 0;
          slot < count;
          slot += 1
        ) {
          const subIdx =
            subs[slot];

          const sx =
            subIdx % subN;

          const sy =
            Math.floor(
              subIdx /
                subN,
            );

          const wx =
            cellX0 +
            sx * subSize +
            pad +
            rand() *
              innerRange;

          const wy =
            cellY0 +
            sy * subSize +
            pad +
            rand() *
              innerRange;

          const bakedScale =
            SCALE_MIN +
            rand() *
              (SCALE_MAX -
                SCALE_MIN);

          const imgIdx =
            imagesCount > 0
              ? Math.floor(
                  rand() *
                    imagesCount,
                ) %
                imagesCount
              : 0;

          tiles.push({
            wx,
            wy,
            cx: gx,
            cy: gy,
            slot,
            octave,
            imgIdx,
            w: wWorld,
            h: hWorld,
            rot: 0,
            bakedScale,
          });
        }

        return tiles;
      };
    }, [
      effectivePerCell,
      imagesCount,
      safeImageHeight,
      safeImageWidth,
      subN,
      subSize,
    ]);

  useEffect(() => {
    const scene =
      sceneRef.current;

    const container =
      containerRef.current;

    if (
      !scene ||
      !container
    ) {
      return;
    }

    /*
     * Important:
     *
     * After the null check, copy the references into
     * non-null variables. This prevents TypeScript from
     * treating them as possibly null inside nested functions.
     */
    const sceneElement =
      scene;

    const containerElement =
      container;

    let cW =
      containerElement.clientWidth ||
      window.innerWidth;

    let cH =
      containerElement.clientHeight ||
      window.innerHeight;

    const resizeObserver =
      new ResizeObserver(
        () => {
          cW =
            containerElement.clientWidth ||
            cW;

          cH =
            containerElement.clientHeight ||
            cH;
        },
      );

    resizeObserver.observe(
      containerElement,
    );

    const layerPools =
      new Map<
        number,
        {
          tileEls: Map<
            string,
            HTMLDivElement
          >;

          imgEls: Map<
            string,
            HTMLImageElement
          >;
        }
      >();

    function getPool(
      octave: number,
    ) {
      let pool =
        layerPools.get(
          octave,
        );

      if (!pool) {
        pool = {
          tileEls:
            new Map(),

          imgEls:
            new Map(),
        };

        layerPools.set(
          octave,
          pool,
        );
      }

      return pool;
    }

    function disposeLayer(
      octave: number,
    ) {
      const pool =
        layerPools.get(
          octave,
        );

      if (!pool) {
        return;
      }

      pool.tileEls.forEach(
        (element) => {
          if (
            element.parentNode ===
            sceneElement
          ) {
            sceneElement.removeChild(
              element,
            );
          }
        },
      );

      pool.tileEls.clear();

      pool.imgEls.clear();

      layerPools.delete(
        octave,
      );
    }

    function disposeAllLayers() {
      Array.from(
        layerPools.keys(),
      ).forEach(
        disposeLayer,
      );
    }

    function removeTile(
      octave: number,
      key: string,
    ) {
      const pool =
        layerPools.get(
          octave,
        );

      if (!pool) {
        return;
      }

      const element =
        pool.tileEls.get(
          key,
        );

      if (
        element &&
        element.parentNode ===
          sceneElement
      ) {
        sceneElement.removeChild(
          element,
        );
      }

      pool.tileEls.delete(
        key,
      );

      pool.imgEls.delete(
        key,
      );
    }

    function ensureTile(
      tile: Tile,
    ): HTMLDivElement {
      const pool =
        getPool(
          tile.octave,
        );

      const key = `${tile.cx},${tile.cy},${tile.slot}`;

      let element =
        pool.tileEls.get(
          key,
        );

      if (!element) {
        element =
          document.createElement(
            "div",
          );

        element.style.position =
          "absolute";

        element.style.left =
          "50%";

        element.style.top =
          "50%";

        element.style.display =
          "block";

        element.style.visibility =
          "visible";

        element.style.transformOrigin =
          "0 0";

        element.style.willChange =
          "transform, opacity";

        element.style.pointerEvents =
          "none";

        element.style.overflow =
          "hidden";

        element.dataset.tileKey =
          key;

        const image =
          document.createElement(
            "img",
          );

        const imageData =
          safeImages[
            tile.imgIdx
          ];

        image.src =
          imageData?.src ??
          "";

        if (
          imageData?.srcSet
        ) {
          image.srcset =
            imageData.srcSet;
        }

        image.alt =
          imageData?.alt ??
          "";

        image.draggable =
          false;

        image.loading =
          "eager";

        image.decoding =
          "async";

        image.style.width =
          "100%";

        image.style.height =
          "100%";

        image.style.objectFit =
          "cover";

        image.style.display =
          "block";

        image.style.opacity =
          "1";

        image.style.visibility =
          "visible";

        image.style.pointerEvents =
          "none";

        image.style.userSelect =
          "none";

        image.style.maxWidth =
          "none";

        image.addEventListener(
          "error",
          () => {
            console.error(
              "Gallery image failed to load:",
              image.src,
            );
          },
        );

        element.appendChild(
          image,
        );

        sceneElement.appendChild(
          element,
        );

        pool.tileEls.set(
          key,
          element,
        );

        pool.imgEls.set(
          key,
          image,
        );
      }

      return element;
    }

    function projectLayer(
      octave: number,
      layerScale: number,
      layerAlpha: number,
      layerZBase: number,
      cx: number,
      cy: number,
    ) {
      const pool =
        getPool(octave);

      const camCellX =
        Math.floor(
          cx / CELL_SIZE,
        );

      const camCellY =
        Math.floor(
          cy / CELL_SIZE,
        );

      const worldHalfX =
        cW /
        2 /
        (PX_PER_UNIT *
          layerScale);

      const worldHalfY =
        cH /
        2 /
        (PX_PER_UNIT *
          layerScale);

      const rangeX =
        Math.min(
          MAX_RANGE,
          Math.ceil(
            worldHalfX /
              CELL_SIZE,
          ) + 2,
        );

      const rangeY =
        Math.min(
          MAX_RANGE,
          Math.ceil(
            worldHalfY /
              CELL_SIZE,
          ) + 2,
        );

      const visibleKeys =
        new Set<string>();

      const tilesThisFrame:
        Tile[] = [];

      for (
        let dy = -rangeY;
        dy <= rangeY;
        dy += 1
      ) {
        for (
          let dx = -rangeX;
          dx <= rangeX;
          dx += 1
        ) {
          const tiles =
            generateCell(
              camCellX +
                dx,
              camCellY +
                dy,
              octave,
            );

          for (
            let i = 0;
            i <
            tiles.length;
            i += 1
          ) {
            tilesThisFrame.push(
              tiles[i],
            );
          }
        }
      }

      const orderKeys =
        new Array<string>(
          tilesThisFrame.length,
        );

      const orderScale =
        new Array<number>(
          tilesThisFrame.length,
        );

      for (
        let i = 0;
        i <
        tilesThisFrame.length;
        i += 1
      ) {
        const tile =
          tilesThisFrame[i];

        const key = `${tile.cx},${tile.cy},${tile.slot}`;

        visibleKeys.add(
          key,
        );

        const dxPx =
          (tile.wx - cx) *
          layerScale *
          PX_PER_UNIT;

        const dyPx =
          (tile.wy - cy) *
          layerScale *
          PX_PER_UNIT;

        const scale =
          tile.bakedScale *
          layerScale;

        const element =
          ensureTile(tile);

        const image =
          pool.imgEls.get(
            key,
          );

        const wPx =
          tile.w *
          PX_PER_UNIT;

        const hPx =
          tile.h *
          PX_PER_UNIT;

        element.style.width =
          `${wPx}px`;

        element.style.height =
          `${hPx}px`;

        element.style.opacity =
          String(
            Math.max(
              0,
              Math.min(
                1,
                layerAlpha,
              ),
            ),
          );

        element.style.transform = `
          translate3d(
            ${dxPx}px,
            ${dyPx}px,
            0
          )
          scale(${scale})
          rotate(${tile.rot}deg)
          translate(
            ${-wPx / 2}px,
            ${-hPx / 2}px
          )
        `;

        if (image) {
          const radiusPx =
            (safeRounded /
              20) *
            (Math.min(
              wPx,
              hPx,
            ) /
              2);

          image.style.borderRadius =
            `${radiusPx}px`;
        }

        orderKeys[i] =
          key;

        orderScale[i] =
          tile.bakedScale;
      }

      for (const key of Array.from(
        pool.tileEls.keys(),
      )) {
        if (
          !visibleKeys.has(
            key,
          )
        ) {
          removeTile(
            octave,
            key,
          );
        }
      }

      const indexes =
        orderKeys.map(
          (_, index) =>
            index,
        );

      indexes.sort(
        (a, b) =>
          orderScale[a] -
          orderScale[b],
      );

      for (
        let index = 0;
        index <
        indexes.length;
        index += 1
      ) {
        const element =
          pool.tileEls.get(
            orderKeys[
              indexes[index]
            ],
          );

        if (element) {
          element.style.zIndex =
            String(
              layerZBase +
                index,
            );
        }
      }
    }

    let lastOctaves =
      new Set<number>();

    function project() {
      const cx =
        camX.get();

      const cy =
        camY.get();

      const currentLogZoom =
        logZoom.get();

      const octave =
        Math.floor(
          currentLogZoom,
        );

      const fraction =
        currentLogZoom -
        octave;

      const scaleCurrent =
        Math.pow(
          2,
          fraction,
        );

      const scaleNext =
        Math.pow(
          2,
          fraction - 1,
        );

      const alphaCurrent =
        1 - fraction;

      const alphaNext =
        fraction;

      projectLayer(
        octave,
        scaleCurrent,
        alphaCurrent,
        0,
        cx,
        cy,
      );

      projectLayer(
        octave + 1,
        scaleNext,
        alphaNext,
        100000,
        cx,
        cy,
      );

      const currentOctaves =
        new Set<number>([
          octave,
          octave + 1,
        ]);

      for (const oldOctave of Array.from(
        lastOctaves,
      )) {
        if (
          !currentOctaves.has(
            oldOctave,
          )
        ) {
          disposeLayer(
            oldOctave,
          );
        }
      }

      for (const oldOctave of Array.from(
        layerPools.keys(),
      )) {
        if (
          !currentOctaves.has(
            oldOctave,
          )
        ) {
          disposeLayer(
            oldOctave,
          );
        }
      }

      lastOctaves =
        currentOctaves;
    }

    project();

    if (isStatic) {
      resizeObserver.disconnect();

      return;
    }

    let animationFrame =
      0;

    function loop() {
      const nextTargetX =
        targetX.get() +
        velX.get();

      const nextTargetY =
        targetY.get() +
        velY.get();

      targetX.set(
        nextTargetX,
      );

      targetY.set(
        nextTargetY,
      );

      velX.set(
        velX.get() *
          safeFriction,
      );

      velY.set(
        velY.get() *
          safeFriction,
      );

      const zoomVelocity =
        velLogZoom.get();

      if (
        zoomVelocity !== 0
      ) {
        targetLogZoom.set(
          targetLogZoom.get() +
            zoomVelocity,
        );

        velLogZoom.set(
          zoomVelocity *
            safeFriction,
        );
      }

      driftX.set(
        lerp(
          driftX.get(),
          driftTX.get() *
            safeDriftAmount,
          0.08,
        ),
      );

      driftY.set(
        lerp(
          driftY.get(),
          driftTY.get() *
            safeDriftAmount,
          0.08,
        ),
      );

      camX.set(
        lerp(
          camX.get(),
          targetX.get() +
            driftX.get(),
          0.18,
        ),
      );

      camY.set(
        lerp(
          camY.get(),
          targetY.get() +
            driftY.get(),
          0.18,
        ),
      );

      logZoom.set(
        lerp(
          logZoom.get(),
          targetLogZoom.get(),
          0.18,
        ),
      );

      project();

      animationFrame =
        requestAnimationFrame(
          loop,
        );
    }

    animationFrame =
      requestAnimationFrame(
        loop,
      );

    return () => {
      cancelAnimationFrame(
        animationFrame,
      );

      resizeObserver.disconnect();

      disposeAllLayers();
    };
  }, [
    camX,
    camY,
    driftTX,
    driftTY,
    driftX,
    driftY,
    generateCell,
    isStatic,
    logZoom,
    safeDriftAmount,
    safeFriction,
    safeImages,
    safeRounded,
    targetLogZoom,
    targetX,
    targetY,
    velLogZoom,
    velX,
    velY,
  ]);

  useEffect(() => {
    const element =
      containerRef.current;

    if (
      !element ||
      isStatic
    ) {
      return;
    }

    const containerElement =
      element;

    let dragging =
      false;

    let lastPX = 0;

    let lastPY = 0;

    let lastT = 0;

    let pointerId:
      number | null =
      null;

    function onPointerDown(
      event: PointerEvent,
    ) {
      if (
        event.button !== 0 &&
        event.pointerType ===
          "mouse"
      ) {
        return;
      }

      dragging = true;

      pointerId =
        event.pointerId;

      lastPX =
        event.clientX;

      lastPY =
        event.clientY;

      lastT =
        event.timeStamp;

      try {
        containerElement.setPointerCapture(
          event.pointerId,
        );
      } catch {
        // Pointer capture may not be available.
      }

      containerElement.style.cursor =
        "grabbing";
    }

    function onPointerMove(
      event: PointerEvent,
    ) {
      const rect =
        containerElement.getBoundingClientRect();

      const nx =
        ((event.clientX -
          rect.left) /
          rect.width) *
          2 -
        1;

      const ny =
        ((event.clientY -
          rect.top) /
          rect.height) *
          2 -
        1;

      driftTX.set(
        Math.max(
          -1,
          Math.min(
            1,
            nx,
          ),
        ),
      );

      driftTY.set(
        Math.max(
          -1,
          Math.min(
            1,
            ny,
          ),
        ),
      );

      if (
        !dragging ||
        event.pointerId !==
          pointerId
      ) {
        return;
      }

      const deltaPX =
        event.clientX -
        lastPX;

      const deltaPY =
        event.clientY -
        lastPY;

      const currentLogZoom =
        logZoom.get();

      const fraction =
        currentLogZoom -
        Math.floor(
          currentLogZoom,
        );

      const effectiveScale =
        (1 - fraction) *
          Math.pow(
            2,
            fraction,
          ) +
        fraction *
          Math.pow(
            2,
            fraction - 1,
          );

      const deltaWorldX =
        (-deltaPX /
          (PX_PER_UNIT *
            effectiveScale)) *
        safeDragSpeed;

      const deltaWorldY =
        (-deltaPY /
          (PX_PER_UNIT *
            effectiveScale)) *
        safeDragSpeed;

      targetX.set(
        targetX.get() +
          deltaWorldX,
      );

      targetY.set(
        targetY.get() +
          deltaWorldY,
      );

      const deltaTime =
        Math.max(
          1,
          event.timeStamp -
            lastT,
        );

      const velocityMultiplier =
        16 / deltaTime;

      velX.set(
        deltaWorldX *
          velocityMultiplier,
      );

      velY.set(
        deltaWorldY *
          velocityMultiplier,
      );

      lastPX =
        event.clientX;

      lastPY =
        event.clientY;

      lastT =
        event.timeStamp;
    }

    function onPointerUp(
      event: PointerEvent,
    ) {
      if (
        !dragging ||
        event.pointerId !==
          pointerId
      ) {
        return;
      }

      dragging =
        false;

      pointerId =
        null;

      try {
        containerElement.releasePointerCapture(
          event.pointerId,
        );
      } catch {
        // Ignore.
      }

      containerElement.style.cursor =
        "grab";
    }

    function onPointerCancel(
      event: PointerEvent,
    ) {
      onPointerUp(
        event,
      );
    }

    function onWheel(
      event: WheelEvent,
    ) {
      event.preventDefault();

      let delta =
        event.deltaY;

      if (
        event.deltaMode ===
        1
      ) {
        delta *= 16;
      } else if (
        event.deltaMode ===
        2
      ) {
        delta *= 400;
      }

      const step =
        -delta *
        0.0015 *
        safeDragSpeed;

      velLogZoom.set(
        velLogZoom.get() +
          step,
      );
    }

    function onLeave() {
      driftTX.set(0);
      driftTY.set(0);
    }

    containerElement.addEventListener(
      "pointerdown",
      onPointerDown,
    );

    containerElement.addEventListener(
      "pointermove",
      onPointerMove,
    );

    containerElement.addEventListener(
      "pointerup",
      onPointerUp,
    );

    containerElement.addEventListener(
      "pointercancel",
      onPointerCancel,
    );

    containerElement.addEventListener(
      "wheel",
      onWheel,
      {
        passive: false,
      },
    );

    containerElement.addEventListener(
      "pointerleave",
      onLeave,
    );

    containerElement.style.cursor =
      "grab";

    return () => {
      containerElement.removeEventListener(
        "pointerdown",
        onPointerDown,
      );

      containerElement.removeEventListener(
        "pointermove",
        onPointerMove,
      );

      containerElement.removeEventListener(
        "pointerup",
        onPointerUp,
      );

      containerElement.removeEventListener(
        "pointercancel",
        onPointerCancel,
      );

      containerElement.removeEventListener(
        "wheel",
        onWheel,
      );

      containerElement.removeEventListener(
        "pointerleave",
        onLeave,
      );
    };
  }, [
    driftTX,
    driftTY,
    isStatic,
    logZoom,
    safeDragSpeed,
    targetX,
    targetY,
    velLogZoom,
    velX,
    velY,
  ]);

  function resolveDimension(
    value:
      | string
      | number
      | undefined,
    fallback: string,
  ): string {
    if (
      value == null
    ) {
      return fallback;
    }

    if (
      typeof value ===
      "number"
    ) {
      return `${value}px`;
    }

    return value;
  }

  const wrapperStyle:
    React.CSSProperties = {
      position: "relative",

      width:
        resolveDimension(
          width,
          "100%",
        ),

      height:
        resolveDimension(
          height,
          "100vh",
        ),

      minWidth: 0,

      minHeight: "100vh",

      overflow: "hidden",

      backgroundColor,

      touchAction: "none",

      userSelect: "none",

      cursor: "grab",

      ...style,
    };

  const sceneStyle:
    React.CSSProperties = {
      position:
        "absolute",

      inset: 0,

      width: "100%",

      height: "100%",

      overflow:
        "visible",

      pointerEvents:
        "none",
    };

  return (
    <div
      ref={
        containerRef
      }
      className={
        className
      }
      style={
        wrapperStyle
      }
    >
      <div
        ref={
          sceneRef
        }
        style={
          sceneStyle
        }
      />
    </div>
  );
}

const COMPONENT_DEFAULTS = {
  width:
    "100%",

  height:
    "100vh",

  className:
    "",

  images:
    DEFAULT_IMAGES,

  density:
    5,

  imageWidth:
    220,

  imageHeight:
    280,

  rounded:
    3,

  dragSpeed:
    20,

  driftAmount:
    12,

  friction:
    10,

  backgroundColor:
    "#F8F5EE",
};