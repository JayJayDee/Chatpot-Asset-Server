/*
 * avatar-generator
 * https://github.com/arusanov/avatar-generator
 *
 * Copyright (c) 2018 arusanov
 * Licensed under the MIT license.
 *
 * fixed original avatar-generator for working Sharp 0.21.3
 */

import { join } from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import * as seedrandom from 'seedrandom';
export type AvatarPart =
  | 'background'
  | 'face'
  | 'clothes'
  | 'head'
  | 'hair'
  | 'eye'
  | 'mouth';

export type AvatarGenearatorSettings = {
  parts: Array<AvatarPart>
  imageExtension: string
  partsLocation: string
};

const defaultSettings: AvatarGenearatorSettings = {
  parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'],
  partsLocation: join(__dirname, '../img'),
  imageExtension: '.png'
};

type PartsMap = { [key in AvatarPart]: string[] };
type VariantsMap = { [key: string]: PartsMap };

class AvatarGenerator {
  private _variants: VariantsMap;
  private _parts: Array<AvatarPart>;

  constructor(settings: Partial<AvatarGenearatorSettings> = {}) {
    const cfg = {
      ...defaultSettings,
      ...settings
    };
    this._variants = AvatarGenerator.BuildVariantsMap(cfg);
    this._parts = cfg.parts;
  }

  get variants() {
    return Object.keys(this._variants);
  }

  private static BuildVariantsMap({
    parts,
    partsLocation,
    imageExtension
  }: AvatarGenearatorSettings) {
    const fileRegex = new RegExp(`(${parts.join('|')})(\\d+)${imageExtension}`);
    const discriminators = fs
      .readdirSync(partsLocation)
      .filter((partsDir) =>
        fs.statSync(join(partsLocation, partsDir)).isDirectory()
      );

    return discriminators.reduce(
      (variants, discriminator) => {
        const dir = join(partsLocation, discriminator);
        variants[discriminator] = fs.readdirSync(dir).reduce(
          (parts, fileName) => {
            const match = fileRegex.exec(fileName);
            if (match) {
              const part = match[1] as AvatarPart;
              if (!parts[part]) {
                parts[part] = [];
              }
              parts[part][parseInt(match[2])] = join(dir, fileName);
            }
            return parts;
          },
          {} as PartsMap
        );
        return variants;
      },
      {} as VariantsMap
    );
  }

  private getParts(id: string, variant: string) {
    const variantParts = this._variants[variant];
    if (!variantParts) {
      throw new Error(
        `variant '${variant}' is not supported. Supported variants: ${Object.keys(
          this._variants
        )}`
      );
    }
    const rng = seedrandom(id);
    return this._parts
      .map(
        (partName: AvatarPart): string => {
          const partVariants = variantParts[partName];
          return (
            partVariants &&
            partVariants[Math.floor(rng() * partVariants.length)]
          );
        }
      )
      .filter(Boolean);
  }

  public async generate(id: string, variant: string): Promise<sharp.Sharp> {
    const parts = this.getParts(id, variant);
    if (!parts.length) {
      throw new Error(`variant '${variant}'does not contain any parts`);
    }
    const { width, height } = await sharp(parts[0]).metadata();

    const options = {
      raw: {
        width: width!,
        height: height!,
        channels: 4
      }
    };
    const overlays = parts.map((part) =>
      sharp(part)
        .raw()
        .toBuffer()
    );
    const cvtedOptions = {
      raw: {
        width: options.raw.width,
        height: options.raw.height,
        channels: options.raw.channels as 4
      }
    };

    let composite = overlays.shift()!;
    for (const overlay of overlays) {
      const [compoisteData, overlayData] = await Promise.all([
        composite,
        overlay
      ]);
      composite = sharp(compoisteData, cvtedOptions)
        .overlayWith(overlayData, cvtedOptions)
        .raw()
        .toBuffer();
    }
    return sharp(await composite, cvtedOptions);
  }
}

export default AvatarGenerator;