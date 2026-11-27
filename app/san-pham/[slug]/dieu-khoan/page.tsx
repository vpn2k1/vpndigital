import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allProducts, getProduct } from '@/lib/products';
import { siteUrl } from '@/lib/seo';
import { LegalPage, legalEmail } from '@/components/LegalPage';
import { company } from '@/content/company';
export const dynamicParams = false;
export function generateStaticParams() { return allProducts.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: `Điều khoản sử dụng — ${p.name} | PhuongNam Digital`, description: `Điều khoản sử dụng ứng dụng ${p.name}.`, ...(siteUrl ? { alternates: { canonical: `/san-pham/${p.slug}/dieu-khoan/` } } : {}) } : {};
}
export default async function TermsPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const kind = p.category === 'game' ? 'trò chơi' : 'ứng dụng';
  return <LegalPage product={p} title="Điều khoản sử dụng">
    <section><h2>Chấp nhận điều khoản</h2><p>Khi tải, cài đặt hoặc sử dụng {p.name}, bạn đồng ý với các điều khoản này và <a href={`/san-pham/${p.slug}/chinh-sach-bao-mat/`}>Chính sách quyền riêng tư</a>. Nếu không đồng ý, vui lòng ngừng sử dụng và gỡ {kind}.</p></section>
    <section><h2>Quyền sử dụng</h2><p>{company.legalName} cấp cho bạn quyền cá nhân, không độc quyền, không chuyển nhượng để sử dụng {p.name} cho mục đích phi thương mại trên thiết bị bạn sở hữu hoặc kiểm soát.</p></section>
    <section><h2>Hành vi không được phép</h2><ul><li>Sao chép, dịch ngược, sửa đổi hoặc phân phối lại {kind} khi chưa được cho phép.</li><li>Can thiệp, gian lận hoặc khai thác lỗi để làm sai lệch hoạt động của {kind}{p.online ? ' hoặc máy chủ' : ''}.</li>{p.online && <li>Gây ảnh hưởng tới người dùng khác, mạo danh hoặc dùng tên hiển thị xúc phạm.</li>}<li>Sử dụng {kind} vào mục đích trái pháp luật Việt Nam.</li></ul></section>
    {p.online && <section><h2>Dịch vụ trực tuyến</h2><p>Một số tính năng cần kết nối mạng và máy chủ của chúng tôi. Chúng tôi cố gắng duy trì dịch vụ ổn định nhưng không cam kết dịch vụ luôn sẵn sàng, và có thể tạm ngừng để bảo trì hoặc ngừng tính năng trực tuyến sau khi thông báo hợp lý.</p></section>}
    {p.ads && <section><h2>Quảng cáo</h2><p>{p.name} hiển thị quảng cáo do bên thứ ba (Google AdMob) cung cấp. Chúng tôi không chịu trách nhiệm về nội dung, sản phẩm hay dịch vụ được quảng cáo; giao dịch giữa bạn và nhà quảng cáo thuộc trách nhiệm của hai bên.</p></section>}
    {p.category !== 'game' && <section><h2>Không phải tư vấn chuyên môn</h2><p>Nội dung trong {p.name} chỉ mang tính tham khảo và giáo dục, không thay thế tư vấn hoặc chẩn đoán của chuyên gia y tế.</p></section>}
    <section><h2>Sở hữu trí tuệ</h2><p>Mã nguồn, hình ảnh, âm thanh, tên và biểu tượng của {p.name} thuộc quyền sở hữu của {company.legalName} hoặc bên cấp phép. Các điều khoản này không chuyển giao cho bạn bất kỳ quyền sở hữu nào.</p></section>
    <section><h2>Miễn trừ và giới hạn trách nhiệm</h2><p>{p.name} được cung cấp “nguyên trạng”. Trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm về thiệt hại gián tiếp phát sinh từ việc sử dụng hoặc không thể sử dụng {kind}, kể cả mất tiến trình lưu trên thiết bị.</p></section>
    <section><h2>Cập nhật và chấm dứt</h2><p>Chúng tôi có thể cập nhật {kind} và các điều khoản này. Bạn có thể ngừng sử dụng bất cứ lúc nào bằng cách gỡ {kind}. Việc tiếp tục sử dụng sau khi điều khoản thay đổi nghĩa là bạn chấp nhận điều khoản mới.</p></section>
    <section><h2>Luật áp dụng</h2><p>Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Điều khoản của Google Play hoặc App Store áp dụng bổ sung khi bạn tải {kind} từ các cửa hàng đó.</p></section>
    <section><h2>Liên hệ</h2><p>{company.legalName} · MST {company.taxId} · {company.address}. Email: <a href={`mailto:${legalEmail}`}>{legalEmail}</a>.</p></section>
  </LegalPage>;
}
