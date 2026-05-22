// @ts-check
import { basePreset, ignoreBuildDir, nodePreset, vitestPreset } from '@wellmade/eslint-config';

export default [ignoreBuildDir, ...basePreset(import.meta.dirname), nodePreset, vitestPreset];
