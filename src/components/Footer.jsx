import { useLanguage } from '../LanguageContext';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 px-6 py-6 text-center text-sm text-zinc-500">
      <p>
        © {new Date().getFullYear()} O&apos;rolboy Jumanazrov.{' '}
        {t.footer.copyright}
      </p>
    </footer>
  );
}

export default Footer;
