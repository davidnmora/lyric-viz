import { Labels } from "../components/deepscatter/DeepScatterWrapper";
// type Level = 1 | 2 | 3;
type RawLabel = {
  label: string;
  level?: number;
  nearestLyric: string;
  coordinates: Array<Number>;
  children?: Array<RawLabel>;
};

const RAW_LABELS_NOT_IN_GEOJSON_FORM: Array<RawLabel> = [
  {
    label: "'You and I/me'",
    nearestLyric: "Just you and I",
    coordinates: [0.7142050266265869, 0.5423489809036255],
  },

  {
    label: "Don't care",
    nearestLyric: "But you don't care",
    coordinates: [0.693930983543396, 0.5717419981956482],
  },

  {
    label: "Apology Archipelago",
    nearestLyric: "But what I need to hear now, your sincere apology",
    coordinates: [0.7558950185775757, 0.5482659935951233],
    children: [
      {
        label: "Sin",
        nearestLyric: "It's not even a fuckin' sin",
        coordinates: [0.7385240197181702, 0.5469610095024109],
        children: [
          {
            label: "sinners & saints",
            nearestLyric: "I'm a sinner, I'm a saint",
            coordinates: [0.7352529764175415, 0.5514400005340576],
          },
          {
            label: "Religion and sin",
            nearestLyric: "He washed my sins away lord, Oh, happy day",
            coordinates: [0.7411649823188782, 0.5526859760284424],
          },
        ],
      },

      {
        label: "Excuse me",
        nearestLyric: "Excuse me",
        coordinates: [0.7504990100860596, 0.5471460223197937],
      },

      {
        label: "Too late to apologize?",
        nearestLyric:
          "It's too late to apologize, yeah (Too late) (Ayy, ayy, ayy)",
        coordinates: [0.7562479972839355, 0.54578697681427],
      },

      {
        label: "'I'm sorry'",
        nearestLyric: "And I forgive you (I forgive you)",
        coordinates: [0.751882016658783, 0.5553529858589172],
      },

      {
        label: "Forgive",
        nearestLyric: "And I forgive you (I forgive you)",
        coordinates: [0.751882016658783, 0.5553529858589172],
      },
    ],
  },

  {
    label: "'with you'",
    nearestLyric: "With you (With you)",
    coordinates: [0.726830005645752, 0.5532400012016296],
  },

  {
    label: "'the only one'",
    nearestLyric: "I know you are the only one",
    coordinates: [0.7166510224342346, 0.5627779960632324],
  },

  {
    label: "It doesn't matter",
    nearestLyric: "(It doesn't matter, baby)",
    coordinates: [0.7027180194854736, 0.5577309727668762],
  },

  {
    label: "Enough",
    nearestLyric: "There's just not enough",
    coordinates: [0.6869040131568909, 0.5568770170211792],
  },

  {
    label: "Need",
    nearestLyric: "Lady, you know just what I need",
    coordinates: [0.6644870042800903, 0.5710960030555725],
    children: [
      {
        label: "I need you",
        nearestLyric: "Oh, I need you so",
        coordinates: [0.6729580163955688, 0.579239010810852],
      },

      {
        label: "all I need",
        nearestLyric: "Is all I need",
        coordinates: [0.6688259840011597, 0.5619670152664185],
      },

      {
        label: "what you need",
        nearestLyric: "I got what you need (Oh)",
        coordinates: [0.672851026058197, 0.5592520236968994],
      },
    ],
  },

  {
    label: "Waiting",
    nearestLyric: "Baby just waiting for you",
    coordinates: [0.6567860245704651, 0.5901219844818115],
  },

  {
    label: "Love Lagoon",
    nearestLyric: "Would you be my love, my love?",
    coordinates: [0.642894983291626, 0.6179190278053284],
    children: [
      {
        label: "need/want love",
        nearestLyric: "I need your love",
        coordinates: [0.6472730040550232, 0.6056450009346008],
      },
      {
        label: "The way you love",
        nearestLyric: "The way you love me",
        coordinates: [0.6625329852104187, 0.6125869750976562],
      },
      {
        label: "Loving a man",
        nearestLyric: "I love him so",
        coordinates: [0.6064509749412537, 0.6003710031509399],
      },

      {
        label: "Loving a woman",
        nearestLyric: "I'll ask my girl I know she only loves me",
        coordinates: [0.6030139923095703, 0.5959939956665039],
      },

      {
        label: "Falling in love",
        nearestLyric: "Oh, I'm in love, baby",
        coordinates: [0.6221920251846313, 0.6369680166244507],
      },
      {
        label: "Lasting love",
        nearestLyric: "Of everlasting love",
        coordinates: [0.6127020120620728, 0.6308280229568481],
      },

      {
        label: "'our love'",
        nearestLyric: "We discovered a love that had never been found",
        coordinates: [0.6145449876785278, 0.6224859952926636],
      },

      {
        label: "True love?",
        nearestLyric: "True love, oh baby, true love, oh baby",
        coordinates: [0.6148620247840881, 0.6445779800415039],
      },

      {
        label: "Where is love?",
        nearestLyric: "Where did our love go?",
        coordinates: [0.6000570058822632, 0.6486859917640686],
      },

      {
        label: "Love is blind",
        nearestLyric: "They tell me that love is blind",
        coordinates: [0.6095979809761047, 0.6540510058403015],
      },

      {
        label: "'I love you'",
        nearestLyric: "You should let me love you",
        coordinates: [0.6553199887275696, 0.6297420263290405],
        children: [
          {
            label: "I *still** love you",
            nearestLyric: "I still love you",
            coordinates: [0.6726459860801697, 0.6302980184555054],
          },
          {
            label: "Who do you love?",
            nearestLyric: "Who do you love? Can I lounge with you?",
            coordinates: [0.6489189863204956, 0.6489409804344177],
          },
          {
            label: "'in love with you'",
            nearestLyric: "I, I'm so in love with you",
            coordinates: [0.6495739817619324, 0.6422880291938782],
          },

          {
            label: "Love me",
            nearestLyric: "Love me baby, (love me baby)",
            coordinates: [0.64997398853302, 0.6325839757919312],
          },
        ],
      },
    ],
  },

  {
    label: "Dream Island",
    nearestLyric: "Everything That I've been dreaming of",
    coordinates: [0.5599439740180969, 0.2792370021343231],
  },

  {
    label: "La La Land",
    nearestLyric: "La da la da di da da, la da da da da",
    coordinates: [0.5482959747314453, 0.22986899316310883],
  },
];

const getFlatListFromList = (
  notFlatListOfLabels: Array<RawLabel> | undefined,
  level = 1
): Array<RawLabel> =>
  // @ts-ignore
  (notFlatListOfLabels || []).reduce(
    //@ts-ignore
    (accumulator, { children, ...rest }) => [
      ...accumulator,
      { ...rest, level },
      ...getFlatListFromList(children, level + 1),
    ],
    []
  );

const LYRIC_VIZ_REGION_LABELS: Object = {
  type: "FeatureCollection",
  name: "lyric_viz_region_labels",
  features: getFlatListFromList(RAW_LABELS_NOT_IN_GEOJSON_FORM).map(
    ({ label, nearestLyric, level, coordinates }) => ({
      type: "Feature",
      properties: {
        label,
        level,
        nearestLyric,
        size: level ? 1 / level : 1, // lower levels are smaller
      },
      geometry: {
        type: "Point",
        coordinates,
      },
    })
  ),
};

const labels: Labels = {
  features: LYRIC_VIZ_REGION_LABELS,
  name: "lyric_viz_region_labels",
  labelKey: "label",
  sizeKey: "size",
};

export default labels;
