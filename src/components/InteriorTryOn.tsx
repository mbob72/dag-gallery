'use client';

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type PointerEvent } from 'react';
import { DownloadIcon, ImageIcon, MoveIcon, UploadIcon } from './icons';
import { Container } from './Container';

type InteriorTryOnProps = {
  artwork: {
    id: string;
    title: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
    dimensions?: string;
  };
};

type SceneImage = {
  src: string;
  isObjectUrl: boolean;
};

type ImageSize = {
  width: number;
  height: number;
};

type Position = {
  x: number;
  y: number;
};

type ScrollSnapshot = {
  element: Element;
  left: number;
  top: number;
};

type PhysicalSize = {
  widthCm: number;
  heightCm: number;
};

const defaultBackgroundSrc = '/interiors/artwork-try-on-default-narrow.png';
const defaultBackgroundSize: ImageSize = { width: 1122, height: 1402 };
const outputSize = defaultBackgroundSize;
const defaultWallSize: PhysicalSize = { widthCm: 320, heightCm: 260 };
const wallBounds = {
  left: 12,
  right: 88,
  top: 8,
  bottom: 72,
};
const initialPosition: Position = { x: 50, y: 34 };
const initialScaleAdjustment = 100;
const fallbackArtworkWidthPercent = 24;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizeFilename(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'artwork';
}

function formatCm(value: number) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(value);
}

function parseArtworkDimensions(dimensions: string | undefined, imageWidth: number, imageHeight: number): PhysicalSize | null {
  const matches = dimensions?.match(/\d+(?:[,.]\d+)?/g);

  if (!matches || matches.length < 2) {
    return null;
  }

  const [first, second] = matches.slice(0, 2).map((value) => Number(value.replace(',', '.')));

  if (!Number.isFinite(first) || !Number.isFinite(second) || first <= 0 || second <= 0) {
    return null;
  }

  const longSide = Math.max(first, second);
  const shortSide = Math.min(first, second);

  if (imageWidth > imageHeight) {
    return { widthCm: longSide, heightCm: shortSide };
  }

  if (imageHeight > imageWidth) {
    return { widthCm: shortSide, heightCm: longSide };
  }

  return { widthCm: first, heightCm: second };
}

function getMeasuredWallWidthPercent() {
  return wallBounds.right - wallBounds.left;
}

function drawWallMeasurements(context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, wallSize: PhysicalSize) {
  const left = (canvasWidth * wallBounds.left) / 100;
  const right = (canvasWidth * wallBounds.right) / 100;
  const top = (canvasHeight * wallBounds.top) / 100;
  const bottom = (canvasHeight * wallBounds.bottom) / 100;
  const verticalX = (canvasWidth * 92) / 100;
  const horizontalY = top;

  context.save();
  context.strokeStyle = 'rgba(36, 36, 36, 0.42)';
  context.fillStyle = 'rgba(36, 36, 36, 0.68)';
  context.lineWidth = Math.max(1, canvasWidth * 0.0012);
  context.setLineDash([canvasWidth * 0.008, canvasWidth * 0.006]);
  context.font = `${Math.max(18, Math.round(canvasWidth * 0.018))}px Roboto, Arial, sans-serif`;
  context.textAlign = 'center';
  context.textBaseline = 'bottom';

  context.beginPath();
  context.moveTo(left, horizontalY);
  context.lineTo(right, horizontalY);
  context.stroke();
  context.fillText(`${formatCm(wallSize.widthCm)} см`, canvasWidth / 2, horizontalY - canvasHeight * 0.012);

  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.beginPath();
  context.moveTo(verticalX, top);
  context.lineTo(verticalX, bottom);
  context.stroke();
  context.translate(verticalX + canvasWidth * 0.025, (top + bottom) / 2);
  context.rotate(-Math.PI / 2);
  context.fillText(`${formatCm(wallSize.heightCm)} см`, 0, 0);
  context.restore();
}

function drawImageCover(context: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const imageAspectRatio = image.naturalWidth / image.naturalHeight;
  const canvasAspectRatio = width / height;
  const sourceWidth = imageAspectRatio > canvasAspectRatio
    ? image.naturalHeight * canvasAspectRatio
    : image.naturalWidth;
  const sourceHeight = imageAspectRatio > canvasAspectRatio
    ? image.naturalHeight
    : image.naturalWidth / canvasAspectRatio;
  const sourceX = (image.naturalWidth - sourceWidth) / 2;
  const sourceY = (image.naturalHeight - sourceHeight) / 2;

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);
}

function getScrollSnapshot(anchor: HTMLElement | null): ScrollSnapshot | null {
  let element = anchor?.parentElement ?? null;

  while (element) {
    const style = window.getComputedStyle(element);
    const canScroll = /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight;

    if (canScroll) {
      return {
        element,
        left: element.scrollLeft,
        top: element.scrollTop,
      };
    }

    element = element.parentElement;
  }

  const scrollingElement = document.scrollingElement;

  return scrollingElement
    ? {
        element: scrollingElement,
        left: scrollingElement.scrollLeft,
        top: scrollingElement.scrollTop,
      }
    : null;
}

function restoreScrollSnapshot(snapshot: ScrollSnapshot | null) {
  if (!snapshot) {
    return;
  }

  snapshot.element.scrollTo({
    left: snapshot.left,
    top: snapshot.top,
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Не удалось загрузить изображение: ${src}`));
    image.src = src;
  });
}

export function InteriorTryOn({ artwork }: InteriorTryOnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [background, setBackground] = useState<SceneImage>({
    src: defaultBackgroundSrc,
    isObjectUrl: false,
  });
  const [position, setPosition] = useState<Position>(initialPosition);
  const [scaleAdjustment, setScaleAdjustment] = useState(initialScaleAdjustment);
  const [customArtworkWidthPercent, setCustomArtworkWidthPercent] = useState<number | null>(null);
  const [wallSize, setWallSize] = useState<PhysicalSize>(defaultWallSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dragOffsetRef = useRef<Position>({ x: 0, y: 0 });
  const backgroundRef = useRef(background);
  const scrollSnapshotRef = useRef<ScrollSnapshot | null>(null);

  const resetPlacement = useCallback(() => {
    setPosition(initialPosition);
    setScaleAdjustment(initialScaleAdjustment);
    setCustomArtworkWidthPercent(null);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setIsDragging(false);
    setError(null);
  }, []);

  useEffect(() => {
    backgroundRef.current = background;
  }, [background]);

  useEffect(() => {
    return () => {
      if (backgroundRef.current.isObjectUrl) {
        URL.revokeObjectURL(backgroundRef.current.src);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDialog();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeDialog, isOpen]);

  useEffect(() => {
    const restoreOnFocus = () => {
      window.requestAnimationFrame(() => {
        restoreScrollSnapshot(scrollSnapshotRef.current);
        scrollSnapshotRef.current = null;
      });
    };

    window.addEventListener('focus', restoreOnFocus);

    return () => {
      window.removeEventListener('focus', restoreOnFocus);
    };
  }, []);

  const updatePositionFromPointer = useCallback((clientX: number, clientY: number) => {
    const scene = sceneRef.current;

    if (!scene) {
      return;
    }

    const rect = scene.getBoundingClientRect();
    const nextX = ((clientX - rect.left - dragOffsetRef.current.x) / rect.width) * 100;
    const nextY = ((clientY - rect.top - dragOffsetRef.current.y) / rect.height) * 100;

    setPosition({
      x: clamp(nextX, 4, 96),
      y: clamp(nextY, 4, 96),
    });
  }, []);

  const onArtworkPointerDown = (event: PointerEvent<HTMLImageElement>) => {
    const scene = sceneRef.current;

    if (!scene) {
      return;
    }

    const rect = scene.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;

    dragOffsetRef.current = {
      x: pointerX - (position.x / 100) * rect.width,
      y: pointerY - (position.y / 100) * rect.height,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setError(null);
  };

  const onArtworkPointerMove = (event: PointerEvent<HTMLImageElement>) => {
    if (!isDragging) {
      return;
    }

    updatePositionFromPointer(event.clientX, event.clientY);
  };

  const stopDragging = (event: PointerEvent<HTMLImageElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
  };

  const openBackgroundPicker = () => {
    scrollSnapshotRef.current = getScrollSnapshot(sceneRef.current);
    fileInputRef.current?.click();
    window.requestAnimationFrame(() => restoreScrollSnapshot(scrollSnapshotRef.current));
  };

  const onBackgroundUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file) {
      return;
    }

    if (background.isObjectUrl) {
      URL.revokeObjectURL(background.src);
    }

    const nextSrc = URL.createObjectURL(file);
    setCustomArtworkWidthPercent(artworkWidthPercent);
    setScaleAdjustment(initialScaleAdjustment);
    setBackground({ src: nextSrc, isObjectUrl: true });
    setError(null);
    event.currentTarget.value = '';
    window.requestAnimationFrame(() => restoreScrollSnapshot(scrollSnapshotRef.current));
  };

  const restoreDefaultBackground = () => {
    if (background.isObjectUrl) {
      URL.revokeObjectURL(background.src);
    }

    setBackground({ src: defaultBackgroundSrc, isObjectUrl: false });
    setError(null);
    resetPlacement();
  };

  const physicalArtworkSize = parseArtworkDimensions(artwork.dimensions, artwork.imageWidth, artwork.imageHeight);
  const isCustomBackground = background.isObjectUrl;
  const calculatedArtworkWidthPercent = physicalArtworkSize
    ? (physicalArtworkSize.widthCm / wallSize.widthCm) * getMeasuredWallWidthPercent()
    : fallbackArtworkWidthPercent;
  const baseArtworkWidthPercent = isCustomBackground
    ? customArtworkWidthPercent ?? fallbackArtworkWidthPercent
    : calculatedArtworkWidthPercent;
  const artworkWidthPercent = clamp((baseArtworkWidthPercent * scaleAdjustment) / 100, 8, 60);
  const aspectRatio = `${outputSize.width} / ${outputSize.height}`;
  const calculationText = physicalArtworkSize
    ? `${formatCm(physicalArtworkSize.widthCm)} / ${formatCm(wallSize.widthCm)} x ${getMeasuredWallWidthPercent()}% = ${formatCm(calculatedArtworkWidthPercent)}% ширины сцены`
    : 'Размер картины не распознан, используется базовый визуальный масштаб.';

  const saveImage = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const [backgroundImage, artworkImage] = await Promise.all([
        loadImage(background.src),
        loadImage(artwork.image),
      ]);
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Браузер не поддерживает сохранение через canvas.');
      }

      canvas.width = outputSize.width;
      canvas.height = outputSize.height;

      drawImageCover(context, backgroundImage, canvas.width, canvas.height);

      if (!isCustomBackground) {
        drawWallMeasurements(context, canvas.width, canvas.height, wallSize);
      }

      const artworkWidth = (canvas.width * artworkWidthPercent) / 100;
      const artworkHeight = artworkWidth * (artworkImage.naturalHeight / artworkImage.naturalWidth);
      const artworkX = (canvas.width * position.x) / 100 - artworkWidth / 2;
      const artworkY = (canvas.height * position.y) / 100 - artworkHeight / 2;

      context.shadowColor = 'rgba(0, 0, 0, 0.22)';
      context.shadowBlur = Math.round(canvas.width * 0.012);
      context.shadowOffsetY = Math.round(canvas.width * 0.006);
      context.drawImage(artworkImage, artworkX, artworkY, artworkWidth, artworkHeight);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${normalizeFilename(artwork.title)}-interior.png`;
      link.click();
    } catch {
      setError('Не удалось сохранить примерку. Попробуйте другой фон или обновите страницу.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="bg-white pb-10 sm:pb-14">
      <Container>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="flex w-full items-center justify-center gap-3 border border-black/15 bg-white px-5 py-4 text-sm font-medium text-ink transition hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-expanded={isOpen}
          aria-controls="interior-try-on-panel"
        >
          <ImageIcon className="size-5 shrink-0" />
          <span>{isOpen ? 'Свернуть' : 'Примерить картину в интерьере'}</span>
        </button>

        {isOpen && (
          <div id="interior-try-on-panel" className="mt-5 border border-black/10 bg-[#f5f3ef]">
            <div className="border-b border-black/10 bg-white px-4 py-3 sm:px-5">
              <div>
                <h2 id="interior-try-on-title" className="text-base font-medium text-ink sm:text-lg">
                  Примерка в интерьере
                </h2>
                <p className="mt-1 text-xs text-black/45 sm:text-sm">{artwork.title}</p>
              </div>
            </div>

            <div className="grid gap-4 p-4 sm:p-5">
              <div className="mx-auto grid w-full max-w-[900px] gap-4 bg-white p-4">
                <div className="flex items-center gap-2 text-sm text-black/60">
                  <MoveIcon className="size-5 shrink-0 text-ink" />
                  <span>Перетащите картину по стене</span>
                </div>

                {!isCustomBackground && (
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-ink">Размер стены</span>
                    <span className="grid gap-2 sm:grid-cols-2">
                      <span>
                        <span className="mb-1 block text-xs text-black/45">Горизонталь, см</span>
                        <input
                          type="number"
                          min="120"
                          max="800"
                          step="10"
                          value={wallSize.widthCm}
                          onChange={(event) => {
                            const value = Number(event.currentTarget.value);

                            if (Number.isFinite(value)) {
                              setWallSize((current) => ({ ...current, widthCm: clamp(value, 120, 800) }));
                            }
                          }}
                          className="w-full border border-black/15 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                        />
                      </span>
                      <span>
                        <span className="mb-1 block text-xs text-black/45">Вертикаль, см</span>
                        <input
                          type="number"
                          min="160"
                          max="500"
                          step="10"
                          value={wallSize.heightCm}
                          onChange={(event) => {
                            const value = Number(event.currentTarget.value);

                            if (Number.isFinite(value)) {
                              setWallSize((current) => ({ ...current, heightCm: clamp(value, 160, 500) }));
                            }
                          }}
                          className="w-full border border-black/15 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                        />
                      </span>
                    </span>
                  </label>
                )}

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-ink">
                    {isCustomBackground ? 'Масштаб картины' : 'Масштаб картины от расчета'}
                  </span>
                  <input
                    type="range"
                    min="70"
                    max="140"
                    step="1"
                    value={scaleAdjustment}
                    onChange={(event) => setScaleAdjustment(Number(event.currentTarget.value))}
                    className="w-full accent-accent"
                  />
                  <span className="text-xs text-black/45">
                    {isCustomBackground
                      ? `${scaleAdjustment}% от размера, который был до загрузки фона.`
                      : `${scaleAdjustment}% от расчетного размера. Итог: ${formatCm(artworkWidthPercent)}% ширины сцены.`}
                  </span>
                  {!isCustomBackground && (
                    <span className="text-xs text-black/45">
                      Расчет: {calculationText}
                    </span>
                  )}
                </label>

                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={openBackgroundPicker}
                    className="flex items-center justify-center gap-2 border border-black/15 bg-white px-4 py-3 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
                  >
                    <UploadIcon className="size-5" />
                    <span>Загрузить свой фон</span>
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={onBackgroundUpload} />

                  <button
                    type="button"
                    onClick={saveImage}
                    disabled={isSaving}
                    className="flex items-center justify-center gap-2 bg-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-accent disabled:cursor-wait disabled:bg-black/35"
                  >
                    <DownloadIcon className="size-5" />
                    <span>{isSaving ? 'Сохраняем...' : 'Сохранить'}</span>
                  </button>
                </div>

                {background.isObjectUrl && (
                  <button
                    type="button"
                    onClick={restoreDefaultBackground}
                    className="border border-black/10 px-4 py-3 text-sm font-medium text-black/60 transition hover:border-black/25 hover:text-ink"
                  >
                    Вернуть дефолтный фон
                  </button>
                )}

                {error && <p className="text-sm text-accent">{error}</p>}
              </div>

              <div
                ref={sceneRef}
                className="relative mx-auto w-full max-w-[640px] overflow-hidden bg-[#e9e3d9] shadow-soft touch-none"
                style={{ aspectRatio }}
              >
                <img
                  src={background.src}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                  draggable={false}
                />
                {!isCustomBackground && (
                  <div className="pointer-events-none absolute inset-0 text-[11px] font-medium text-ink/65 sm:text-xs">
                    <div
                      className="absolute border-t border-dashed border-ink/35"
                      style={{
                        left: `${wallBounds.left}%`,
                        right: `${100 - wallBounds.right}%`,
                        top: `${wallBounds.top}%`,
                      }}
                    >
                      <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full bg-white/65 px-2 py-0.5">
                        {formatCm(wallSize.widthCm)} см
                      </span>
                    </div>
                    <div
                      className="absolute border-r border-dashed border-ink/35"
                      style={{
                        bottom: `${100 - wallBounds.bottom}%`,
                        right: '8%',
                        top: `${wallBounds.top}%`,
                      }}
                    >
                      <span className="absolute left-full top-1/2 origin-left -translate-y-1/2 rotate-90 bg-white/65 px-2 py-0.5">
                        {formatCm(wallSize.heightCm)} см
                      </span>
                    </div>
                  </div>
                )}
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className={`absolute select-none object-contain shadow-[0_10px_28px_rgba(0,0,0,0.24)] ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                  }`}
                  draggable={false}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    width: `${artworkWidthPercent}%`,
                    aspectRatio: `${artwork.imageWidth} / ${artwork.imageHeight}`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onPointerDown={onArtworkPointerDown}
                  onPointerMove={onArtworkPointerMove}
                  onPointerUp={stopDragging}
                  onPointerCancel={stopDragging}
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
