export const categories = [
  { slug: 'game', name: 'Game', eyebrow: 'THẾ GIỚI TRẢI NGHIỆM', headline: 'Những thế giới nhỏ.\nNhững ý tưởng lớn.', description: 'Khám phá các ý tưởng game — từ giải đố nhẹ nhàng đến những hành trình khám phá mang cảm hứng Việt Nam.', image: '/images/game.webp', imageAlt: 'Minh họa 2.5D làng quê Việt với ruộng bậc thang và cầu đỏ' },
  { slug: 'phan-mem', name: 'Phần mềm', eyebrow: 'KHÔNG GIAN LÀM VIỆC SỐ', headline: 'Gọn công việc.\nRộng không gian sáng tạo.', description: 'Các ý tưởng phần mềm giúp tổ chức công việc, quản lý nội dung và phối hợp trong quá trình phát triển sản phẩm số.', image: '/images/software.webp', imageAlt: 'Minh họa 2.5D không gian phần mềm với màn hình và các khối tác vụ đỏ ngà' },
  { slug: 'cong-cu', name: 'Công cụ', eyebrow: 'DÀNH CHO NGƯỜI KIẾN TẠO', headline: 'Từ một công cụ nhỏ.\nĐến một ý tưởng mới.', description: 'Các ý tưởng công cụ hỗ trợ người làm game và phần mềm sắp xếp tài nguyên, thử nghiệm và phát triển sản phẩm.', image: '/images/tools.webp', imageAlt: 'Minh họa 2.5D các mô-đun công cụ và ký hiệu lập trình đỏ vàng' },
] as const;
export type CategorySlug = (typeof categories)[number]['slug'];
export function getCategory(slug: string) { return categories.find(category => category.slug === slug); }
