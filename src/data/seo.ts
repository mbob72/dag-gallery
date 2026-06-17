import type { Metadata } from 'next';
import type { ArtworkCategory, ArtworkItem, ArtworkSupercategory } from './artworks';

type SeoSource = 'site-taxonomy' | 'competitor-structure' | 'wordstat-seed' | 'webmaster-slot';

type SeoQuery = {
  phrase: string;
  intent: 'buy' | 'browse' | 'artist' | 'category' | 'local' | 'informational';
  source: SeoSource;
  priority: 1 | 2 | 3;
  yandexMonthlyShows?: number;
};

type SeoScope = {
  id: string;
  route: string;
  title: string;
  description: string;
  h1?: string;
  queries: SeoQuery[];
  tags: string[];
  notes?: string[];
};

type SeoPageInput = {
  route: string;
  title: string;
  description: string;
  h1?: string;
  image?: string;
  noindex?: boolean;
  scopes: SeoScope[];
};

export type ResolvedSeoPage = SeoPageInput & {
  keywords: string[];
  sourceNotes: string[];
};

const SITE_NAME = 'Caspian Art Bureau';
const siteScope: SeoScope = {
  id: 'site',
  route: '/',
  title: 'Caspian Art Bureau - современное и коллекционное искусство Дагестана',
  description:
    'Авторская живопись, графика и арт-объекты Натальи Савельевой: картины для интерьера, коллекции и частных собраний.',
  h1: 'Caspian Art Bureau',
  tags: ['современное искусство', 'коллекционное искусство', 'искусство Дагестана', 'Наталья Савельева'],
  queries: [
    { phrase: 'картины купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
    { phrase: 'купить картину художника', intent: 'buy', source: 'wordstat-seed', priority: 1 },
    { phrase: 'картины для интерьера', intent: 'buy', source: 'wordstat-seed', priority: 1 },
    { phrase: 'современное искусство купить', intent: 'buy', source: 'wordstat-seed', priority: 2 },
    { phrase: 'авторская живопись', intent: 'browse', source: 'wordstat-seed', priority: 2 },
    { phrase: 'коллекционное искусство', intent: 'browse', source: 'site-taxonomy', priority: 2 },
    { phrase: 'художники Дагестана', intent: 'local', source: 'site-taxonomy', priority: 2 },
    { phrase: 'искусство Дагестана', intent: 'local', source: 'site-taxonomy', priority: 2 },
  ],
  notes: [
    'Wordstat доступен без авторизации только как интерфейс, поэтому фразы заложены как seed-кластеры без частот.',
    'Webmaster-частоты и показы оставлены в поле yandexMonthlyShows для будущей загрузки из админки или экспорта.',
  ],
};

const supercategorySeo: Record<string, Omit<SeoScope, 'id' | 'route' | 'title' | 'description'>> = {
  painting: {
    h1: 'Живопись Натальи Савельевой',
    tags: ['живопись', 'картины маслом', 'портреты', 'пейзажи', 'натюрморты'],
    queries: [
      { phrase: 'живопись купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'картины маслом купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'авторская живопись купить', intent: 'buy', source: 'wordstat-seed', priority: 2 },
      { phrase: 'современная живопись', intent: 'browse', source: 'competitor-structure', priority: 2 },
    ],
  },
  graphics: {
    h1: 'Графика Натальи Савельевой',
    tags: ['графика', 'графические листы', 'бумага', 'пастель', 'сангина'],
    queries: [
      { phrase: 'графика купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'графические работы художников', intent: 'browse', source: 'wordstat-seed', priority: 2 },
      { phrase: 'купить графику художника', intent: 'buy', source: 'wordstat-seed', priority: 2 },
      { phrase: 'современная графика', intent: 'browse', source: 'competitor-structure', priority: 2 },
    ],
  },
  'art-objects': {
    h1: 'Арт-объекты Натальи Савельевой',
    tags: ['арт-объекты', 'объекты искусства', 'авторский объект', 'декор интерьера'],
    queries: [
      { phrase: 'арт объект купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'объекты искусства купить', intent: 'buy', source: 'wordstat-seed', priority: 2 },
      { phrase: 'авторский арт объект', intent: 'browse', source: 'site-taxonomy', priority: 2 },
    ],
  },
};

const categorySeo: Record<string, Omit<SeoScope, 'id' | 'route' | 'title' | 'description'>> = {
  portrait: {
    h1: 'Портреты',
    tags: ['портрет', 'портретная живопись', 'картина с человеком'],
    queries: [
      { phrase: 'портрет купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'картина портрет купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'портретная живопись', intent: 'category', source: 'site-taxonomy', priority: 2 },
    ],
  },
  landscape: {
    h1: 'Пейзажи',
    tags: ['пейзаж', 'горный пейзаж', 'дагестанский пейзаж', 'картина с природой'],
    queries: [
      { phrase: 'пейзаж купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'картина пейзаж купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'горный пейзаж картина', intent: 'category', source: 'site-taxonomy', priority: 2 },
    ],
  },
  'still-life': {
    h1: 'Натюрморты',
    tags: ['натюрморт', 'цветы', 'рыбы', 'интерьерная живопись'],
    queries: [
      { phrase: 'натюрморт купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'картина натюрморт купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'натюрморт маслом', intent: 'category', source: 'site-taxonomy', priority: 2 },
    ],
  },
  'art-object': {
    h1: 'Арт объекты',
    tags: ['арт объект', 'авторский декор', 'объект искусства'],
    queries: [
      { phrase: 'арт объект купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'авторский декор купить', intent: 'buy', source: 'wordstat-seed', priority: 2 },
    ],
  },
  graphics: {
    h1: 'Графика',
    tags: ['графика', 'графические листы', 'рисунок', 'бумага'],
    queries: [
      { phrase: 'графика купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'графический лист купить', intent: 'buy', source: 'wordstat-seed', priority: 2 },
    ],
  },
  'graphics-birds': {
    h1: 'Графика с птицами',
    tags: ['птицы', 'графика с птицами', 'рисунок птицы'],
    queries: [
      { phrase: 'картина птицы купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'графика птицы', intent: 'category', source: 'site-taxonomy', priority: 2 },
    ],
  },
  'graphics-animals': {
    h1: 'Графика с животными',
    tags: ['животные', 'графика с животными', 'анималистика'],
    queries: [
      { phrase: 'картина животные купить', intent: 'buy', source: 'wordstat-seed', priority: 1 },
      { phrase: 'анималистика графика', intent: 'category', source: 'site-taxonomy', priority: 2 },
    ],
  },
  'graphics-people': {
    h1: 'Графика с людьми',
    tags: ['люди', 'фигуры людей', 'портретная графика'],
    queries: [
      { phrase: 'портретная графика', intent: 'category', source: 'wordstat-seed', priority: 1 },
      { phrase: 'рисунок человека купить', intent: 'buy', source: 'wordstat-seed', priority: 2 },
    ],
  },
};

const utilitySeo: Record<string, SeoPageInput> = {
  user: {
    route: '/user',
    title: 'Личный кабинет',
    description: 'Корзина и избранное пользователя Caspian Art Bureau.',
    noindex: true,
    scopes: [siteScope],
  },
  order: {
    route: '/order',
    title: 'Корзина',
    description: 'Оформление выбранных работ Caspian Art Bureau.',
    noindex: true,
    scopes: [siteScope],
  },
};

function compactUnique(values: Array<string | undefined>) {
  return Array.from(new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value))));
}

function resolveSeoPage(input: SeoPageInput): ResolvedSeoPage {
  const keywords = compactUnique([
    ...input.scopes.flatMap((scope) => scope.tags),
    ...input.scopes.flatMap((scope) =>
      [...scope.queries].sort((a, b) => a.priority - b.priority).map((query) => query.phrase),
    ),
  ]);
  const sourceNotes = compactUnique(input.scopes.flatMap((scope) => scope.notes ?? []));

  return {
    ...input,
    keywords,
    sourceNotes,
  };
}

export function getHomeSeo() {
  return resolveSeoPage({
    route: '/',
    title: siteScope.title,
    description: siteScope.description,
    h1: siteScope.h1,
    scopes: [siteScope],
  });
}

export function getSupercategorySeo(supercategory: ArtworkSupercategory, artworksCount = 0) {
  const scoped = supercategorySeo[supercategory.id];
  const scope: SeoScope = {
    id: `supercategory:${supercategory.id}`,
    route: `/supercategory/${supercategory.id}`,
    title: `${supercategory.title} Натальи Савельевой - купить работы в Caspian Art Bureau`,
    description: `${supercategory.description}. ${artworksCount} работ: авторское искусство для интерьера и коллекции.`,
    h1: scoped?.h1 ?? supercategory.title,
    tags: scoped?.tags ?? [supercategory.title],
    queries: scoped?.queries ?? [
      { phrase: `${supercategory.title.toLowerCase()} купить`, intent: 'buy', source: 'site-taxonomy', priority: 1 },
    ],
  };

  return resolveSeoPage({
    route: scope.route,
    title: scope.title,
    description: scope.description,
    h1: scope.h1,
    image: undefined,
    scopes: [siteScope, scope],
  });
}

export function getCategorySeo(category: ArtworkCategory, artworksCount = 0) {
  const scoped = categorySeo[category.id];
  const scope: SeoScope = {
    id: `category:${category.id}`,
    route: `/category/${category.id}`,
    title: `${category.title} Натальи Савельевой - купить авторские работы`,
    description: `${category.title}: ${artworksCount} работ Натальи Савельевой. Авторское искусство, ручная техника, подбор для интерьера и коллекции.`,
    h1: scoped?.h1 ?? category.title,
    tags: scoped?.tags ?? [category.title],
    queries: scoped?.queries ?? [
      { phrase: `${category.title.toLowerCase()} купить`, intent: 'buy', source: 'site-taxonomy', priority: 1 },
    ],
  };

  return resolveSeoPage({
    route: scope.route,
    title: scope.title,
    description: scope.description,
    h1: scope.h1,
    scopes: [siteScope, scope],
  });
}

export function getArtworkSeo(artwork: ArtworkItem) {
  const primaryCategoryId = artwork.category[0];
  const categoryScope = primaryCategoryId ? categorySeo[primaryCategoryId] : undefined;
  const artworkTitle = `${artwork.title} - ${artwork.artist}`;
  const medium = compactUnique([artwork.medium, artwork.dimensions, artwork.year ? String(artwork.year) : undefined]).join(', ');
  const scope: SeoScope = {
    id: `artwork:${artwork.id}`,
    route: `/poster/${artwork.id}`,
    title: `${artworkTitle} | купить ${artwork.category_label.toLowerCase()} в Caspian Art Bureau`,
    description: compactUnique([
      `${artwork.title} - работа Натальи Савельевой`,
      artwork.category_label,
      medium,
      artwork.price_rub ? `цена ${artwork.price_rub.toLocaleString('ru-RU')} ₽` : 'цена по запросу',
    ]).join('. '),
    h1: artwork.title,
    tags: compactUnique([
      artwork.title,
      artwork.artist,
      artwork.category_label,
      artwork.medium,
      artwork.series,
      artwork.collection === 'graphics' ? 'графика' : 'живопись',
    ]),
    queries: [
      { phrase: `купить ${artwork.title.toLowerCase()}`, intent: 'buy', source: 'site-taxonomy', priority: 1 },
      { phrase: `${artwork.title.toLowerCase()} ${artwork.artist.toLowerCase()}`, intent: 'artist', source: 'site-taxonomy', priority: 1 },
      { phrase: `${artwork.category_label.toLowerCase()} купить`, intent: 'buy', source: 'wordstat-seed', priority: 2 },
      { phrase: `${artwork.artist.toLowerCase()} картины`, intent: 'artist', source: 'site-taxonomy', priority: 2 },
    ],
  };
  const inheritedCategoryScope: SeoScope | undefined = categoryScope
    ? {
        id: `category:${primaryCategoryId}`,
        route: `/category/${primaryCategoryId}`,
        title: artwork.category_label,
        description: artwork.category_label,
        h1: categoryScope.h1,
        tags: categoryScope.tags,
        queries: categoryScope.queries,
      }
    : undefined;

  return resolveSeoPage({
    route: scope.route,
    title: scope.title,
    description: scope.description,
    h1: scope.h1,
    image: artwork.image,
    scopes: [siteScope, inheritedCategoryScope, scope].filter((item): item is SeoScope => Boolean(item)),
  });
}

export function getUtilitySeo(id: keyof typeof utilitySeo) {
  return resolveSeoPage(utilitySeo[id]);
}

export function toMetadata(page: ResolvedSeoPage): Metadata {
  return {
    title: {
      absolute: page.title,
    },
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: page.route,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      siteName: SITE_NAME,
      locale: 'ru_RU',
      type: page.route === '/' ? 'website' : 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
    robots: page.noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export const seoResearchSources = {
  yandexWordstat: {
    url: 'https://wordstat.yandex.ru/',
    status: 'requires-interactive-access-for-query-frequency',
    use: 'Хранить seed-запросы и будущие частоты yandexMonthlyShows.',
  },
  yandexWebmaster: {
    url: 'https://webmaster.yandex.ru/',
    status: 'requires-site-verification-for-project-data',
    use: 'Хранить группы запросов, показы и проблемы индексации после подтверждения сайта.',
  },
  competitorPatterns: [
    'Разделение на каталог работ, маркетплейс, художников, коллекции и подборки.',
    'Коммерческие страницы группируются по технике, жанру, автору и интерьерному назначению.',
    'Для карточек работ важны автор, название, техника, размер, год, цена и изображение.',
  ],
};
