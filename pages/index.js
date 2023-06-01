import Link from "next/link";
import { useRouter } from "next/router"
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {

  const { locale, locales, push } = useRouter();

  const { t: translate } = useTranslation('common');

  const handleClick = l => () => {
    push('/', undefined, { locale: l })
  }

  return (
    <>
      <h1>{translate('title page')}</h1>
      <h3>{locale}</h3>
      <div>
        <h3>With useRouter</h3>
        <h1>Chosse your locale: </h1>
        <div>
          {locales.map(l => (
            <button key={l} onClick={handleClick(l)}>
              {l}
            </button>
          ))}
        </div>
        <br />
        <Link href='/about' locale={locale}>
          {translate('link go to')}
        </Link>
      </div>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
