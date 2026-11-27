import type { Locale, LegalDoc } from '@/config/i18n';
import { homeHref, productHref, legalHref } from '@/config/i18n';
import { getStrings } from '@/config/strings';
import { company } from '@/content/company';
import type { Product } from '@/lib/products';
import { localizedProduct } from '@/lib/localized-content';
import { productsEn } from '@/config/strings/products-en';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Icon } from '@/components/Icon';

const legalCopy = {
  en: {
    updated: 'Last updated', identity: 'App and developer information',
    intro: (app: string, dev: string) => <>This document applies to the app <strong>{app}</strong>, developed and published by <strong>{dev}</strong>. In this document, “we” means {dev}.</>,
    appName: 'App name', otherName: 'Vietnamese name', developer: 'Developer', entity: 'Legal entity', taxId: 'Tax ID', address: 'Address', email: 'Email',
    address_: 'Phu Nhan Hamlet, Me So Commune, Hung Yen Province, Vietnam',
    terms: (p: Product, kind: string, privacy: string) => [
      ['Acceptance', <>By downloading, installing or using {p.name}, you agree to these terms and the <a href={privacy}>Privacy Policy</a>. If you do not agree, please stop using and uninstall the {kind}.</>],
      ['License', <>{company.shortName} grants you a personal, non-exclusive, non-transferable license to use {p.name} for non-commercial purposes on devices you own or control.</>],
      ['Prohibited conduct', <ul><li>Copying, reverse engineering, modifying or redistributing the {kind} without permission.</li><li>Tampering, cheating or exploiting bugs to disrupt the {kind}{p.online ? ' or our servers' : ''}.</li>{p.online && <li>Harassing other users, impersonating others or using offensive display names.</li>}<li>Using the {kind} for any unlawful purpose.</li></ul>],
      p.online && ['Online services', <>Some features require an internet connection and our servers. We aim to keep the service stable but do not guarantee it is always available, and may pause it for maintenance or discontinue online features with reasonable notice.</>],
      p.ads && ['Advertising', <>{p.name} shows ads provided by a third party (Google AdMob). We are not responsible for advertised content, products or services; any dealings with advertisers are between you and them.</>],
      p.tags.includes('Education') && ['Not professional advice', <>Content in {p.name} is for reference and education only and does not replace advice or diagnosis from a medical professional.</>],
      ['Intellectual property', <>The code, images, sounds, name and icon of {p.name} belong to {company.shortName} ({company.legalName}) or its licensors. These terms transfer no ownership to you.</>],
      ['Disclaimer and limitation of liability', <>{p.name} is provided “as is”. To the extent permitted by law, we are not liable for indirect damages arising from using or being unable to use the {kind}, including loss of progress stored on your device.</>],
      ['Updates and termination', <>We may update the {kind} and these terms. You can stop using it at any time by uninstalling it. Continued use after changes means you accept the updated terms.</>],
      ['Governing law', <>These terms are governed by the laws of Vietnam. Google Play or App Store terms also apply when you download the {kind} from those stores.</>],
    ] as const,
    kind: (game: boolean) => game ? 'game' : 'app',
  },
  vi: {
    updated: 'Cập nhật lần cuối', identity: 'Thông tin ứng dụng và nhà phát triển',
    intro: (app: string, dev: string) => <>Văn bản này áp dụng cho ứng dụng <strong>{app}</strong> do <strong>{dev}</strong> phát triển và phát hành. Trong văn bản này, “chúng tôi” là {dev}.</>,
    appName: 'Tên ứng dụng', otherName: 'Tên tiếng Anh', developer: 'Nhà phát triển', entity: 'Pháp nhân', taxId: 'MST', address: 'Địa chỉ', email: 'Email',
    address_: company.address,
    terms: (p: Product, kind: string, privacy: string) => [
      ['Chấp nhận điều khoản', <>Khi tải, cài đặt hoặc sử dụng {p.name}, bạn đồng ý với các điều khoản này và <a href={privacy}>Chính sách quyền riêng tư</a>. Nếu không đồng ý, vui lòng ngừng sử dụng và gỡ {kind}.</>],
      ['Quyền sử dụng', <>{company.shortName} cấp cho bạn quyền cá nhân, không độc quyền, không chuyển nhượng để sử dụng {p.name} cho mục đích phi thương mại trên thiết bị bạn sở hữu hoặc kiểm soát.</>],
      ['Hành vi không được phép', <ul><li>Sao chép, dịch ngược, sửa đổi hoặc phân phối lại {kind} khi chưa được cho phép.</li><li>Can thiệp, gian lận hoặc khai thác lỗi để làm sai lệch hoạt động của {kind}{p.online ? ' hoặc máy chủ' : ''}.</li>{p.online && <li>Gây ảnh hưởng tới người dùng khác, mạo danh hoặc dùng tên hiển thị xúc phạm.</li>}<li>Sử dụng {kind} vào mục đích trái pháp luật.</li></ul>],
      p.online && ['Dịch vụ trực tuyến', <>Một số tính năng cần kết nối mạng và máy chủ của chúng tôi. Chúng tôi cố gắng duy trì dịch vụ ổn định nhưng không cam kết dịch vụ luôn sẵn sàng, và có thể tạm ngừng để bảo trì hoặc ngừng tính năng trực tuyến sau khi thông báo hợp lý.</>],
      p.ads && ['Quảng cáo', <>{p.name} hiển thị quảng cáo do bên thứ ba (Google AdMob) cung cấp. Chúng tôi không chịu trách nhiệm về nội dung, sản phẩm hay dịch vụ được quảng cáo; giao dịch giữa bạn và nhà quảng cáo thuộc trách nhiệm của hai bên.</>],
      p.tags.includes('Giáo dục') && ['Không phải tư vấn chuyên môn', <>Nội dung trong {p.name} chỉ mang tính tham khảo và giáo dục, không thay thế tư vấn hoặc chẩn đoán của chuyên gia y tế.</>],
      ['Sở hữu trí tuệ', <>Mã nguồn, hình ảnh, âm thanh, tên và biểu tượng của {p.name} thuộc quyền sở hữu của {company.shortName} ({company.legalName}) hoặc bên cấp phép. Các điều khoản này không chuyển giao cho bạn bất kỳ quyền sở hữu nào.</>],
      ['Miễn trừ và giới hạn trách nhiệm', <>{p.name} được cung cấp “nguyên trạng”. Trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm về thiệt hại gián tiếp phát sinh từ việc sử dụng hoặc không thể sử dụng {kind}, kể cả mất tiến trình lưu trên thiết bị.</>],
      ['Cập nhật và chấm dứt', <>Chúng tôi có thể cập nhật {kind} và các điều khoản này. Bạn có thể ngừng sử dụng bất cứ lúc nào bằng cách gỡ {kind}. Việc tiếp tục sử dụng sau khi điều khoản thay đổi nghĩa là bạn chấp nhận điều khoản mới.</>],
      ['Luật áp dụng', <>Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Điều khoản của Google Play hoặc App Store áp dụng bổ sung khi bạn tải {kind} từ các cửa hàng đó.</>],
    ] as const,
    kind: (game: boolean) => game ? 'trò chơi' : 'ứng dụng',
  },
};

export function LegalView({ locale, product, doc }: { locale: Locale; product: Product; doc: LegalDoc }) {
  const s = getStrings(locale);
  const t = legalCopy[locale];
  const copy = localizedProduct(locale, product);
  const title = doc === 'privacy' ? s.productPage.privacy : s.productPage.terms;
  const appName = copy.name + ' (' + copy.subtitle + ')';
  // Play listings carry both names; show the other language's name unless it is identical
  const otherName = locale === 'en' ? product.name : productsEn[product.slug].name;
  const kind = t.kind(!copy.tags.some(tag => tag === 'Giáo dục' || tag === 'Education' || tag === 'Hình nền' || tag === 'Wallpaper'));
  return <div className="site-shell" id="top" lang={locale}>
    <a className="skip-link" href="#noi-dung">{s.nav.home}</a><Header/>
    <main id="noi-dung"><div className="container legal">
      <nav className="breadcrumb" aria-label={s.breadcrumb}>
        <a href={homeHref(locale)}>{s.productPage.home}</a><Icon name="arrow" size={13}/>
        <a href={productHref(locale, product.slug)}>{copy.name}</a><Icon name="arrow" size={13}/>
        <span aria-current="page">{title}</span>
      </nav>
      <h1>{title}</h1>
      <p className="legal-meta">{t.updated}: {product.updated}</p>
      {/* Google Play requires the policy to name the app, developer and legal entity as shown on the store listing */}
      <section><h2>{t.identity}</h2>
        <p>{t.intro(appName, company.shortName)}</p>
        <ul>
          <li>{t.appName}: {copy.name}</li>
          {otherName !== copy.name && <li>{t.otherName}: {otherName}</li>}
          <li>{t.developer}: {company.shortName}</li>
          <li>{t.entity}: {company.legalName} ({company.internationalName}), {t.taxId} {company.taxId}</li>
          <li>{t.address}: {t.address_}</li>
          <li>{t.email}: <a href={'mailto:' + company.email}>{company.email}</a></li>
        </ul>
      </section>
      {/* privacy HTML is authored in the repo (content/products.json, config/strings/products-en.ts) */}
      {doc === 'privacy'
        ? <div dangerouslySetInnerHTML={{ __html: copy.privacy }}/>
        : t.terms(copy, kind, legalHref(locale, product.slug, 'privacy')).filter(Boolean).map(entry => { const [h, body] = entry as readonly [string, React.ReactNode]; return <section key={h}><h2>{h}</h2>{body}</section>; })}
    </div></main><Footer/>
  </div>;
}
