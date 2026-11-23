export const company = {
  name: 'PhuongNam Digital',
  internationalName: 'PhuongNam Digital',
  shortName: 'VPN Digital',
  legalName: 'Công ty TNHH Một Thành Viên Công Nghệ Số Phương Nam',
  taxId: '0901258364',
  representative: 'Vũ Phương Nam',
  address: 'thôn Phú Nhạn, Xã Mễ Sở, Tỉnh Hưng Yên, Việt Nam',
  locality: 'Mễ Sở, Hưng Yên',
  mainIndustry: 'Phát triển trò chơi điện tử, phần mềm trò chơi điện tử và các công cụ phần mềm trò chơi điện tử',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || '',
  fields: [
    { icon: 'game', title: 'Ứng dụng', detail: 'Phát triển các ứng dụng và trải nghiệm số.' },
    { icon: 'code', title: 'Phần mềm game', detail: 'Phát triển phần mềm trò chơi điện tử.' },
    { icon: 'layers', title: 'Công cụ phát triển', detail: 'Phát triển các công cụ phần mềm trò chơi điện tử.' },
  ],
} as const;
export const sitePresentation = { showBrandShowcase: false } as const;
export const navigation = [
  { href: '/#gioi-thieu', label: 'Giới thiệu' },
  { href: '/ung-dung/', label: 'Ứng dụng' },
  { href: '/phan-mem/', label: 'Phần mềm' },
  { href: '/cong-cu/', label: 'Công cụ' },
  { href: '/#lien-he', label: 'Liên hệ' },
];
