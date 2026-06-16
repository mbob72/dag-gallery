export const SITE_URL = 'https://artpostergallery.ru';

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type ImageLink = {
  title: string;
  href: string;
  image: string;
  description?: string;
};

export const topLinks: NavItem[] = [
  { label: 'Доставка и оплата', href: '/delivery' },
  {
    label: 'Покупателям',
    href: '#',
    children: [
      { label: 'Галерея выполненных работ', href: '/gallery' },
      { label: 'Как заказать', href: '/page/order' },
      { label: 'О компании', href: '/page/about' },
      { label: 'Блог', href: '/news' },
      { label: 'Вопрос / ответ', href: '/faq' },
    ],
  },
  { label: 'Для бизнеса', href: '/page/for_legal_entities_and_organizations' },
  { label: 'Дизайнерам', href: '/page/for_designers_and_architects' },
  { label: 'Контакты', href: '/contacts' },
];

export const catalogNav: NavItem[] = [
  {
    label: 'Репродукции картин',
    href: '/catalog/reprodukcii-kartin-i-kartiny-na-stenu-1',
    children: [
      { label: 'Абстракция', href: '/catalog/abstrakciya-5' },
      { label: 'Пейзаж', href: '/catalog/kartiny-peyzazhi-8524' },
      { label: 'Города и страны', href: '/catalog/gorod-art-7937' },
      { label: 'Натюрморт', href: '/catalog/natyurmort-21' },
      { label: 'Цветы', href: '/catalog/cvety-art-7930' },
      { label: 'Картины с животными', href: '/catalog/animalizm-520' },
    ],
  },
  {
    label: 'Арт-постеры',
    href: '/catalog/postery-6',
    children: [
      { label: 'Пейзажи', href: '/catalog/peyzazhi-272' },
      { label: 'Архитектура', href: '/catalog/arhitektura-9' },
      { label: 'Минимализм', href: '/catalog/minimalizm-10573' },
      { label: 'Скандинавский стиль', href: '/catalog/postery-v-skandinavskom-stile-9291' },
      { label: 'Для кухни', href: '/catalog/dlya-kuhni-i-stolovoy-441' },
      { label: 'Детские', href: '/catalog/detskie-440' },
    ],
  },
  { label: 'Ретро и винтаж', href: '/catalog/retro-i-vintazh-7' },
  { label: 'Гравюры', href: '/catalog/gravyury-estampy-i-akvareli-gea-6444' },
  { label: 'Картины из ваших фото', href: '/photoart' },
  { label: 'Картины маслом и акрилом', href: '/catalog/kartiny-maslom-1-13759' },
];

export const heroSlides = [
  {
    image: '/userdata/homepage/slider/resized/3e/09/3e091e3a5623ec44a59c7c95fd6c5d63_1200_webp.webp?v1449',
    eyebrow: 'Интерьерная коллекция',
    title: 'Искусство, которое подходит вашему пространству',
    href: '/catalog/postery-6',
    button: 'Смотреть каталог',
  },
  {
    image: '/userdata/homepage/slider/resized/c5/f4/c5f4b1222390ed071cb8a4c795d688d7_1200_webp.webp?v1449',
    eyebrow: 'Классика',
    title: 'Репродукции известных картин',
    href: '/catalog/reprodukcii-kartin-i-kartiny-na-stenu-1',
    button: 'Выбрать работу',
  },
  {
    image: '/userdata/homepage/slider/resized/2c/13/2c13634c3906f51da78881cc0e564ddf_1200_webp.webp?v1449',
    eyebrow: 'Современное искусство',
    title: 'Фото-постеры для лаконичных интерьеров',
    href: '/catalog/postery-6',
    button: 'Перейти',
  },
];

export const benefits = [
  {
    title: 'Оформление в раму онлайн',
    image: '/userdata/page_block_link/be/c5/bec561fef2010691031afc188005c8e1.jpg',
  },
  {
    title: 'Натуральные материалы',
    image: '/userdata/page_block_link/df/00/df008ec4fd1270828e149d1c53c0436a.jpg',
  },
  {
    title: 'Изготовление 1–3 дня',
    image: '/userdata/page_block_link/d5/20/d5200c6637090ff170f188df853a85d3.jpg',
  },
  {
    title: 'Доставка по всей России',
    image: '/userdata/page_block_link/16/6f/166f1648c304b032f801abe1a3ae8e36.jpg',
  },
  {
    title: 'Удобная оплата',
    image: '/userdata/page_block_link/ce/66/ce66712535930436d393d988465b0741.jpg',
  },
];

export const popularCategories: ImageLink[] = [
  { title: 'Абстракция', href: '/catalog/abstrakciya-5', image: '/userdata/page_block_link/preview/eb/09/eb09fe1713c188a8e7c382d6a07d4f18_40.jpg' },
  { title: 'Современный пейзаж', href: '/catalog/sovremennyj-pejzazh-10680', image: '/userdata/page_block_link/preview/c6/3e/c63e01fb6cbd2fb3804dcc88bd83ca4a_40.jpg' },
  { title: 'Иван Айвазовский', href: '/catalog/ayvazovskiy-ivan-340', image: '/userdata/page_block_link/preview/94/1b/941be1d1ddba4c8117e359a295a20504_40.jpg' },
  { title: 'Ботанические гравюры', href: '/catalog/botanika-6656', image: '/userdata/page_block_link/preview/bf/ad/bfadba51091d32793b1d33ef288664ab_40.jpg' },
  { title: 'Патенты', href: '/catalog/patenty-10926', image: '/userdata/page_block_link/preview/a2/02/a202ed08e4715c7a9006a4080ccb7445_40.jpg' },
  { title: 'Василий Кандинский', href: '/catalog/kandinskiy-vasiliy-8522', image: '/userdata/page_block_link/preview/ea/55/ea55f26e8cf68285d003db782ab12ca1_40.jpg' },
  { title: 'Ретро', href: '/catalog/retro-i-vintazh-7', image: '/userdata/page_block_link/preview/07/8d/078d8899153cbc60d19d7ea58783b44f_40.jpg' },
  { title: 'Картины городов', href: '/catalog/gorod-art-7937', image: '/userdata/page_block_link/preview/28/9f/289f879271ca17c16723cd2b5e60de88_40.jpg' },
];

export const features = [
  {
    title: 'Самый большой выбор декора для интерьера',
    body: 'Более 150 000 современных и классических картин, ретро-фото, гравюр и иллюстраций для домашних и рабочих пространств.',
    image: '/userdata/page_block_link/preview/72/ca/72caad9ac1b19434290457438d246b0e_1.jpg',
  },
  {
    title: 'Продвинутое оформление',
    body: 'Тысячи рам и сотни видов паспарту. Размер, материал, цвет и композицию можно подобрать прямо в онлайн-конструкторе.',
    image: '/userdata/page_block_link/preview/e3/0f/e30f7b1c86b0d9a0a0579a587be03ffa_1.jpg',
  },
  {
    title: 'Профессиональный подход',
    body: 'Печать на оборудовании для арт-печати, проверенные материалы и ручная сборка каждой работы.',
    image: '/userdata/page_block_link/preview/5f/48/5f486d4af782284900a43727e17e4982_1.jpg',
  },
  {
    title: 'Максимальная индивидуальность',
    body: 'Выберите любой размер, сюжет и вариант оформления или получите помощь арт-консультанта.',
    image: '/userdata/page_block_link/preview/ec/b5/ecb5d1e034b52324ead39f25ac197b05_1.jpg',
  },
];

export const classicArt: ImageLink[] = [
  { title: 'Айвазовский', href: '/catalog/ayvazovskiy-ivan-340', image: '/userdata/page_block_link/preview/ee/b1/eeb10eae38ed14c7da4851c3afdc7928_2.jpg' },
  { title: 'Густав Климт', href: '/catalog/klimt-gustav-gustav-klimt-341', image: '/userdata/page_block_link/preview/63/78/6378459a4ea97c820879f25c67564f0d_3.jpg' },
  { title: 'Клод Моне', href: '/catalog/mone-klod-claude-monet-401', image: '/userdata/page_block_link/preview/85/c9/85c98fed986ef132a72f785c9b2ccabe_3.jpg' },
  { title: 'Винсент Ван Гог', href: '/catalog/van-gog-vinsent-van-gogh-367', image: '/userdata/page_block_link/preview/5c/37/5c377a226ea29ffa80272ef4c9872da5_3.jpg' },
  { title: 'Пейзажи', href: '/catalog/kartiny-peyzazhi-8524', image: '/userdata/page_block_link/preview/77/17/7717183efac5dfeb75169f1dee198285_3.jpg' },
  { title: 'Цветы', href: '/catalog/cvety-art-7930', image: '/userdata/page_block_link/preview/be/08/be08a7f06fc5811ffa0f627434104a6c_3.jpg' },
];

export const modernArt: ImageLink[] = [
  { title: 'Цветы', href: '/catalog/cvety-239', image: '/userdata/page_block_link/preview/38/4d/384d72d18b87b75abcc40ee127527e65_2.jpg' },
  { title: 'Авторское фото', href: '/catalog/galereya-avtorskogo-foto-6624', image: '/userdata/page_block_link/preview/ab/4d/ab4d083511ce14c5e82fb0a7080a4331_3.jpg' },
  { title: 'Минералы', href: '/catalog/mineraly-9195', image: '/userdata/page_block_link/preview/b8/dd/b8dd43871ccac747a8e5242c15255f34_3.jpg' },
  { title: 'Листья', href: '/catalog/listya-226', image: '/userdata/page_block_link/preview/06/e4/06e4949a24a39471540419913aa9c830_3.jpg' },
  { title: 'Абстракция', href: '/catalog/abstrakciya-5', image: '/userdata/page_block_link/preview/1c/c5/1cc5f91a9ae2f14fdeddcef73e83e53d_3.jpg' },
  { title: 'Скандинавский стиль', href: '/catalog/postery-v-skandinavskom-stile-9291', image: '/userdata/page_block_link/preview/3d/fc/3dfcfd258198e82835e8773bb7d793ce_3.jpg' },
];

export const footerColumns = [
  {
    title: 'Каталог',
    links: ['Репродукции картин', 'Арт-постеры', 'Ретро и винтаж', 'Гравюры', 'Картины из фото'],
  },
  {
    title: 'Покупателям',
    links: ['Как заказать', 'Доставка и оплата', 'Вопрос / ответ', 'Акции', 'Галерея работ'],
  },
  {
    title: 'Компания',
    links: ['О компании', 'Контакты', 'Для бизнеса', 'Дизайнерам', 'Блог'],
  },
];
