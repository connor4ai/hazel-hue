// Mapping of seasonal assets from uploaded files
export interface SeasonalAssets {
  celebrities: string[];
  hairColorGuide: string;
  colorDimensions: string;
  seasonChart: string;
}

export const seasonalAssets: Record<string, SeasonalAssets> = {
  'True Winter': {
    celebrities: [
      '/attached_assets/Adriana Lima_1750906638336.png',
      '/attached_assets/Katy Perry_1750906638336.png',
      '/attached_assets/Megan Fox_1750906638336.png'
    ],
    hairColorGuide: '/attached_assets/60b8f81d3f5d232e60b324e6_Bright Winter Hair_1750624165018.webp',
    colorDimensions: '/attached_assets/60b8f521cbd467e4c5ba0270_True Winter Colour Dimensions_1750623961315.webp',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750623961315.png'
  },

  'Bright Winter': {
    celebrities: [
      '/attached_assets/Adriana Lima_1751148350492.png',
      '/attached_assets/Katy Perry_1751148350492.png',
      '/attached_assets/Megan Fox_1751148350492.png'
    ],
    hairColorGuide: '/attached_assets/60b8f81d3f5d232e60b324e6_Bright Winter Hair-2_1750641894237.webp',
    colorDimensions: '/attached_assets/60b8f91d090802631f44f1b9_Bright Winter Colour Dimensions-2_1750641887890.webp',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750641957979.png'
  },

  'Dark Winter': {
    celebrities: [
      '/attached_assets/Salma Hayek_1751148424416.png',
      '/attached_assets/Sandra Bullock_1751148424417.png',
      '/attached_assets/Viola Davis_1751148424417.png'
    ], 
    hairColorGuide: '/attached_assets/60b8ea99df1741592789025e_Dark Winter Hair_1750807424071.webp',
    colorDimensions: '/attached_assets/60b8eb82d467fb3ac7a8d1eb_Dark Winter Colour Dimensions_1750807420786.webp',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750808213783.png'
  },

  'True Summer': {
    celebrities: [
      '/attached_assets/Anna Kendrick_1751148448937.png',
      '/attached_assets/Emily DiDonato_1751148448937.png',
      '/attached_assets/image_1751148458460.png'
    ],
    hairColorGuide: '/attached_assets/60b8bf33b45bb75378d9c545_True Summer Hair_1750808166133.webp',
    colorDimensions: '/attached_assets/60b8c01b3cc352b8f0df39ad_True Summer Colour Dimensions_1750808161686.webp',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750808213783.png'
  },

  'Light Summer': {
    celebrities: [
      '/attached_assets/Margot Robbie_1750821623288.png',
      '/attached_assets/Reese Witherspoon_1750821623288.png', 
      '/attached_assets/Sydney Sweeney_1750821623288.png'
    ],
    hairColorGuide: '/attached_assets/60b8ba33488e4676486cf733_Light Summer Hair_1750821637204.webp',
    colorDimensions: '/attached_assets/60b8bb643931008db258a009_Light Summer Colour Dimensions_1750821637204.webp',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750808631298.png'
  },

  'Soft Summer': {
    celebrities: [
      '/attached_assets/Adriana Lima_1751148500828.png',
      '/attached_assets/Cara Delevinge_1751148500828.png',
      '/attached_assets/Jennifer Anniston_1751148500828.png'
    ],
    hairColorGuide: '/attached_assets/60b8c5dc1595f97f46004808_Soft Summer Hair_1750809095280.webp',
    colorDimensions: '/attached_assets/60b8c6a528185800a4008aae_Soft Summer Colour Dimensions_1750809095280.webp',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750809095280.png'
  },

  'True Spring': {
    celebrities: [
      '/attached_assets/Amy Adams_1751148864212.png',
      '/attached_assets/Blake Lively_1751148864212.png',
      '/attached_assets/Cynthia Nixon_1751148864212.png'
    ],
    hairColorGuide: '/attached_assets/60b886010051e62b11a054f6_True Spring Hair_1750809772493.webp',
    colorDimensions: '/attached_assets/60b89ea7488e4694b46c6b48_True Spring Colour Dimensions_1750809772493.webp',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750809772493.png'
  },

  'Bright Spring': {
    celebrities: [
      '/attached_assets/Emma Stone_1751148583264.png',
      '/attached_assets/Jane Levy_1751148583264.png',
      '/attached_assets/Mila Jojovich_1751148583264.png'
    ],
    hairColorGuide: '/attached_assets/60b3bd41e891223d04781266_Bright Spring Hair-2_1750811010138.webp',
    colorDimensions: '/attached_assets/60b3ca89184107acb91ae4fe_Bright Spring Colour Dimensions_1750811010138.webp',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750811010138.png'
  },

  'Light Spring': {
    celebrities: [
      '/attached_assets/Cynthia Nixon_1750906632490.png',
      '/attached_assets/Jane Levy_1750906635089.png',
      '/attached_assets/Mila Jojovich_1750906635090.png'
    ],
    hairColorGuide: '/attached_assets/60b8b46646f35775934de675_Light Spring Hair_1750811383371.webp',
    colorDimensions: '/attached_assets/60b8b53094058a4b3906838c_Light Spring Colour Dimensions_1750811383371.webp',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750811388397.png'
  },

  'True Autumn': {
    celebrities: [
      '/attached_assets/Ana de Armas_1751148773416.png',
      '/attached_assets/Beyonce_1751148773416.png',
      '/attached_assets/Julianne Moore_1751148773416.png'
    ],
    hairColorGuide: '/attached_assets/60b8db37df1741d699889af4_True Autumn Hair-2_1750816372614.webp',
    colorDimensions: '/attached_assets/60b8dc323931006af3592d5a_True Autumn Colour Dimensions_1750816372614.png',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750816820638.png'
  },

  'Dark Autumn': {
    celebrities: [
      '/attached_assets/Emily Ratajkowski_1751148831513.png',
      '/attached_assets/Julia Roberts_1751148831513.png',
      '/attached_assets/Tyla_1751148831513.png'
    ],
    hairColorGuide: '/attached_assets/60b8e654cbd467782eb9bbe4_Dark Autumn Hair_1750816820638.webp',
    colorDimensions: '/attached_assets/60b8e78f3237388375d8c5d3_Dark Autumn Colour Dimensions_1750816820638.webp',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750816820638.png'
  },

  'Soft Autumn': {
    celebrities: [
      '/attached_assets/Drew Barrymore_1751064199910.png',
      '/attached_assets/Angelina Jolie_1751147251382.png',
      '/attached_assets/Jessica Biel_1751064199910.png'
    ],
    hairColorGuide: '/attached_assets/60b8d27875af5e3452543933_Soft Autumn Hair_1750817117523.webp',
    colorDimensions: '/attached_assets/60b8d80175af5e7d61545598_Soft Autumn Colour Dimensions_1750817117523.png',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750817122222.png'
  }
};

// Helper function to get assets for a season
export function getSeasonalAssets(season: string): SeasonalAssets {
  return seasonalAssets[season] || {
    celebrities: [],
    hairColorGuide: '',
    colorDimensions: '',
    seasonChart: '/attached_assets/12-tone-chart-value-temperature_1750623961315.png'
  };
}