import { useRouter } from "next/router"
import Link from "next/link";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function About() {
  const { locale } = useRouter();

  const { t: translate } = useTranslation('about');

  return (
    <div>
      <h1>{translate('title page')}</h1>
      <h3>{locale}</h3>
      <Link href='/' locale={locale}>
        {translate('link go to')}
      </Link>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['about'])),
    },
  }
}