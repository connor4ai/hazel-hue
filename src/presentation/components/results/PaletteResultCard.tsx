import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Circle,
  Ellipse,
  G,
  Text as SvgText,
  TSpan,
} from 'react-native-svg';
import type { SeasonFamily } from '@domain/shared/types/Season';
import { colors } from '@presentation/theme/colors';
import { fontFamilies } from '@presentation/theme/typography';

// ─── Types ───────────────────────────────────────────────────────────
interface PaletteColor {
  hex: string;
  name: string;
}

export interface PaletteResultCardProps {
  /** Display name, e.g. "Bright Winter" */
  seasonName: string;
  /** Season family for theming */
  seasonFamily: SeasonFamily;
  /** Poetic one-liner for the season */
  poeticDescription: string;
  /** Accent color for the season */
  accentColor: string;
  /** 8–12 curated swatches to display */
  swatches: PaletteColor[];
  /** Celebrity comparison name */
  celebrityName: string;
}

// ─── Design tokens (1080×1920 canvas, rendered at 360×640 @3x) ─────
const CARD_W = 360;
const CARD_H = 640;

// Season-specific background palettes: [topGrad, midGrad, bottomGrad, orbTint]
const seasonBackgrounds: Record<SeasonFamily, readonly [string, string, string, string]> = {
  SPRING: ['#FFF8F0', '#FFF0E0', '#FFECD2', '#FF8C69'],
  SUMMER: ['#F8F4FF', '#F0EAFF', '#E8DFFF', '#B19CD9'],
  AUTUMN: ['#FDF6EE', '#F5EBD8', '#EFE0C4', '#C67B5C'],
  WINTER: ['#F5F0F8', '#EDE6F2', '#E4DAEC', '#7B2D5F'],
};

// ─── Decorative botanical paths (minimal, organic SVG shapes) ───────
function DecoOrbs({ tint, opacity = 0.06 }: { tint: string; opacity?: number }) {
  return (
    <G opacity={opacity}>
      {/* Large soft orb top-right */}
      <Circle cx={310} cy={80} r={100} fill={tint} />
      {/* Medium orb bottom-left */}
      <Circle cx={50} cy={560} r={80} fill={tint} />
      {/* Small accent orb mid-left */}
      <Ellipse cx={30} cy={300} rx={40} ry={55} fill={tint} />
      {/* Tiny accent top-left */}
      <Circle cx={60} cy={30} r={25} fill={tint} />
    </G>
  );
}

function DecoGrain() {
  // Subtle grain dots for texture — keeps the card feeling premium/editorial
  return (
    <G opacity={0.03}>
      {Array.from({ length: 40 }).map((_, i) => (
        <Circle
          key={i}
          cx={((i * 73 + 17) % CARD_W)}
          cy={((i * 47 + 31) % CARD_H)}
          r={((i % 3) + 1) * 0.8}
          fill={colors.charcoal}
        />
      ))}
    </G>
  );
}

// ─── Color swatch grid renderer ─────────────────────────────────────
function SwatchGrid({ swatches }: { swatches: PaletteColor[] }) {
  // Take up to 12 swatches, arrange in rows
  const display = swatches.slice(0, 12);
  const cols = 4;
  const swatchSize = 56;
  const gap = 14;
  const totalGridW = cols * swatchSize + (cols - 1) * gap;
  const startX = (CARD_W - totalGridW) / 2;

  // Center of the card, shifted up to leave room for celebrity section
  const startY = 330;

  return (
    <G>
      {display.map((swatch, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * (swatchSize + gap);
        const y = startY + row * (swatchSize + gap);

        // Alternate slightly organic border-radii
        const r = (i % 2 === 0) ? 14 : 16;

        return (
          <G key={i}>
            {/* Soft shadow */}
            <Rect
              x={x + 1}
              y={y + 2}
              width={swatchSize}
              height={swatchSize}
              rx={r}
              fill="rgba(0,0,0,0.06)"
            />
            {/* Swatch */}
            <Rect
              x={x}
              y={y}
              width={swatchSize}
              height={swatchSize}
              rx={r}
              fill={swatch.hex}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={1}
            />
            {/* Color name below swatch */}
            <SvgText
              x={x + swatchSize / 2}
              y={y + swatchSize + 13}
              textAnchor="middle"
              fill={colors.gray500}
              fontFamily={fontFamilies.body}
              fontSize={7.5}
              opacity={0.8}
            >
              {swatch.name.length > 10 ? swatch.name.slice(0, 9) + '…' : swatch.name}
            </SvgText>
          </G>
        );
      })}
    </G>
  );
}

// ─── Thin decorative line ───────────────────────────────────────────
function ThinLine({ y, color }: { y: number; color: string }) {
  return (
    <G opacity={0.15}>
      <Rect x={CARD_W * 0.2} y={y} width={CARD_W * 0.6} height={0.5} fill={color} rx={0.25} />
    </G>
  );
}

// ─── Main component ─────────────────────────────────────────────────
export function PaletteResultCard({
  seasonName,
  seasonFamily,
  poeticDescription,
  accentColor,
  swatches,
  celebrityName,
}: PaletteResultCardProps) {
  const bg = seasonBackgrounds[seasonFamily];

  // Split season name for stacked display if two words
  const words = seasonName.split(' ');
  const hasSubtype = words.length === 2;

  // Truncate poetic description to fit nicely
  const description = poeticDescription.length > 80
    ? poeticDescription.slice(0, 77) + '…'
    : poeticDescription;

  // Calculate swatch rows for vertical positioning
  const swatchCount = Math.min(swatches.length, 12);
  const swatchRows = Math.ceil(swatchCount / 4);

  return (
    <View style={styles.container}>
      <Svg width={CARD_W} height={CARD_H} viewBox={`0 0 ${CARD_W} ${CARD_H}`}>
        <Defs>
          {/* Background gradient */}
          <LinearGradient id="bgGrad" x1="0" y1="0" x2="0.3" y2="1">
            <Stop offset="0" stopColor={bg[0]} />
            <Stop offset="0.4" stopColor={bg[1]} />
            <Stop offset="1" stopColor={bg[2]} />
          </LinearGradient>

          {/* Accent gradient for decorative elements */}
          <LinearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={accentColor} stopOpacity="0.12" />
            <Stop offset="1" stopColor={accentColor} stopOpacity="0.03" />
          </LinearGradient>
        </Defs>

        {/* ─── Background ─── */}
        <Rect width={CARD_W} height={CARD_H} fill="url(#bgGrad)" />

        {/* Decorative orbs & grain */}
        <DecoOrbs tint={bg[3]} opacity={0.08} />
        <DecoGrain />

        {/* Subtle accent wash at top */}
        <Ellipse
          cx={CARD_W / 2}
          cy={120}
          rx={220}
          ry={140}
          fill={accentColor}
          opacity={0.04}
        />

        {/* ─── Top brand mark ─── */}
        <SvgText
          x={CARD_W / 2}
          y={42}
          textAnchor="middle"
          fontFamily={fontFamilies.body}
          fontSize={9}
          fill={colors.gray400}
          letterSpacing={4}
          opacity={0.7}
        >
          HAZEL &amp; HUE
        </SvgText>

        <ThinLine y={56} color={accentColor} />

        {/* ─── "You are a" label ─── */}
        <SvgText
          x={CARD_W / 2}
          y={95}
          textAnchor="middle"
          fontFamily={fontFamilies.body}
          fontSize={12}
          fill={colors.gray400}
          letterSpacing={3}
        >
          YOU ARE A
        </SvgText>

        {/* ─── Season Name (hero typography) ─── */}
        {hasSubtype ? (
          <G>
            {/* Subtype word (Light, True, Bright, Soft, Deep) — elegant, lighter */}
            <SvgText
              x={CARD_W / 2}
              y={135}
              textAnchor="middle"
              fontFamily={fontFamilies.display}
              fontSize={22}
              fill={colors.gray500}
              letterSpacing={5}
            >
              {words[0].toUpperCase()}
            </SvgText>
            {/* Season family word — massive, bold */}
            <SvgText
              x={CARD_W / 2}
              y={185}
              textAnchor="middle"
              fontFamily={fontFamilies.displayBold}
              fontSize={46}
              fill={accentColor}
              letterSpacing={2}
            >
              {words[1]}
            </SvgText>
          </G>
        ) : (
          <SvgText
            x={CARD_W / 2}
            y={170}
            textAnchor="middle"
            fontFamily={fontFamilies.displayBold}
            fontSize={42}
            fill={accentColor}
            letterSpacing={2}
          >
            {seasonName}
          </SvgText>
        )}

        {/* ─── Poetic description ─── */}
        <SvgText
          x={CARD_W / 2}
          y={218}
          textAnchor="middle"
          fontFamily={fontFamilies.body}
          fontSize={10.5}
          fill={colors.gray500}
          opacity={0.9}
          fontStyle="italic"
        >
          {description.length > 50 ? (
            <>
              <TSpan x={CARD_W / 2} dy={0}>
                {description.slice(0, description.indexOf(' ', 35))}
              </TSpan>
              <TSpan x={CARD_W / 2} dy={15}>
                {description.slice(description.indexOf(' ', 35) + 1)}
              </TSpan>
            </>
          ) : (
            description
          )}
        </SvgText>

        {/* ─── Decorative line before swatches ─── */}
        <ThinLine y={250} color={accentColor} />

        {/* ─── "Your Palette" label ─── */}
        <SvgText
          x={CARD_W / 2}
          y={275}
          textAnchor="middle"
          fontFamily={fontFamilies.display}
          fontSize={16}
          fill={colors.charcoal}
          letterSpacing={1}
        >
          Your Palette
        </SvgText>

        {/* ─── Signature color indicator ─── */}
        {swatches.length > 0 && (
          <G>
            <Circle
              cx={CARD_W / 2}
              cy={305}
              r={10}
              fill={swatches[0].hex}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth={1.5}
            />
            <SvgText
              x={CARD_W / 2}
              y={325}
              textAnchor="middle"
              fontFamily={fontFamilies.body}
              fontSize={7}
              fill={colors.gray400}
              letterSpacing={1.5}
            >
              SIGNATURE
            </SvgText>
          </G>
        )}

        {/* ─── Color Swatch Grid ─── */}
        <SwatchGrid swatches={swatches} />

        {/* ─── Celebrity comparison ─── */}
        <G>
          <ThinLine y={swatchRows * 70 + 350} color={accentColor} />

          <SvgText
            x={CARD_W / 2}
            y={swatchRows * 70 + 378}
            textAnchor="middle"
            fontFamily={fontFamilies.body}
            fontSize={10}
            fill={colors.gray400}
            letterSpacing={2}
          >
            YOU SHARE A PALETTE WITH
          </SvgText>

          <SvgText
            x={CARD_W / 2}
            y={swatchRows * 70 + 404}
            textAnchor="middle"
            fontFamily={fontFamilies.displayBold}
            fontSize={24}
            fill={colors.charcoal}
            letterSpacing={0.5}
          >
            {celebrityName}
          </SvgText>
        </G>

        {/* ─── Bottom watermark ─── */}
        <G opacity={0.4}>
          {/* Decorative dot */}
          <Circle cx={CARD_W / 2} cy={CARD_H - 50} r={2} fill={accentColor} />
          <SvgText
            x={CARD_W / 2}
            y={CARD_H - 28}
            textAnchor="middle"
            fontFamily={fontFamilies.body}
            fontSize={9}
            fill={colors.gray500}
            letterSpacing={2}
          >
            hazelandhue.com
          </SvgText>
        </G>

        {/* ─── Decorative corner accents ─── */}
        <G opacity={0.06}>
          {/* Top-left arc */}
          <Circle cx={0} cy={0} r={60} fill={accentColor} />
          {/* Bottom-right arc */}
          <Circle cx={CARD_W} cy={CARD_H} r={50} fill={accentColor} />
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_W,
    height: CARD_H,
    // Cast shadow for the preview card
    shadowColor: '#3D3D3D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.cream,
  },
});
