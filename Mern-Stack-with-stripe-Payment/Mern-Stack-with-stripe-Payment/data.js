import bcrypt from 'bcryptjs';
export const users = [
  {
    fullName: 'Demo User',
    email: 'demo@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    phone: '1234567890',
  },
  {
    fullName: 'Zpunet Company',
    email: 'onlineshop@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    phone: '1234567890',
  },
];

//export products;
export const products = [
  {
    title: 'Europa Lace-Up Running Shoes',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 24,
    tags: ['Mens', 'Europa', 'Lace-Up', 'Running', 'Shoes'],
    salesOffer: {
      discount: 0,
      status: false,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849601/OnlineShop/Products/hszyk106piek7v9uq9cm_ixmjeg.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849629/OnlineShop/Products/z3k7ob8dd4vx0ig9bhgl_ttqjvh.webp',
    ],
    stock: 14,
  },
  {
    title: 'Barley Textured Panelled Low-Top Shoes',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 23,
    tags: ['Barley', 'Textured', 'Panelled', 'Low-Top', 'Shoes'],
    salesOffer: {
      discount: 0,
      status: false,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849636/OnlineShop/Products/xa1mmuxgerymgjrzxkpi_um2tgv.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849621/OnlineShop/Products/opl7fo4uukraq61pfc4i_ofpull.jpg',
    ],
    stock: 0,
  },
  {
    title: 'Girls Lace-Up Running Shoes',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 8,
    tags: ['girls', 'Lace-Up', 'Running', 'Shoes'],
    salesOffer: {
      discount: 0,
      status: false,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849607/OnlineShop/Products/ddpqvtxevzwm6avvnebk_otis4p.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849631/OnlineShop/Products/rfhxkfaqqaif7hicbcox_lwiqfr.jpg',
    ],
    stock: 0,
  },
  {
    title: 'High heel sandals',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 89,
    tags: ['High', 'heel', 'sandals'],
    salesOffer: {
      discount: 0,
      status: false,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849628/OnlineShop/Products/l0mx8lpjo0hrfnshybep_lx8hlv.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849602/OnlineShop/Products/i9gwmick0ghijm7iom7a_xfjeka.jpg',
    ],
    stock: 0,
  },
  {
    title: 'Hot summer dress for women',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 400,
    tags: ['summer', 'dress', 'women', 'fashion', 'clothes'],
    salesOffer: {
      discount: 10,
      status: true,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849596/OnlineShop/Products/cpuujah61gp9pkb7ezcu_zkr8zc.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849597/OnlineShop/Products/fcophpxfsautlyk6etha_ybqgye.webp',
    ],
    stock: 450,
  },
  {
    title: 'Oversized High Neck Sweatshirt in Mint Green',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 10,
    tags: ['Sweatshirt', 'Mint Green', 'Oversized', 'High Neck'],
    salesOffer: {
      discount: 10,
      status: true,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849604/OnlineShop/Products/g4tr1sypdumirqtrndoc_kneg7z.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849617/OnlineShop/Products/its4avwzzextzxuqgaxa_pyofqf.jpg',
    ],
    stock: 6800,
  },
  {
    title: 'Square Neck Midi Dress in Ivory',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 30,
    tags: ['Square Neck', 'Midi Dress', 'Ivory'],
    salesOffer: {
      discount: 40,
      status: true,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849597/OnlineShop/Products/fy5nqjzo2ers0grs9jry_dkmxvd.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849605/OnlineShop/Products/jh33hsx2hebccojeutjr_jq1d4f.webp',
    ],
    stock: 20,
  },
  {
    title: 'Long Sleeve Crop Top in Black',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 4,
    tags: ['Long Sleeve', 'Crop Top', 'Black'],
    salesOffer: {
      discount: 0,
      status: false,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849606/OnlineShop/Products/jdrvtwyfti5hnvg062b8_howxe7.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849603/OnlineShop/Products/idnpyttqe3mtbhxsjewd_thn9kg.webp',
    ],
    stock: 0,
  },
  {
    title: 'Square Neck Corset Top in Ivory',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 12,
    tags: ['Square Neck', 'Corset Top', 'Ivory'],
    salesOffer: {
      discount: 70,
      status: true,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849598/OnlineShop/Products/am4fro15sozxfskzo8fz_h0i0ha.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849602/OnlineShop/Products/cueftsc1j12jtcjkkud3_fiwfjd.webp',
    ],
    stock: 1400,
  },
  {
    title: 'Mid Rise Mini Skirt in Lilac',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 400,
    tags: ['summer', 'dress', 'women', 'fashion', 'skirts', 'lilac'],
    salesOffer: {
      discount: 0,
      status: false,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849606/OnlineShop/Products/kijuup6t9udpqvkx0qg2_gsic12.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849598/OnlineShop/Products/am4fro15sozxfskzo8fz_h0i0ha.webp',
    ],
    stock: 78,
  },
  {
    title: 'Open Back Ruched Ruffle Crop Top in Ivory',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 34,
    tags: ['Open Back', 'Ruched Ruffle', 'Crop Top', 'Ivory'],
    salesOffer: {
      discount: 0,
      status: false,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849602/OnlineShop/Products/bghajxxhruwpiflxabva_xfugeh.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849607/OnlineShop/Products/ikjql5ieb1msfnotchyn_knxupe.webp',
    ],
    stock: 90,
  },
  {
    title: 'Embellished Cowl Neck Corset in Blue',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 78,
    tags: ['Embellished', 'Cowl Neck', 'Corset', 'Blue'],
    salesOffer: {
      discount: 0,
      status: false,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849615/OnlineShop/Products/oluap80b17avzgtpu3xg_hc6tdo.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849604/OnlineShop/Products/g4tr1sypdumirqtrndoc_kneg7z.webp',
    ],
    stock: 45,
  },
  {
    title: 'Mens harpoon 2 eye boot',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 4,
    tags: ['Mens', 'harpoon', '2 eye', 'boot'],
    salesOffer: {
      discount: 0,
      status: false,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849616/OnlineShop/Products/o9k5kyz0tafnimuvzr14_aizdb6.avif',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849615/OnlineShop/Products/oluap80b17avzgtpu3xg_hc6tdo.webp',
    ],
    stock: 15,
  },
  {
    title: 'Omax Lace-Up Sports Shoes',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 89,
    tags: ['Omax', 'Lace-Up', 'Sports', 'Shoes'],
    salesOffer: {
      discount: 90,
      status: true,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849617/OnlineShop/Products/its4avwzzextzxuqgaxa_pyofqf.jpg',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849616/OnlineShop/Products/o9k5kyz0tafnimuvzr14_aizdb6.avif',
    ],
    stock: 12,
  },
  {
    title: 'Titanium Lace-Up Sports Shoes',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 300,
    tags: ['Titanium', 'Lace-Up', 'Sports', 'Shoes'],
    salesOffer: {
      discount: 0,
      status: false,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849621/OnlineShop/Products/pucgvgcotvlkt4z3uirz_lc6qlw.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849613/OnlineShop/Products/ngk0swwqrfzbmtcp3dhx_woqtza.webp',
    ],
    stock: 22,
  },
  {
    title: 'Barley Textured Panelled Low-Top Shoes',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 34,
    tags: ['Barley', 'Textured', 'Panelled', 'Low-Top', 'Shoes'],
    salesOffer: {
      discount: 0,
      status: false,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849615/OnlineShop/Products/kjefsqhgnxvx2p1qpdd6_vkicoh.webp',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849622/OnlineShop/Products/wi5xk2eoac0rlsnkvbdi_bqlqek.webp',
    ],
    stock: 12,
  },
  {
    title: 'Derby shoe ',
    description:
      "Don't sweat it. Game is a vintage-inspired layering piece you'll never want to take off, crafted from our premium cotton fabrication with a super soft brushed cotton feel. Created to enhance your everyday wardrobe, the Game sweatshirt has an oversized silhouette with a high neckline, dropped shoulders and balloon sleeves for ultimate relaxation. Complete with ribbed contouring around the neckline, hem and cuffs and with embroidered Bo+Tee branding at the chest",
    price: 90,
    tags: ['Derby', 'shoe'],
    salesOffer: {
      discount: 18,
      status: true,
    },
    images: [
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849626/OnlineShop/Products/t13savckxs5fheyujtvn_z1h4bj.jpg',
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849628/OnlineShop/Products/l0mx8lpjo0hrfnshybep_lx8hlv.webp',
    ],
    stock: 0,
  },
];

// export categories
export const categories = [
  {
    name: 'Mens Outfit',
    image:
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849297/OnlineShop/categories/d6jro0agd2zw0r0xlrfj_sz94rv.png',
  },
  {
    name: 'Mens Shoes',
    image:
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849298/OnlineShop/categories/odzaz2xqftyg8quwtybm_zdnegk.png',
  },
  {
    name: 'Womens Outfit',
    image:
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849299/OnlineShop/categories/zbyzuooiobpki19iu5mq_xd8st5.png',
  },
  {
    name: 'Womens Shoes',
    image:
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849298/OnlineShop/categories/x047lyavjprlcryssx3q_xe3rqz.png',
  },
  {
    name: 'Kids Outfit',
    image:
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849298/OnlineShop/categories/hafyrn2qd1q90oaujhl1_bkhpkw.png',
  },
  {
    name: 'Grils Swimwear',
    image:
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849298/OnlineShop/categories/mnszghuzwddridetzift_qm0fh3.png',
  },
  {
    name: 'Boys Swimwear',
    image:
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849297/OnlineShop/categories/haeckrxb8xv7gzz909am_tvowgb.png',
  },
  {
    name: 'Caps',
    image:
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849298/OnlineShop/categories/xvvzhzovastdpazl4fo7_apgzoi.png',
  },
  {
    name: 'Trouser',
    image:
      'https://res.cloudinary.com/dxiadyi2i/image/upload/v1689849297/OnlineShop/categories/gcspz9ylkdnadq43crk3_gnl9f4.png',
  },
];
