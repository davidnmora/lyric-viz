import { Labels } from "../components/deepscatter/DeepScatterWrapper";
// type Level = 1 | 2 | 3;
type RawLabel = {
  label: string;
  level?: number;
  nearestLyric: string;
  coordinates: Array<number>;
  children?: Array<RawLabel>;
};

const RAW_LABELS_NOT_IN_GEOJSON_FORM: Array<RawLabel> = [
  {
    label: "La La Land",
    nearestLyric: "La da la da di da da, la da da da da",
    coordinates: [54.82959747314453, 22.986899316310883],
  },
  {
    label: "Dream Island",
    nearestLyric: "Everything That I've been dreaming of",
    coordinates: [55.99439740180969, 27.92370021343231],
  },

  {
    label: "'You and I/me'",
    nearestLyric: "Just you and I",
    coordinates: [71.42050266265869, 54.23489809036255],
  },

  {
    label: "Don't care",
    nearestLyric: "But you don't care",
    coordinates: [69.3930983543396, 57.17419981956482],
  },

  {
    label: "📝 Letter writing",
    nearestLyric: "You wrote me in a letter",
    coordinates: [76.3427734375, 51.66593933105469],
    children: [
      {
        label: "'love letter'",
        nearestLyric: "Pages brown from old love letter",
        coordinates: [76.04402923583984, 51.90477752685547],
      },

      {
        label: "📫 'postman'",
        nearestLyric: "Please Mr. Postman, look and see (Postman, postman)",
        coordinates: [77.80908203125, 51.983158111572266],
      },
    ],
  },

  {
    label: "Apology Archipelago",
    nearestLyric: "But what I need to hear now, your sincere apology",
    coordinates: [75.58950185775757, 54.82659935951233],
    children: [
      {
        label: "Sin",
        nearestLyric: "It's not even a fuckin' sin",
        coordinates: [73.85240197181702, 54.69610095024109],
        children: [
          {
            label: "sinners & saints",
            nearestLyric: "I'm a sinner, I'm a saint",
            coordinates: [73.52529764175415, 55.14400005340576],
          },
          {
            label: "Religion and sin",
            nearestLyric: "He washed my sins away lord, Oh, happy day",
            coordinates: [74.11649823188782, 55.26859760284424],
          },
        ],
      },

      {
        label: "Excuse me",
        nearestLyric: "Excuse me",
        coordinates: [75.04990100860596, 54.71460223197937],
      },

      {
        label: "Too late to apologize?",
        nearestLyric:
          "It's too late to apologize, yeah (Too late) (Ayy, ayy, ayy)",
        coordinates: [75.62479972839355, 54.578697681427],
      },

      {
        label: "'I'm sorry'",
        nearestLyric: "And I forgive you (I forgive you)",
        coordinates: [75.1882016658783, 55.53529858589172],
      },

      {
        label: "Forgive",
        nearestLyric: "And I forgive you (I forgive you)",
        coordinates: [75.1882016658783, 55.53529858589172],
      },
    ],
  },

  {
    label: "'with you'",
    nearestLyric: "With you (With you)",
    coordinates: [72.6830005645752, 55.32400012016296],
  },

  {
    label: "'the only one'",
    nearestLyric: "I know you are the only one",
    coordinates: [71.66510224342346, 56.27779960632324],
  },

  {
    label: "Need",
    nearestLyric: "Lady, you know just what I need",
    coordinates: [66.44870042800903, 57.10960030555725],
    children: [
      {
        label: "I need you",
        nearestLyric: "Oh, I need you so",
        coordinates: [67.29580163955688, 57.9239010810852],
      },

      {
        label: "all I need",
        nearestLyric: "Is all I need",
        coordinates: [66.88259840011597, 56.19670152664185],
      },

      {
        label: "what you need",
        nearestLyric: "I got what you need (Oh)",
        coordinates: [67.2851026058197, 55.92520236968994],
      },
    ],
  },

  {
    label: "Waiting",
    nearestLyric: "Baby just waiting for you",
    coordinates: [65.67860245704651, 59.01219844818115],
  },

  {
    label: "Love Lagoon",
    nearestLyric: "Would you be my love, my love?",
    coordinates: [64.2894983291626, 61.79190278053284],
    children: [
      {
        label: "need/want love",
        nearestLyric: "I need your love",
        coordinates: [64.72730040550232, 60.56450009346008],
      },
      {
        label: "The way you love",
        nearestLyric: "The way you love me",
        coordinates: [66.25329852104187, 61.25869750976562],
      },
      {
        label: "Loving a man",
        nearestLyric: "I love him so",
        coordinates: [60.64509749412537, 60.03710031509399],
      },

      {
        label: "Loving a woman",
        nearestLyric: "I'll ask my girl I know she only loves me",
        coordinates: [60.30139923095703, 59.59939956665039],
      },

      {
        label: "Falling in love",
        nearestLyric: "Oh, I'm in love, baby",
        coordinates: [62.21920251846313, 63.69680166244507],
      },
      {
        label: "Lasting love",
        nearestLyric: "Of everlasting love",
        coordinates: [61.27020120620728, 63.08280229568481],
      },

      {
        label: "'our love'",
        nearestLyric: "We discovered a love that had never been found",
        coordinates: [61.45449876785278, 62.24859952926636],
      },

      {
        label: "True love?",
        nearestLyric: "True love, oh baby, true love, oh baby",
        coordinates: [61.48620247840881, 64.45779800415039],
      },

      {
        label: "Where is love?",
        nearestLyric: "Where did our love go?",
        coordinates: [60.00570058822632, 64.86859917640686],
      },

      {
        label: "Love is blind",
        nearestLyric: "They tell me that love is blind",
        coordinates: [60.95979809761047, 65.40510058403015],
      },

      {
        label: "'I love you'",
        nearestLyric: "You should let me love you",
        coordinates: [65.53199887275696, 62.97420263290405],
        children: [
          {
            label: "I *still** love you",
            nearestLyric: "I still love you",
            coordinates: [67.26459860801697, 63.02980184555054],
          },
          {
            label: "Who do you love?",
            nearestLyric: "Who do you love? Can I lounge with you?",
            coordinates: [64.89189863204956, 64.89409804344177],
          },
          {
            label: "'in love with you'",
            nearestLyric: "I, I'm so in love with you",
            coordinates: [64.95739817619324, 64.22880291938782],
          },

          {
            label: "Love me",
            nearestLyric: "Love me baby, (love me baby)",
            coordinates: [64.997398853302, 63.25839757919312],
          },
        ],
      },
    ],
  },

  {
    label: "Pain/Hurt",
    nearestLyric: "And I don't wanna hurt him anymore",
    coordinates: [56.61603546142578, 62.79591751098633],
    children: [
      {
        label: "'all the pain'",
        nearestLyric: "In spite of all the pain",
        coordinates: [55.78335952758789, 63.31875991821289],
      },

      {
        label: "I won't hurt you/betrayal",
        nearestLyric: "(I'll never hurt you)",
        coordinates: [57.41193771362305, 62.78031539916992],
      },
    ],
  },

  {
    label: "'nothing matters'",
    nearestLyric: "Nothing seems to matter",
    coordinates: [70.17344665527344, 55.687557220458984],
  },

  {
    label: "'enough'",
    nearestLyric: "Is enough!",
    coordinates: [68.76097869873047, 55.62284469604492],
    children: [
      {
        label: "'too much'",
        nearestLyric: "Too much of something is bad enough (bad enough)",
        coordinates: [68.61290740966797, 55.784603118896484],
      },
    ],
  },

  {
    label: "👩🏿'independent woman' island",
    nearestLyric: "All the women who independent (Hey)",
    coordinates: [72.072998046875, 60.41924285888672],
  },

  {
    label: "'the blues'",
    nearestLyric: "Feelin' the blues about it (Yeah)",
    coordinates: [74.31782531738281, 63.118492126464844],
  },

  {
    label: "🌉'bridge'",
    nearestLyric: "Underneath the bridge",
    coordinates: [78.03937530517578, 63.07924270629883],
  },

  {
    label: "Promises",
    nearestLyric: "And all your promises",
    coordinates: [71.64732360839844, 58.54658508300781],
    children: [
      {
        label: "'I swear'",
        nearestLyric: "I swear that it was somethin'",
        coordinates: [71.04540252685547, 57.411354064941406],
      },

      {
        label: "'be true'",
        nearestLyric: "Promise, girl, that I'll be true",
        coordinates: [70.91548156738281, 59.17201614379883],
      },
    ],
  },

  {
    label: "😭 Crying",
    nearestLyric: "Crying over you",
    coordinates: [49.363499879837036, 65.27100205421448],
  },

  {
    label: "💓 Heart",
    nearestLyric: "My heart is in your hands",
    coordinates: [53.51279973983765, 65.30879735946655],
    children: [
      {
        label: "Broken heart",
        nearestLyric: "Heartbreak time (my heart is breaking)",
        coordinates: [53.45320105552673, 64.71570134162903],
      },
      {
        label: "Soul",
        nearestLyric: "Somewhere I can rest my soul (rest my soul)",
        coordinates: [52.06210017204285, 63.61569762229919],
        children: [
          {
            label: "Soul possession",
            nearestLyric: "As if someone else controls your very soul",
            coordinates: [52.17909812927246, 63.68600130081177],
          },
        ],
      },
    ],
  },

  {
    label: "'without you'",
    nearestLyric: "Couldn't see me without you, babe",
    coordinates: [69.77459788322449, 61.05719804763794],
    children: [
      {
        label: "'can't live without you'",
        nearestLyric: "I couldn't live without you",
        coordinates: [69.51349973678589, 60.95970273017883],
      },

      {
        label: "'without your love'",
        nearestLyric: "Without your love, baby, I would die",
        coordinates: [69.21169757843018, 61.63489818572998],
      },

      {
        label: "'living/dieing without you",
        nearestLyric: "Than to go on living without you",
        coordinates: [69.90150213241577, 61.26959919929504],
      },
    ],
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

const MAX_FONT_SIZE = 16;
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
        size: level ? MAX_FONT_SIZE / level : MAX_FONT_SIZE, // lower levels are smaller
      },
      geometry: {
        type: "Point",
        // TODO: actually fix the hard-coded numbers, don't just do this, since it'll break going forward
        coordinates: coordinates.map((c) => c),
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
